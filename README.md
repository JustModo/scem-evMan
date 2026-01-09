# scem-evMan

## Development Setup

#### Run Judge0 + Mongo only

```bash
docker compose --project-name pomelo --env-file .env -f docker/app/docker-compose.dev.yaml -f docker/judge0/docker-compose.yaml --project-directory . up mongo judge0-server judge0-workers -d
```
---

#### Shut Down
```bash
docker compose --project-name pomelo down
```

### Run Dev Server

#### Windows
```bash
node scripts/dev.bat
```

#### Linux
```bash
node scripts/dev
```