import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { errorResponse } from "../web/http";
import {
  isOperationRunning,
  markOperationIdle,
  markOperationRunning,
} from "./operations";
import { getComposeConfig } from "../core/paths";
import { getCurrentReleaseDir } from "../core/release";
import { ensureConfigDefaults } from "../core/config";
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

export async function compose(
  paths: Paths,
  releaseDir: string,
  extraArgs: string[],
) {
  return run("docker", composeArgs(paths, releaseDir, extraArgs), {
    cwd: releaseDir,
  });
}

export async function streamComposeResponse(
  paths: Paths,
  operation: string,
  composeExtraArgs: string[],
) {
  if (isOperationRunning()) {
    return errorResponse("Another operation is in progress", 1);
  }

  if (!(await dockerAvailable())) {
    return errorResponse("Docker unavailable", 3, 503);
  }

  const releaseDir = getCurrentReleaseDir(paths);

  if (operation === "start" || operation === "restart") {
    ensureConfigDefaults(paths, releaseDir);
  }

  markOperationRunning(operation);

  const proc = Bun.spawn({
    cmd: ["docker", ...composeArgs(paths, releaseDir, composeExtraArgs)],
    cwd: releaseDir,
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  });

  proc.exited.finally(() => {
    markOperationIdle();
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let isClosed = false;
      const safeEnqueue = (chunk: any) => {
        if (!isClosed) {
          try {
            controller.enqueue(chunk);
          } catch {}
        }
      };

      const pOut = proc.stdout
        .pipeTo(
          new WritableStream({
            write(chunk) {
              safeEnqueue(chunk);
            },
          }),
        )
        .catch(() => {});

      const pErr = proc.stderr
        .pipeTo(
          new WritableStream({
            write(chunk) {
              safeEnqueue(chunk);
            },
          }),
        )
        .catch(() => {});

      const exitCode = await proc.exited;

      await Promise.race([
        Promise.all([pOut, pErr]),
        new Promise((r) => setTimeout(r, 3000)),
      ]);

      if (!isClosed) {
        isClosed = true;
        try {
          controller.enqueue(encoder.encode(`\n[POMELO_EXIT:${exitCode}]\n`));
        } catch {}
        try {
          controller.close();
        } catch {}
      }
    },
    cancel() {},
  });

  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8" },
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
    env: process.env,
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
