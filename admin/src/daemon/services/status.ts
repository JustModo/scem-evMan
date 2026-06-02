import { existsSync } from "fs";
import { join } from "path";
import { compose, dockerAvailable } from "./compose";
import { getOperationState } from "./operations";
import { getCurrentReleaseDir } from "../core/release";
import { run } from "../core/run";
import type { Paths } from "../core/types";

export async function getStatus(paths: Paths) {
  const current = "local";
  const dockerOk = await dockerAvailable();
  let containers: any[] = [];

  const releaseDir = getCurrentReleaseDir(paths);
  const res = await compose(paths, releaseDir, ["ps", "--format", "json"]);
  if (res.code === 0 && res.stdout.trim()) {
    try {
      const stdout = res.stdout.trim();
      if (stdout.startsWith("[")) {
        containers = JSON.parse(stdout);
      } else {
        containers = stdout
          .split(/\r?\n/)
          .filter(Boolean)
          .map((line) => JSON.parse(line));
      }
    } catch {
      containers = [];
    }
  }

  return {
    currentVersion: current,
    dockerAvailable: dockerOk,
    releases: [],
    containers,
    operation: getOperationState(),
  };
}

export async function getStorageUsage(paths: Paths) {
  const targets = {
    database: join(paths.dataDir, "database"),
    uploads: join(paths.dataDir, "uploads"),
    backups: join(paths.dataDir, "backups"),
  };
  const usage: Record<string, { bytes: number }> = {};
  for (const [key, dir] of Object.entries(targets)) {
    usage[key] = await diskUsage(dir);
  }
  return usage;
}

async function diskUsage(path: string) {
  if (!existsSync(path)) return { bytes: 0 };
  const res = await run("du", ["-sk", path]);
  if (res.code !== 0 || !res.stdout.trim()) return { bytes: 0 };
  const sizeKb = Number(res.stdout.trim().split(/\s+/)[0]);
  return { bytes: sizeKb * 1024 };
}
