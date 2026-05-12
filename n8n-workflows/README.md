# n8n workflow snapshots

Version-controlled mirrors of live workflows on `n8n.srv1075406.hstgr.cloud`. The live n8n instance is the source of truth; this directory is a JSON snapshot that lets us diff, review, and roll back.

## Files

- `<workflow-id>.json` — current snapshot, committed. Secrets are referenced by credential ID, never inline.
- `<workflow-id>.before-patch.json` — pre-change snapshot for any in-flight edit. Gitignored.
- `.<workflow-id>.raw.json` — raw API fetch with read-only fields included. Gitignored.

## Editing flow

1. Fetch current state:
   ```sh
   set -a; source .env.local; set +a
   curl -sS "$N8N_API_BASE/workflows/<id>" \
     -H "X-N8N-API-KEY: $N8N_API_KEY" \
     -o n8n-workflows/.<id>.raw.json
   cp n8n-workflows/.<id>.raw.json n8n-workflows/<id>.before-patch.json
   ```
2. Build the patched JSON (strip read-only fields, trim `settings` to public-API-accepted keys, keep `availableInMCP: true`).
3. PUT it back:
   ```sh
   curl -sS -X PUT "$N8N_API_BASE/workflows/<id>" \
     -H "X-N8N-API-KEY: $N8N_API_KEY" \
     -H 'Content-Type: application/json' \
     --data-binary @n8n-workflows/.<id>.patched.json
   ```
4. After 200 response, copy the patched body to `<id>.json` and commit.

## Credentials

Bearer tokens / API keys must live in n8n credentials, not inline node parameters. To create one:

```sh
curl -sS -X POST "$N8N_API_BASE/credentials" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"name":"<label>","type":"httpHeaderAuth","data":{"name":"Authorization","value":"Bearer <token>"}}'
```

Then reference the returned `id` in HTTP Request nodes:
```json
{
  "authentication": "genericCredentialType",
  "genericAuthType": "httpHeaderAuth",
  "credentials": { "httpHeaderAuth": { "id": "<credId>", "name": "<label>" } }
}
```

## Known workflow IDs

- `At5iovQ74qk4ki5B` — TMH Auto Blog Publisher. Scheduled every 6 hours. Pulls latest YouTube episodes, publishes blog posts to `manageher-makeover`, and enrolls guests in GHL.

## Public API settings whitelist

n8n's public API rejects unknown keys in `settings`. Use only:
`saveExecutionProgress`, `saveManualExecutions`, `saveDataErrorExecution`, `saveDataSuccessExecution`, `executionTimeout`, `errorWorkflow`, `timezone`, `executionOrder`, `availableInMCP`.

Keep `availableInMCP: true` if MCP tooling should see the workflow.
