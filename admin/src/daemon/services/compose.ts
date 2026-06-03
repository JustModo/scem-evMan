import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { errorResponse } from "../web/http";
import {
  isOperationRunning,
  markOperationFinished,
  markOperationRunning,
  appendOperationLog,
} from "./operations";
import { getComposeConfig } from "../core/paths";
import { getCurrentReleaseDir } from "../core/release";
import { ensureConfigDefaults, parseConfigYaml } from "../core/config";
import { run } from "../core/run";
import type { Paths } from "../core/types";

export async function dockerAvailable() {
  const res = await run("docker", ["info"]);
  return res.code === 0;
}

export function composeArgs(
  paths: Paths,
  releaseDir: string,
  extraArgs: string[],
) {
  const cfg = getComposeConfig();
  return [
    "compose",
    "--project-name",
    cfg.project,
    "--env-file",
    paths.envFile,
    "-f",
    cfg.app,
    "-f",
    cfg.judge,
    "--project-directory",
    releaseDir,
    ...extraArgs,
  ];
}

function getComposeEnv(paths: Paths) {
  const cfgYaml = parseConfigYaml(paths) || {};
  const caddyHttp = cfgYaml.ports?.caddyHttp ?? 80;
  const caddyHttps = cfgYaml.ports?.caddyHttps ?? 443;
  const dbMode = cfgYaml.infrastructure?.database?.mode ?? "internal";
  const judgeMode = cfgYaml.infrastructure?.judge0?.mode ?? "internal";
  const domain = cfgYaml.app?.domain ?? "localhost";
  const protocol = cfgYaml.app?.protocol ?? "http";

  const profiles: string[] = [];
  if (dbMode === "internal") profiles.push("internal-db");
  if (judgeMode === "internal") profiles.push("internal-judge0");

  return {
    ...process.env,
    DOMAIN: domain,
    PROTOCOL: protocol,
    CADDY_HTTP_PORT: String(caddyHttp),
    CADDY_HTTPS_PORT: String(caddyHttps),
    COMPOSE_PROFILES: profiles.join(","),
  };
}

export async function compose(
  paths: Paths,
  releaseDir: string,
  extraArgs: string[],
) {
  return run("docker", composeArgs(paths, releaseDir, extraArgs), {
    cwd: releaseDir,
    env: getComposeEnv(paths),
  });
}

export async function startCompose(
  paths: Paths,
  operation: string,
  composeExtraArgs: string[],
) {
  if (isOperationRunning()) {
    throw new Error("Another operation is in progress");
  }

  if (!(await dockerAvailable())) {
    throw new Error("Docker unavailable");
  }

  const releaseDir = getCurrentReleaseDir(paths);

  if (operation === "start" || operation === "restart") {
    ensureConfigDefaults(paths, releaseDir);
  }

  markOperationRunning(operation);

  const proc = Bun.spawn({
    cmd: ["stdbuf", "-oL", "-eL", "docker", ...composeArgs(paths, releaseDir, composeExtraArgs)],
    cwd: releaseDir,
    stdout: "pipe",
    stderr: "pipe",
    env: { ...getComposeEnv(paths), BUILDKIT_PROGRESS: "plain" },
  });

  async function readStream(stream: ReadableStream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    while (true) {
      try {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          appendOperationLog(decoder.decode(value, { stream: true }));
        }
      } catch (err) {
        break;
      }
    }
  }

  readStream(proc.stdout).catch(() => {});
  readStream(proc.stderr).catch(() => {});

  proc.exited.finally(async () => {
    try {
      if (proc.exitCode === 0 && composeExtraArgs.includes("up")) {
        appendOperationLog("\nRestarting Caddy proxy to apply configuration...\n");
        const caddyProc = Bun.spawn({
          cmd: ["stdbuf", "-oL", "-eL", "docker", ...composeArgs(paths, releaseDir, ["restart", "caddy"])],
          cwd: releaseDir,
          stdout: "pipe",
          stderr: "pipe",
          env: getComposeEnv(paths),
        });

        readStream(caddyProc.stdout).catch(() => {});
        readStream(caddyProc.stderr).catch(() => {});
        await caddyProc.exited;
        markOperationFinished(caddyProc.exitCode ?? 1);
      } else {
        markOperationFinished(proc.exitCode ?? 1);
      }
    } catch {
      markOperationFinished(proc.exitCode ?? 1);
    }
  });
}

export async function logsResponse(paths: Paths, params: URLSearchParams) {
  const source = params.get("source") ?? "app";
  const follow = params.get("follow") === "1";
  const tail = Number(params.get("tail") ?? "200");

  if (source === "daemon") {
    const logFile = join(paths.logsDir, "pomelod.log");
    const content = tailFile(logFile, tail);
    return new Response(content, { headers: { "content-type": "text/plain" } });
  }

  const releaseDir = getCurrentReleaseDir(paths);
  const serviceArgs = source === "app" ? [] : [source];
  const args = ["logs", "--no-color", "--tail", String(tail), ...serviceArgs];
  if (follow) args.splice(1, 0, "--follow");

  const proc = Bun.spawn({
    cmd: ["docker", ...composeArgs(paths, releaseDir, args)],
    cwd: releaseDir,
    stdout: "pipe",
    stderr: "pipe",
    env: getComposeEnv(paths),
  });

  const stream = new ReadableStream({
    start(controller) {
      proc.stdout.pipeTo(
        new WritableStream({
          write(chunk) {
            controller.enqueue(chunk);
          },
        }),
      );
      proc.stderr.pipeTo(
        new WritableStream({
          write(chunk) {
            controller.enqueue(chunk);
          },
        }),
      );
      proc.exited.then(() => controller.close());
    },
  });

  return new Response(stream, { headers: { "content-type": "text/plain" } });
}

function tailFile(path: string, lines: number) {
  if (!existsSync(path)) return "";
  const content = readFileSync(path, "utf8");
  const parts = content.split(/\r?\n/);
  return parts.slice(-lines).join("\n");
}
