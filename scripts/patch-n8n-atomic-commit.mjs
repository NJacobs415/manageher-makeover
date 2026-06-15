// One-off patcher: rewrites the auto-publish flow to make a single atomic
// commit (Git Data API: blob → tree → commit → ref) instead of two
// separate Contents-API commits. See n8n-workflows/.atomic-commit-design.md.
//
// Run after `curl …workflows/<id> > .raw.json`. Writes .patched.json,
// which then gets PUT to the live n8n instance.

import fs from 'fs';

const RAW = 'n8n-workflows/.At5iovQ74qk4ki5B.raw.json';
const OUT = 'n8n-workflows/.At5iovQ74qk4ki5B.patched.json';
const GITHUB_CRED = { id: 'Z8iraOqUHXjTIxm3', name: 'GitHub PAT - Blog Publisher' };
const SETTINGS_WHITELIST = [
  'saveExecutionProgress', 'saveManualExecutions', 'saveDataErrorExecution',
  'saveDataSuccessExecution', 'executionTimeout', 'errorWorkflow',
  'timezone', 'executionOrder', 'availableInMCP',
];

const wf = JSON.parse(fs.readFileSync(RAW, 'utf8'));

// ─── Remove the 5 nodes being replaced ─────────────────────────
const TO_REMOVE = new Set([
  'Code in JavaScript1',
  'Commit Blog Post to GitHub',
  'Fetch Current posts.json',
  'Update Posts Index',
  'Commit Updated Index',
]);
wf.nodes = wf.nodes.filter((n) => !TO_REMOVE.has(n.name));

// ─── New helper to build an HTTP GitHub node ────────────────────
function gh({ id, name, method, urlExpr, body, position, neverError }) {
  const params = {
    method,
    url: urlExpr,
    authentication: 'predefinedCredentialType',
    nodeCredentialType: 'githubApi',
    sendHeaders: true,
    headerParameters: {
      parameters: [
        { name: 'Accept', value: 'application/vnd.github+json' },
        { name: 'X-GitHub-Api-Version', value: '2022-11-28' },
      ],
    },
    // For the posts.json fetch we want a full {statusCode, body} envelope so
    // the Code node can distinguish 200 from 404 explicitly (per codex review).
    options: neverError
      ? { response: { response: { neverError: true, fullResponse: true, responseFormat: 'json' } } }
      : {},
  };
  if (body) {
    params.sendBody = true;
    params.specifyBody = 'json';
    params.jsonBody = body;
  }
  return {
    parameters: params,
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.3,
    position,
    id,
    name,
    credentials: { githubApi: GITHUB_CRED },
  };
}

// ─── 9 new nodes, laid out left-to-right from Build Blog JSON ──
// Build Blog JSON is at (2224, 112). Each step adds 224px right.
const Y = 112;
const X0 = 2448;
const STEP = 224;
const x = (i) => X0 + i * STEP;

