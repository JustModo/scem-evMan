import { existsSync, rmSync, unlinkSync } from "fs";
import { join } from "path";
import { composeArgs } from "./compose";
import { getCurrentReleaseDir } from "../core/release";
import { run } from "../core/run";
import type { Paths } from "../core/types";

export function streamUninstall(paths: Paths, mode = "default") {
  const encoder = new TextEncoder();
  const currentDir = getCurrentReleaseDir(paths);

  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          if (currentDir && existsSync(currentDir)) {
            controller.enqueue(encoder.encode("Stopping Docker services...\n"));
            const proc = Bun.spawn({
              cmd: [
                "docker",
                ...composeArgs(paths, currentDir, ["down", "-v"]),
              ],
              cwd: currentDir,
              stdout: "pipe",
              stderr: "pipe",
              env: process.env,
            });

            let stdoutDone = false;
            let stderrDone = false;

            const tryClose = async () => {
              if (stdoutDone && stderrDone) {
                await proc.exited;
                await finishUninstall(paths, controller, mode, encoder);
              }
            };

            const pump = async (stream: ReadableStream, isStdout: boolean) => {
              const reader = stream.getReader();
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                controller.enqueue(value);
              }
              if (isStdout) stdoutDone = true;
              else stderrDone = true;
              tryClose();
            };

            pump(proc.stdout, true);
            pump(proc.stderr, false);
          } else {
            await finishUninstall(paths, controller, mode, encoder);
          }
        } catch (e: any) {
          controller.enqueue(
            encoder.encode(`Error: ${e.message}\n[POMELO_EXIT:1]\n`),
          );
          controller.close();
        }
      },
    }),
    {
      headers: { "Content-Type": "text/plain" },
    },
  );
}

async function finishUninstall(
  paths: Paths,
  controller: ReadableStreamDefaultController,
  mode: string,
  encoder: TextEncoder,
) {
  const serviceFile = "/etc/systemd/system/pomelod.service";
  try {
    controller.enqueue(encoder.encode("Disabling systemd service...\n"));
    await run("systemctl", ["disable", "pomelod"]);
    if (existsSync(serviceFile)) {
      unlinkSync(serviceFile);
    }
    await run("systemctl", ["daemon-reload"]);
  } catch {}

  const cliSymlink = "/usr/local/bin/pomelo";
  try {
    if (existsSync(cliSymlink)) {
      controller.enqueue(encoder.encode("Removing CLI symlink...\n"));
      unlinkSync(cliSymlink);
    }
  } catch {}

  try {
    controller.enqueue(encoder.encode("Removing application files...\n"));
    rmSync(join(paths.root, "app"), { recursive: true, force: true });
    rmSync(paths.runtimeDir, { recursive: true, force: true });
  } catch {}

  if (mode === "full") {
    try {
      controller.enqueue(
        encoder.encode("Removing data and configuration...\n"),
      );
      rmSync(paths.dataDir, { recursive: true, force: true });
      rmSync(paths.configDir, { recursive: true, force: true });
    } catch {}
  }
  if (mode !== "keep-data" && mode !== "full") {
    try {
      controller.enqueue(encoder.encode("Removing configuration...\n"));
      rmSync(paths.configDir, { recursive: true, force: true });
    } catch {}
  }

  controller.enqueue(encoder.encode("[POMELO_EXIT:0]\n"));
  controller.close();
}
