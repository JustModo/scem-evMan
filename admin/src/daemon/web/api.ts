import { logsResponse, streamComposeResponse } from "../services/compose";
import { getConfigSnapshot, updateConfig, validateConfig } from "../core/config";
import { errorResponse, json, normalizeError, readJson } from "./http";
import { getStatus, getStorageUsage } from "../services/status";
import { streamUninstall } from "../services/uninstall";
import { createUser, deleteUser, listUsers, updateUser } from "../services/users";
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

      if (method === "POST" && url.pathname === "/api/start") {
        return streamComposeResponse(paths, "start", ["up", "-d", "--build"]);
      }

      if (method === "POST" && url.pathname === "/api/stop") {
        return streamComposeResponse(paths, "stop", ["stop"]);
      }

      if (method === "POST" && url.pathname === "/api/restart") {
        return streamComposeResponse(paths, "restart", ["up", "-d", "--build"]);
      }

      if (method === "GET" && url.pathname === "/api/logs") {
        return logsResponse(paths, url.searchParams);
      }

      if (method === "GET" && url.pathname === "/api/config") {
        return json({ status: "ok", data: getConfigSnapshot(paths) });
      }

      if (method === "PUT" && url.pathname === "/api/config") {
        const body = await readJson(req);
        return json({ status: "ok", data: updateConfig(paths, body) });
      }

      if (method === "POST" && url.pathname === "/api/config/validate") {
        return json({ status: "ok", data: validateConfig(paths) });
      }

      if (method === "POST" && url.pathname === "/api/uninstall") {
        const body = await readJson(req);
        return streamUninstall(paths, body.mode);
      }

      if (method === "GET" && url.pathname === "/api/storage") {
        return json({ status: "ok", data: await getStorageUsage(paths) });
      }

      if (method === "GET" && url.pathname === "/api/users") {
        return json({ status: "ok", data: await listUsers(paths) });
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
