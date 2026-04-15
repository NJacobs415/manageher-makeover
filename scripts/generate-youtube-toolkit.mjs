import fs from 'fs';
import path from 'path';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const OUTPUT_DIR = path.join(process.cwd(), 'scripts/youtube-toolkit');
const MODEL = 'claude-sonnet-4-20250514';
const EPISODES = [57, 56];
const DELAY_MS = 3000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extractJson(text) {
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  try { return JSON.parse(clean); } catch {}
  const first = clean.indexOf('{');
  const last = clean.lastIndexOf('}');
  if (first !== -1 && last !== -1) return JSON.parse(clean.slice(first, last + 1));
  throw new Error('Could not extract JSON from model response');
}

async function generateToolkit(post) {
  const takeaways = (post.keyTakeaways || []).map((t) => `- ${t}`).join('\n');
  const quotes = (post.pullQuotes || []).map((q) => `- "${q.text}"`).join('\n');
  const blogUrl = `https://themanageher.com/blog/${post.slug}`;
  const guestLinks = post.guestLinks || [];

  const prompt = `You are a YouTube growth strategist for The Manage Her® Podcast — a women's leadership podcast. Generate a complete YouTube growth toolkit for this episode.

EPISODE: ${post.title}
EPISODE NUMBER: ${post.episodeNumber}
GUEST: ${post.guestName || '(solo episode)'}
GUEST LINKS: ${JSON.stringify(guestLinks)}
KEY TAKEAWAYS:
${takeaways}
PULL QUOTES:
${quotes}
EXCERPT: ${post.excerpt || ''}
YOUTUBE URL: ${post.youtubeUrl}
BLOG URL: ${blogUrl}

RULES FOR LINKS:
- Use the actual guest links provided in GUEST LINKS — do NOT use placeholder text like [Guest website] or [Guest Instagram]. If the GUEST LINKS array is empty, omit the "Connect with guest" section entirely.
- The quiz lives ON the blog post page, not at a separate /quiz URL. Link to the blog post URL for both the full show notes AND the quiz. In the description, format as: "📊 TAKE THE QUIZ: ${blogUrl}"
- The pinned comment should also link to ${blogUrl} — never to themanageher.com/quiz or any other invented URL.

Generate JSON with this structure:
{
  "shorts": [
    {
      "hook": "Bold first-line text overlay (2 sec hook, under 10 words)",
      "content": "The key quote or insight to feature (15-30 seconds of speech)",
      "title": "Curiosity-driven Shorts title under 60 chars",
      "hashtags": ["5-8 relevant hashtags"],
      "cta": "Subscribe for more leadership insights"
    }
  ],
  "titleOptions": {
    "curiosityGap": "Title that creates a curiosity gap (e.g. What happens when...)",
    "boldStatement": "Title that makes a bold claim",
    "numberBased": "Title with a number (e.g. 5 Signs Your...)"
  },
  "description": "Full SEO-optimized YouTube description with: hook (2 lines), timestamps, key takeaways, guest links, subscribe links, blog link, quiz link, 10 hashtags",
  "communityPosts": [
    {
      "type": "poll or quote or recommendation",
      "content": "The full post text ready to paste into YouTube Community tab"
    }
  ],
  "pinnedComment": "A pinned comment for this video that drives engagement and links to the blog/quiz"
}

Generate exactly 4 Shorts ideas, 3 title options, 1 full description, 2 community posts, and 1 pinned comment.
IMPORTANT: Return ONLY valid JSON.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return extractJson(data.content[0].text);
}

function buildMarkdown(post, kit) {
  const shorts = (kit.shorts || []).map((s, i) => {
    const tags = (s.hashtags || []).map((h) => (h.startsWith('#') ? h : `#${h}`)).join(' ');
    return `### Short ${i + 1}: ${s.hook}
**Title:** ${s.title}
**Content to clip:** ${s.content}
**Hashtags:** ${tags}
**CTA:** ${s.cta}`;
  }).join('\n\n');

  const community = (kit.communityPosts || []).map((p, i) =>
    `### Community Post ${i + 1} (${p.type})\n${p.content}`
  ).join('\n\n');

  const t = kit.titleOptions || {};

  return `# Episode ${post.episodeNumber}: ${post.title}

_Guest: ${post.guestName || '(solo episode)'} · [YouTube](${post.youtubeUrl}) · [Blog](https://themanageher.com/blog/${post.slug})_

## 🎬 Shorts Ideas

${shorts}

## 📝 Title A/B Test Options

- **Curiosity gap:** ${t.curiosityGap || ''}
- **Bold statement:** ${t.boldStatement || ''}
- **Number-based:** ${t.numberBased || ''}

## 📋 Optimized Description

${kit.description || ''}

## 💬 Community Tab Posts

${community}

## 📌 Pinned Comment

${kit.pinnedComment || ''}
`;
}

async function main() {
  if (!ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY env var');
    process.exit(1);
  }
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const index = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, 'posts.json'), 'utf-8')).posts || [];

  for (const ep of EPISODES) {
    const meta = index.find((p) => p.episodeNumber === ep);
    if (!meta) {
      console.error(`❌ No post found for Ep ${ep}`);
      continue;
    }
    const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, `${meta.slug}.json`), 'utf-8'));

    console.log(`Ep ${ep}: ${post.title.slice(0, 70)}…`);
    let kit;
    for (let attempt = 1; attempt <= 3 && !kit; attempt++) {
      try {
        kit = await generateToolkit(post);
      } catch (e) {
        console.error(`  attempt ${attempt} failed: ${e.message.slice(0, 200)}`);
        if (attempt < 3) await sleep(DELAY_MS);
      }
    }
    if (!kit) {
      console.error(`  ❌ giving up on Ep ${ep}`);
      continue;
    }

    const jsonPath = path.join(OUTPUT_DIR, `ep-${ep}.json`);
    const mdPath = path.join(OUTPUT_DIR, `ep-${ep}-readable.md`);
    fs.writeFileSync(jsonPath, JSON.stringify(kit, null, 2));
    fs.writeFileSync(mdPath, buildMarkdown(post, kit));
    console.log(`  ✅ wrote ${jsonPath} and ${mdPath}`);

    if (ep !== EPISODES[EPISODES.length - 1]) await sleep(DELAY_MS);
  }

  console.log('\n🎉 Done');
}

main();
