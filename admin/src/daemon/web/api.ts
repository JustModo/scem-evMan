import { logsResponse, startCompose } from "../services/compose";
import { getConfigSnapshot, updateConfig, validateConfig } from "../core/config";
import { errorResponse, json, normalizeError, readJson } from "./http";
import { getStatus, getStorageUsage } from "../services/status";
import { startUninstall } from "../services/uninstall";
import { createUser, deleteUser, listUsers, updateUser } from "../services/users";
import { isOperationRunning, getOperationState, getLogBuffer, subscribeToLogs } from "../services/operations";
import type { Paths } from "../core/types";

export function createApiHandler(paths: Paths) {
  return async function handleApi(req: Request, url: URL, method: string) {
    try {
      if (method === "GET" && url.pathname === "/api/health") {
        return json({ status: "ok" });
      }

      if (method === "GET" && url.pathname === "/api/status") {
        return json({ status: "ok", data: await getStatus(paths) });
      }

      if (method === "GET" && url.pathname === "/api/command/stream") {
        const state = getOperationState();
        if (state.status === "idle" && state.exitCode === undefined) {
          return json({ status: "idle" });
        }

        const encoder = new TextEncoder();
        let cleanup: (() => void) | undefined;

        const stream = new ReadableStream({
          start(controller) {
            const sendChunk = (text: string) => {
              try {
                controller.enqueue(encoder.encode(text));
              } catch {}
            };

            // Send past logs immediately
            const buffer = getLogBuffer();
            if (buffer) sendChunk(buffer);

            if (!isOperationRunning()) {
              sendChunk(`\n[POMELO_EXIT:${state.exitCode ?? 0}]\n`);
              controller.close();
              return;
            }

            cleanup = subscribeToLogs({
              onChunk: (chunk) => sendChunk(chunk),
              onExit: (code) => {
                sendChunk(`\n[POMELO_EXIT:${code}]\n`);
                try { controller.close(); } catch {}
              },
            });
          },
          cancel() {
            cleanup?.();
          },
        });

        return new Response(stream, {
          headers: { 
            "content-type": "text/event-stream; charset=utf-8",
            "cache-control": "no-cache",
            "connection": "keep-alive",
          },
        });
      }

      if (method === "POST" && url.pathname === "/api/start") {
        await startCompose(paths, "start", ["up", "-d", "--build"]);
        return json({ status: "ok" });
      }

      if (method === "POST" && url.pathname === "/api/stop") {
        await startCompose(paths, "stop", ["stop"]);
        return json({ status: "ok" });
      }

      if (method === "POST" && url.pathname === "/api/restart") {
        const body = await readJson(req);
        const target = body?.target; // "all" | "caddy" | "judge"
        const args = ["up", "-d", "--build"];
        if (target === "caddy") {
          args.push("caddy");
        } else if (target === "judge") {
          args.push("judge0-server", "judge0-workers");
        }
        await startCompose(paths, "restart", args);
        return json({ status: "ok" });
      }

      if (method === "GET" && url.pathname === "/api/logs") {
        return logsResponse(paths, url.searchParams);
      }

      if (method === "GET" && url.pathname === "/api/config") {
        return json({ status: "ok", data: getConfigSnapshot(paths) });
      }

      if (method === "PUT" && url.pathname === "/api/config") {
        const body = await readJson(req);
        
        // Detect what changed before writing
        const currentConfig = getConfigSnapshot(paths);
        const appEnvChanged = typeof body.appEnv === "string" && body.appEnv !== currentConfig.appEnv;
        const configYamlChanged = typeof body.configYaml === "string" && body.configYaml !== currentConfig.configYaml;
        const caddyfileChanged = typeof body.caddyfile === "string" && body.caddyfile !== currentConfig.caddyfile;
        const judge0Changed = typeof body.judge0 === "string" && body.judge0 !== currentConfig.judge0;

        updateConfig(paths, body);

        let restartAction: "none" | "all" | "caddy" | "judge" = "none";
        if (appEnvChanged || configYamlChanged) {
          restartAction = "all";
        } else if (caddyfileChanged && judge0Changed) {
          restartAction = "all";
        } else if (caddyfileChanged) {
          restartAction = "caddy";
        } else if (judge0Changed) {
          restartAction = "judge";
        }

        return json({ status: "ok", data: { saved: true, restartAction } });
      }

      if (method === "POST" && url.pathname === "/api/config/validate") {
        return json({ status: "ok", data: validateConfig(paths) });
      }

      if (method === "POST" && url.pathname === "/api/uninstall") {
        if (isOperationRunning()) {
          return errorResponse("Another operation is in progress", 1);
        }
        const body = await readJson(req);
        // Start uninstall in the background
        startUninstall(paths, body.mode).catch(console.error);
        return json({ status: "ok" });
      }

      if (method === "GET" && url.pathname === "/api/storage") {
        return json({ status: "ok", data: await getStorageUsage(paths) });
      }

      if (method === "GET" && url.pathname === "/api/users") {
        const role = url.searchParams.get("role") || undefined;
        const page = Number(url.searchParams.get("page") || "1");
        const limit = Number(url.searchParams.get("limit") || "10");
        return json({
          status: "ok",
          data: await listUsers(paths, { role, page, limit }),
        });
      }

      if (method === "POST" && url.pathname === "/api/users") {
        const body = await readJson(req);
        return json({ status: "ok", data: await createUser(paths, body) }, 201);
      }

      const userMatch = url.pathname.match(/^\/api\/users\/([a-f0-9]{24})$/);
      if (userMatch) {
        const userId = userMatch[1];
        if (method === "PUT") {
          const body = await readJson(req);
          return json({
            status: "ok",
            data: await updateUser(paths, userId, body),
          });
        }
        if (method === "DELETE") {
          await deleteUser(paths, userId);
          return json({ status: "ok", data: { deleted: true } });
        }
      }

      return errorResponse("Not found", 1, 404);
    } catch (err) {
      const { message, code } = normalizeError(err);
      return errorResponse(message, code ?? 1, 500);
    }
  };
}
