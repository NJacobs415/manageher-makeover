// Patches the live n8n auto-publish workflow to use Anthropic's tool_use
// mechanism (structured output) instead of asking Claude to return JSON
// as free text. Fixes the class of failure where Claude writes unescaped
// quotes inside a string value and Build Blog JSON's JSON.parse throws.
//
// Two Code nodes change: Build Claude Request (adds tools + tool_choice)
// and Build Blog JSON (reads from tool_use content block instead of
// JSON.parse on text). No new nodes, no connection rewiring.
//
// Run against a freshly-fetched .raw.json. Writes .patched.json which
// gets PUT to the live n8n instance.

import fs from 'fs';

const RAW = 'n8n-workflows/.At5iovQ74qk4ki5B.raw.json';
const OUT = 'n8n-workflows/.At5iovQ74qk4ki5B.patched.json';
// Documented whitelist from n8n-workflows/README.md. The keys
// binaryMode / timeSavedMode / callerPolicy show up on live re-fetch
// but the public PUT API rejects them (verified empirically here:
// "request/body/settings must NOT have additional properties").
// They are auto-populated server-side; we must NOT send them.
const SETTINGS_WHITELIST = [
  'saveExecutionProgress', 'saveManualExecutions', 'saveDataErrorExecution',
  'saveDataSuccessExecution', 'executionTimeout', 'errorWorkflow',
  'timezone', 'executionOrder', 'availableInMCP',
];

const wf = JSON.parse(fs.readFileSync(RAW, 'utf8'));

// ─── New Build Claude Request body (tool_use mode) ──────────────
const TOPICS_ENUM = [
  'Leadership','Motherhood','Financial Literacy','Wellness','Entrepreneurship',
  'Boundaries','Identity','Marriage','Community','Spirituality',
];

