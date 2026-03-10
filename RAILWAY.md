# Railway Config as Code Reference

Railway looks for `railway.toml` or `railway.json` files in your codebase. Config defined in code overrides dashboard settings.

**Schema**: `https://railway.com/railway.schema.json`

## Build Section

| Field | Type | Description |
|-------|------|-------------|
| `builder` | string | `RAILPACK` (default), `DOCKERFILE`, `NIXPACKS` (deprecated) |
| `buildCommand` | string | Build command (e.g., `yarn run build`). Can be `null`. |
| `watchPatterns` | string[] | Patterns to conditionally trigger deploys (e.g., `["src/**"]`) |
| `dockerfilePath` | string | Non-standard Dockerfile location (e.g., `Dockerfile.backend`) |
| `railpackVersion` | string | Specific Railpack version (e.g., `0.7.0`) |
| `nixpacksConfigPath` | string | Non-standard nixpacks.toml location |
| `nixpacksVersion` | string | Specific Nixpacks version (e.g., `1.29.1`) |

## Deploy Section

| Field | Type | Description |
|-------|------|-------------|
| `startCommand` | string | Command to run container (e.g., `node index.js`). Can be `null`. |
| `preDeployCommand` | string[] | Commands before starting (e.g., `["npm run db:migrate"]`) |
| `healthcheckPath` | string | Health endpoint path (e.g., `/health`). Can be `null`. |
| `healthcheckTimeout` | number | Seconds to wait for healthy status (e.g., `300`) |
| `restartPolicyType` | string | `ON_FAILURE`, `ALWAYS`, `NEVER` |
| `restartPolicyMaxRetries` | number | Max restart attempts (e.g., `5`) |
| `cronSchedule` | string | Cron expression (e.g., `*/15 * * * *`) |
| `multiRegionConfig` | object | Regional replicas config |
| `drainingSeconds` | string | Teardown drain time (e.g., `"10"`) |

## Environment Overrides

Override settings per environment using `environments.[name]` block:

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "environments": {
    "staging": {
      "deploy": {
        "startCommand": "npm run staging"
      }
    },
    "pr": {
      "deploy": {
        "startCommand": "npm run pr"
      }
    }
  }
}
```

Priority order:
1. Environment-specific config in code
2. Dashboard environment settings
3. Base config in code
4. Dashboard base settings

## Examples

### JSON Format

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "RAILPACK",
    "buildCommand": "pnpm install",
    "watchPatterns": [
      "packages/backend/**",
      "packages/shared/**",
      "pnpm-lock.yaml"
    ]
  },
  "deploy": {
    "startCommand": "pnpm --filter backend start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### TOML Format

```toml
[build]
builder = "RAILPACK"
buildCommand = "pnpm install"
watchPatterns = [
  "packages/backend/**",
  "packages/shared/**",
  "pnpm-lock.yaml"
]

[deploy]
startCommand = "pnpm --filter backend start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### Multi-Region Scaling

```json
{
  "deploy": {
    "multiRegionConfig": {
      "us-west2": { "numReplicas": 2 },
      "us-east4-eqdc4a": { "numReplicas": 2 },
      "europe-west4-drams3a": { "numReplicas": 2 }
    }
  }
}
```

## Watch Patterns

Watch patterns conditionally trigger deploys. Changes not matching patterns skip deployment.

- Patterns operate from repository root `/` even with a Root Directory set
- For root directory `/app`, use `/app/**.js` to match files

```json
{
  "build": {
    "watchPatterns": ["src/**", "package.json"]
  }
}
```

## Railpack SPA / Static Site Serving

Railpack auto-detects SPA frameworks (Vite, CRA, React Router, Astro) and serves them with Caddy automatically. No custom start command needed.

**Key env var:** `RAILPACK_SPA_OUTPUT_DIR` — set this to the build output directory relative to the repo root (e.g., `packages/webapp/build`). Railpack uses this to locate the static files and serve them with Caddy.

**Important:**
- Do NOT set a custom `startCommand` for SPA services — a custom start command causes Railpack to skip Caddy, resulting in "caddy: not found" errors
- Railpack defaults to `dist` output dir. For Vite with `build` output or monorepo paths, set `RAILPACK_SPA_OUTPUT_DIR` explicitly
- To disable SPA serving, set `RAILPACK_NO_SPA=1`

**References:**
- [Railpack Static Sites](https://railpack.com/languages/staticfile/)
- [Railpack Node.js](https://railpack.com/languages/node/)

## Node Version

Railpack reads the Node version from `engines.node` in `package.json`. In a monorepo, it reads the **root** `package.json`, not the workspace package. Set `"node": "22.x"` in the root `package.json` to ensure all services use Node 22.

Alternatively, set `RAILPACK_NODE_VERSION=22` as a service variable or add a `.nvmrc` file at the repo root.

## Notes

- Railway auto-detects Dockerfile and uses it if found
- New services default to Railpack builder
- Nixpacks is deprecated and in maintenance mode
- Config file does NOT follow Root Directory - use absolute paths like `/backend/railway.toml`