const newNodes = [
  gh({
    id: 'a000aaaa-0001-0001-0001-000000000001',
    name: 'GH: Get HEAD Ref',
    method: 'GET',
    urlExpr: 'https://api.github.com/repos/NJacobs415/manageher-makeover/git/refs/heads/main',
    position: [x(0), Y],
  }),
  gh({
    id: 'a000aaaa-0002-0002-0002-000000000002',
    name: 'GH: Get HEAD Commit',
    method: 'GET',
    urlExpr: '=https://api.github.com/repos/NJacobs415/manageher-makeover/git/commits/{{ $json.object.sha }}',
    position: [x(1), Y],
  }),
  gh({
    id: 'a000aaaa-0003-0003-0003-000000000003',
    name: 'GH: Get posts.json (or 404)',
    method: 'GET',
    urlExpr: 'https://api.github.com/repos/NJacobs415/manageher-makeover/contents/public/blog/posts.json',
    position: [x(2), Y],
    neverError: true,
  }),
  {
    parameters: {
      jsCode: [
        "// Strict 200/404 status-code split per atomic-commit design (v2).",
        "// fullResponse:true on the previous node gives us {statusCode, body, headers}.",
        "// Any status other than 200 or 404 throws — we do NOT silently",
        "// reset posts.json to an empty index on transient/auth errors.",
        "const buildOut = $node[\"Build Blog JSON\"].json;",
        "const headRef  = $node[\"GH: Get HEAD Ref\"].json;",
        "const headCommit = $node[\"GH: Get HEAD Commit\"].json;",
        "const env = $input.first().json;",
        "",
        "if (!headRef?.object?.sha) throw new Error('GH: Get HEAD Ref returned no object.sha');",
        "if (!headCommit?.tree?.sha) throw new Error('GH: Get HEAD Commit returned no tree.sha');",
        "",
        "const status = env?.statusCode;",
        "if (typeof status !== 'number') {",
        "  throw new Error('posts.json fetch: missing statusCode (fullResponse not enabled?). Got: ' + JSON.stringify(env).slice(0,200));",
        "}",
        "",
        "let existingPosts = [];",
        "if (status === 200) {",
        "  const body = env.body;",
        "  if (!body || typeof body.content !== 'string') {",
        "    throw new Error('200 from posts.json fetch but body.content missing or not a string.');",
        "  }",
        "  try {",
        "    const decoded = Buffer.from(body.content, 'base64').toString('utf-8');",
        "    const parsed = JSON.parse(decoded);",
        "    existingPosts = Array.isArray(parsed.posts) ? parsed.posts : [];",
        "  } catch(e) {",
        "    throw new Error('Failed to decode/parse current posts.json: ' + e.message);",
        "  }",
        "} else if (status === 404) {",
        "  // Bootstrap empty index — only valid path for an empty repo.",
        "  existingPosts = [];",
        "} else {",
        "  throw new Error('Refusing to mutate posts.json — unexpected status ' + status + ' from contents API: ' + JSON.stringify(env.body || env).slice(0,300));",
        "}",
        "",
        "const newEntry = buildOut.indexEntry;",
        "const merged = [newEntry, ...existingPosts.filter(p => p.slug !== newEntry.slug)];",
        "const indexJson = JSON.stringify({ posts: merged }, null, 2);",
        "const postJson  = JSON.stringify(buildOut.post, null, 2);",
        "",
        "return [{",
        "  json: {",
        "    headSha: headRef.object.sha,",
        "    treeSha: headCommit.tree.sha,",
        "    slug: buildOut.slug,",
        "    title: buildOut.post.title,",
        "    postPath: 'public/blog/' + buildOut.slug + '.json',",
        "    indexPath: 'public/blog/posts.json',",
        "    postBase64: Buffer.from(postJson).toString('base64'),",
        "    indexBase64: Buffer.from(indexJson).toString('base64'),",
        "  }",
        "}];",
      ].join('\n'),
    },
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [x(3), Y],
    id: 'a000aaaa-0004-0004-0004-000000000004',
    name: 'Merge Index + Encode Blobs',
  },
  gh({
    id: 'a000aaaa-0005-0005-0005-000000000005',
    name: 'GH: Create Post Blob',
    method: 'POST',
    urlExpr: 'https://api.github.com/repos/NJacobs415/manageher-makeover/git/blobs',
    body: '={\n  "content": "{{ $json.postBase64 }}",\n  "encoding": "base64"\n}',
    position: [x(4), Y],
  }),
  gh({
    id: 'a000aaaa-0006-0006-0006-000000000006',
    name: 'GH: Create Index Blob',
    method: 'POST',
    urlExpr: 'https://api.github.com/repos/NJacobs415/manageher-makeover/git/blobs',
    body: '={\n  "content": "{{ $node[\"Merge Index + Encode Blobs\"].json.indexBase64 }}",\n  "encoding": "base64"\n}',
    position: [x(5), Y],
  }),
  gh({
    id: 'a000aaaa-0007-0007-0007-000000000007',
    name: 'GH: Create Tree',
    method: 'POST',
    urlExpr: 'https://api.github.com/repos/NJacobs415/manageher-makeover/git/trees',
    body: [
      '={',
      '  "base_tree": "{{ $node[\"Merge Index + Encode Blobs\"].json.treeSha }}",',
      '  "tree": [',
      '    {',
      '      "path": "{{ $node[\"Merge Index + Encode Blobs\"].json.postPath }}",',
      '      "mode": "100644",',
      '      "type": "blob",',
      '      "sha": "{{ $node[\"GH: Create Post Blob\"].json.sha }}"',
      '    },',
      '    {',
      '      "path": "{{ $node[\"Merge Index + Encode Blobs\"].json.indexPath }}",',
      '      "mode": "100644",',
      '      "type": "blob",',
      '      "sha": "{{ $node[\"GH: Create Index Blob\"].json.sha }}"',
      '    }',
      '  ]',
      '}',
    ].join('\n'),
    position: [x(6), Y],
  }),
  gh({
    id: 'a000aaaa-0008-0008-0008-000000000008',
    name: 'GH: Create Commit',
    method: 'POST',
    urlExpr: 'https://api.github.com/repos/NJacobs415/manageher-makeover/git/commits',
    body: [
      '={',
      '  "message": "Auto-publish blog: {{ $node[\"Merge Index + Encode Blobs\"].json.title }}",',
      '  "tree": "{{ $json.sha }}",',
      '  "parents": ["{{ $node[\"Merge Index + Encode Blobs\"].json.headSha }}"]',
      '}',
    ].join('\n'),
    position: [x(7), Y],
  }),
  gh({
    id: 'a000aaaa-0009-0009-0009-000000000009',
    name: 'GH: Update Ref (atomic)',
    method: 'PATCH',
    urlExpr: 'https://api.github.com/repos/NJacobs415/manageher-makeover/git/refs/heads/main',
    // force omitted → fast-forward only. 422 on non-FF.
    body: '={\n  "sha": "{{ $json.sha }}"\n}',
    position: [x(8), Y],
  }),
];

