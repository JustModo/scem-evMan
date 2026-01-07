FROM node:18-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY packages ./packages
COPY server ./server

RUN pnpm install --no-frozen-lockfile

WORKDIR /app/server

EXPOSE 8080

CMD ["pnpm", "start"]