const TOOL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title','episodeNumber','guestName','excerpt','metaDescription','topics','keyTakeaways','content','quiz'],
  properties: {
    title:         { type: 'string', maxLength: 100 },
    episodeNumber: { type: 'integer', minimum: 0 },
    guestName:     { type: 'string' },
    guestBio:      { type: 'string' },
    excerpt:       { type: 'string', maxLength: 400 },
    metaDescription:{ type: 'string', maxLength: 200 },
    topics:        { type: 'array', minItems: 1, maxItems: 5, items: { type: 'string', enum: TOPICS_ENUM } },
    keyTakeaways:  { type: 'array', minItems: 3, maxItems: 8, items: { type: 'string' } },
    guestLinks:    { type: 'array', items: { type: 'object', additionalProperties: false, required: ['label','url'], properties: { label: {type:'string'}, url: {type:'string'} } } },
    pullQuotes:    { type: 'array', items: { type: 'object', additionalProperties: false, required: ['text'], properties: { text: {type:'string'}, timestamp: {type:'string'} } } },
    timestamps:    { type: 'array', items: { type: 'object', additionalProperties: false, required: ['time','label'], properties: { time: {type:'string'}, label: {type:'string'} } } },
    content:       { type: 'string' },
    quiz: {
      type: 'object', additionalProperties: false,
      required: ['title','description','types','questions'],
      properties: {
        title:       { type: 'string' },
        description: { type: 'string' },
        types: {
          type: 'object', additionalProperties: false,
          required: ['A','B','C','D'],
          properties: {
            A: { type: 'object', additionalProperties: false, required: ['name','description'], properties: { name: {type:'string'}, description: {type:'string'} } },
            B: { type: 'object', additionalProperties: false, required: ['name','description'], properties: { name: {type:'string'}, description: {type:'string'} } },
            C: { type: 'object', additionalProperties: false, required: ['name','description'], properties: { name: {type:'string'}, description: {type:'string'} } },
            D: { type: 'object', additionalProperties: false, required: ['name','description'], properties: { name: {type:'string'}, description: {type:'string'} } },
          },
        },
        questions: {
          type: 'array', minItems: 6, maxItems: 6,
          items: {
            type: 'object', additionalProperties: false,
            required: ['question','options'],
            properties: {
              question: { type: 'string' },
              options: {
                type: 'array', minItems: 4, maxItems: 4,
                items: {
                  type: 'object', additionalProperties: false,
                  required: ['text','type'],
                  properties: {
                    text: { type: 'string' },
                    type: { type: 'string', enum: ['A','B','C','D'] },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const BUILD_CLAUDE_REQUEST_JS = `const episode = $input.first().json;

const prompt = \`You are a blog content writer for The Manage Her® — a women's leadership podcast hosted by Aimee Rickabus, CEO of a nine-figure technology company, bestselling author, and mother of six. Generate an enhanced show notes blog post from this podcast episode by calling the generate_blog_post tool.

EPISODE DETAILS:
Title: \${episode.title}
Duration: \${episode.durationFormatted}
Published: \${episode.publishedAt}
YouTube URL: \${episode.youtubeUrl}

EPISODE DESCRIPTION:
\${(episode.description || '').substring(0, 8000)}

TRANSCRIPT:
\${(episode.transcript || '').substring(0, 50000)}

WRITING GUIDANCE:
- title: SEO-friendly, under 80 characters, different from the episode title
- episodeNumber: extract from the title or use 0 if absent
- guestName: full name or empty string for solo episodes
- guestBio: 2-3 sentence bio based on what's discussed
- excerpt: 2-3 sentence summary that makes someone want to listen
- metaDescription: SEO meta description under 160 characters
- topics: 3-5 from the enum (Leadership, Motherhood, Financial Literacy, Wellness, Entrepreneurship, Boundaries, Identity, Marriage, Community, Spirituality)
- keyTakeaways: 5-7 complete-sentence takeaways
- guestLinks: extract Instagram/LinkedIn/TikTok/YouTube/website URLs from the description
- pullQuotes: 3-5 memorable quotes; timestamp empty if unknown
- timestamps: chapter markers from the transcript/description
- content: 800-1200 words of HTML using p/strong/em/h3 tags. Brand voice: bold, warm, direct, permission-giving. Address reader as "you". No bullet lists.
- quiz: a SELF-DISCOVERY quiz (not knowledge test) with empowering archetype names tied to the episode. types.A/B/C/D each have a name (2-4 word archetype) and a 3-4 sentence personalized description in second person ending with why they should listen. questions: EXACTLY 6 questions, each with EXACTLY 4 options. Each option's type is A/B/C/D. All options should feel valid; this is self-discovery, not right/wrong.\`;

const tool = {
  name: "generate_blog_post",
  description: "Generate the structured blog post for this episode.",
  input_schema: \${JSON.stringify(TOOL_SCHEMA_PLACEHOLDER)}
};

const requestBody = {
  model: "claude-sonnet-4-6",
  max_tokens: 10000,
  tools: [tool],
  tool_choice: { type: "tool", name: "generate_blog_post" },
  messages: [{ role: "user", content: prompt }]
};

return [{ json: { ...episode, claudeRequestBody: JSON.stringify(requestBody) } }];
`.replace('${JSON.stringify(TOOL_SCHEMA_PLACEHOLDER)}', JSON.stringify(TOOL_SCHEMA));

// ─── New Build Blog JSON body (tool_use reader) ─────────────────
const BUILD_BLOG_JSON_JS = `// Parse Claude's tool_use response. Anthropic guarantees the input
// object matches the tool's input_schema, so JSON parse failures from
// unescaped quotes in free-text JSON (the original bug) are impossible.
const episode = $('Clean Transcript').item.json;
const claudeResponse = $input.first().json;

if (!Array.isArray(claudeResponse.content)) {
  throw new Error('Claude response missing content array: ' + JSON.stringify(claudeResponse).slice(0, 400));
}
const toolUse = claudeResponse.content.find(b => b.type === 'tool_use' && b.name === 'generate_blog_post');
if (!toolUse) {
  throw new Error('Claude did not return a generate_blog_post tool_use block. stop_reason=' +
    (claudeResponse.stop_reason || 'unknown') + ' content_types=' +
    JSON.stringify(claudeResponse.content.map(b => b.type)));
}
const blogData = toolUse.input;
if (!blogData || typeof blogData !== 'object') {
  throw new Error('tool_use.input is not an object: ' + JSON.stringify(toolUse).slice(0, 400));
}

// Build the complete blog post object (same shape as before).
const post = {
  slug: episode.slug,
  title: blogData.title || episode.title,
  episodeNumber: blogData.episodeNumber || 0,
  guestName: blogData.guestName || '',
  guestBio: blogData.guestBio || '',
  publishedAt: episode.publishedAt,
  duration: episode.durationFormatted,
  thumbnail: episode.thumbnail,
  youtubeUrl: episode.youtubeUrl,
  spotifyUrl: 'https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ',
  appleUrl: 'https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475',
  excerpt: blogData.excerpt || '',
  metaDescription: blogData.metaDescription || '',
  topics: blogData.topics || [],
  keyTakeaways: blogData.keyTakeaways || [],
  guestLinks: blogData.guestLinks || [],
  pullQuotes: blogData.pullQuotes || [],
  timestamps: blogData.timestamps || [],
  quiz: blogData.quiz || null,
  transcript: $('Clean Transcript').first().json.transcript || '',
  content: blogData.content || ''
};

const indexEntry = {
  slug: post.slug,
  title: post.title,
  episodeNumber: post.episodeNumber,
  guestName: post.guestName,
  publishedAt: post.publishedAt,
  duration: post.duration,
  thumbnail: post.thumbnail,
  excerpt: post.excerpt,
  topics: post.topics,
  youtubeUrl: post.youtubeUrl
};

return [{ json: { post, indexEntry, slug: episode.slug } }];
`;

// ─── Apply patches ──────────────────────────────────────────────
let claudeReqNode = wf.nodes.find(n => n.name === 'Build Claude Request');
let buildBlogNode = wf.nodes.find(n => n.name === 'Build Blog JSON');
if (!claudeReqNode) throw new Error('Build Claude Request node not found');
if (!buildBlogNode) throw new Error('Build Blog JSON node not found');

claudeReqNode.parameters = { ...claudeReqNode.parameters, jsCode: BUILD_CLAUDE_REQUEST_JS };
buildBlogNode.parameters = { ...buildBlogNode.parameters, jsCode: BUILD_BLOG_JSON_JS };

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
console.log(`Build Claude Request: now emits tools + tool_choice for generate_blog_post`);
console.log(`Build Blog JSON: now reads tool_use.input (no more JSON.parse)`);