wf.nodes.push(...newNodes);

// ─── Rewire connections ─────────────────────────────────────────
// Remove old connection keys for nodes we deleted.
for (const name of TO_REMOVE) delete wf.connections[name];

const connect = (from, to) => {
  wf.connections[from] = wf.connections[from] || {};
  wf.connections[from].main = wf.connections[from].main || [[]];
  wf.connections[from].main[0].push({ node: to, type: 'main', index: 0 });
};

// Replace Build Blog JSON → Code in JavaScript1 with → GH: Get HEAD Ref.
wf.connections['Build Blog JSON'] = { main: [[ { node: 'GH: Get HEAD Ref', type: 'main', index: 0 } ]] };

// Chain the 9 new nodes left-to-right.
const order = [
  'GH: Get HEAD Ref',
  'GH: Get HEAD Commit',
  'GH: Get posts.json (or 404)',
  'Merge Index + Encode Blobs',
  'GH: Create Post Blob',
  'GH: Create Index Blob',
  'GH: Create Tree',
  'GH: Create Commit',
  'GH: Update Ref (atomic)',
];
for (let i = 0; i < order.length - 1; i++) connect(order[i], order[i + 1]);

// Final node connects to the existing downstream (Ping IndexNow).
connect('GH: Update Ref (atomic)', 'Ping IndexNow');

// ─── Strip read-only / public-API-rejected fields ───────────────
const allowed = ['connections', 'name', 'nodes', 'settings', 'staticData'];
const out = Object.fromEntries(Object.entries(wf).filter(([k]) => allowed.includes(k)));
if (out.settings) {
  out.settings = Object.fromEntries(
    Object.entries(out.settings).filter(([k]) => SETTINGS_WHITELIST.includes(k)),
  );
}

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`Patched workflow written to ${OUT}`);
console.log(`Total nodes after patch: ${out.nodes.length}`);
console.log(`New connection chain:`);
for (let i = 0; i < order.length - 1; i++) console.log(`  ${order[i]} → ${order[i + 1]}`);
console.log(`  GH: Update Ref (atomic) → Ping IndexNow`);
