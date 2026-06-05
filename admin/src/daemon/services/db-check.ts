/**
 * Validates that an external MongoDB URI is reachable via TCP before starting the stack.
 * Only used when database.mode = "external" — internal mode launches Mongo via Docker Compose.
 */
export async function validateMongoConnection(uri: string): Promise<void> {
  const { hostname, port: portStr } = parseMongoUri(uri);
  const port = portStr ? parseInt(portStr, 10) : 27017;

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Timed out connecting to MongoDB at ${hostname}:${port}`));
    }, 3000);

    Bun.connect({
      hostname,
      port,
      socket: {
        open(socket) {
          clearTimeout(timeout);
          socket.end();
          resolve();
        },
        error(_socket, err) {
          clearTimeout(timeout);
          reject(err);
        },
        connectError(_socket, err) {
          clearTimeout(timeout);
          reject(err);
        },
        // Required by Bun socket type but unused here
        data() {},
        close() {},
      },
    }).catch((err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

function parseMongoUri(uri: string): { hostname: string; port: string | null } {
  try {
    // Strip mongodb:// or mongodb+srv:// prefix then grab host:port before /
    const withoutScheme = uri.replace(/^mongodb(\+srv)?:\/\//, "");
    // Remove credentials if present
    const hostPart = withoutScheme.includes("@")
      ? withoutScheme.split("@")[1]
      : withoutScheme;
    // Remove path/options
    const hostAndPort = hostPart.split("/")[0].split("?")[0];
    const lastColon = hostAndPort.lastIndexOf(":");
    if (lastColon === -1) return { hostname: hostAndPort, port: null };
    const hostname = hostAndPort.slice(0, lastColon);
    const port = hostAndPort.slice(lastColon + 1);
    return { hostname, port };
  } catch {
    return { hostname: "localhost", port: null };
  }
}
