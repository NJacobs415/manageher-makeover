import fs from 'fs';
import path from 'path';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const OUTPUT_DIR = path.join(process.cwd(), 'public/substack-drafts');
const SITE_URL = 'https://themanageher.com';
const MODEL = 'claude-sonnet-4-20250514';
const DELAY_MS = 3000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateSubstackCopy(post) {
  const takeaways = (post.keyTakeaways || []).map((t) => `- ${t}`).join('\n');
  const excerpt = post.excerpt || post.metaDescription || '';

  const prompt = `You are writing Substack newsletter copy for The Manage Her® — a women's leadership podcast hosted by Aimee Rickabus, CEO of a nine-figure tech company, bestselling author, and mother of six. Her voice is warm, bold, direct, permission-giving, and speaks "to" women as a peer (not at them).

Generate three pieces of copy for this episode's Substack newsletter:

EPISODE: ${post.title}
GUEST: ${post.guestName || 'Solo episode'}
EXCERPT: ${excerpt}
KEY TAKEAWAYS:
${takeaways}

Return ONLY valid JSON (no markdown, no backticks) with this exact structure:
{
  "hook": "A single provocative, scroll-stopping opening sentence (a question or bold claim) derived from the episode's MAIN theme. 15-25 words. Example: 'What if the skills you use to manage your household are worth more than an MBA?' Avoid clichés. Must reflect the actual episode theme, not generic women's-leadership fluff.",
  "intro": "2-3 sentences in Aimee's first-person voice ('I'). Warm, personal, explains why THIS specific conversation mattered to her. 50-80 words. Should follow 'Hey friend,' naturally. Don't restate the hook.",
  "summary": "A 400-500 word HTML-formatted summary of the episode. Use <p> tags for paragraphs (3-5 paragraphs). Write in Aimee's voice, second person ('you'). Hit the main themes and actionable insights — this is a teaser, not the full show notes. End the final paragraph with a sentence that makes the reader want to click through to read the full article and take the quiz. Do NOT include bullet lists. Do NOT include <h2> or <h3>. Just flowing prose in <p> tags."
}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data.content[0].text;
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  try {
    return JSON.parse(clean);
  } catch (e) {
    const first = clean.indexOf('{');
    const last = clean.lastIndexOf('}');
    if (first !== -1 && last !== -1) return JSON.parse(clean.slice(first, last + 1));
    throw e;
  }
}

function buildHtml(post, copy) {
  const guestLine = post.guestName ? `with ${post.guestName}` : '(solo episode)';
  let guestLinksHtml = '';
  if (post.guestLinks?.length > 0) {
    guestLinksHtml =
      `<p><strong>Connect with ${post.guestName || 'the guest'}:</strong></p><ul>` +
      post.guestLinks.map((l) => `<li><a href="${l.url}">${l.label}</a></li>`).join('\n') +
      '</ul>';
  }
  const guestBlock = post.guestBio
    ? `<h2>About ${post.guestName || 'The Guest'}</h2>\n<p>${post.guestBio}</p>\n${guestLinksHtml}`
    : '';
  const firstQuote = post.pullQuotes?.[0]
    ? `<blockquote><p><em>"${post.pullQuotes[0].text}"</em></p></blockquote>`
    : '';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${post.title}</title></head>
<body>

<!-- SUBSTACK TITLE: ${post.title} -->
<!-- SUBSTACK SUBTITLE: Episode ${post.episodeNumber} | ${guestLine} -->

<img src="${post.thumbnail}" alt="${post.title.replace(/"/g, '&quot;')}" style="width:100%;border-radius:8px;" />

<p><strong>${copy.hook}</strong></p>

<p>Hey friend,</p>

<p>In this week's episode of The Manage Her® Podcast, ${copy.intro}</p>

<p><a href="${post.youtubeUrl}">🎬 Watch the full episode</a> · <a href="${post.spotifyUrl}">🎧 Spotify</a> · <a href="${post.appleUrl}">🍎 Apple Podcasts</a></p>

<hr>

<h2>🔑 What you'll take away</h2>

<ol>
${(post.keyTakeaways || []).map((t) => `<li>${t}</li>`).join('\n')}
</ol>

<p><em>If you're enjoying The Manage Her®, would you share it with one woman who needs to hear this? 👇</em></p>

<p><a href="https://themanageher.substack.com/?utm_source=substack&utm_medium=email">Share The Manage Her®</a></p>

<hr>

${firstQuote}

<h2>The big idea</h2>

${copy.summary}

<p>👉 <a href="${SITE_URL}/blog/${post.slug}"><strong>Read the full show notes + take the self-discovery quiz →</strong></a></p>

<hr>

${guestBlock}

<hr>

<h2>📚 More from The Manage Her®</h2>

<ul>
<li>📖 <a href="https://a.co/d/by5X0fV">Get the book</a></li>
<li>🎙️ <a href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475">Subscribe on Apple</a></li>
<li>📺 <a href="https://www.youtube.com/@TheManageHer">YouTube</a></li>
<li>📸 <a href="https://www.instagram.com/themanageher/">Instagram</a></li>
</ul>

<hr>

<p>❤️ <em>If this resonated with you, tap the heart below — it helps more women discover The Manage Her®.</em></p>

<p><em>See you next Monday,</em></p>
<p><strong>Aimee</strong><br><em>CEO, Author & Host | The Manage Her®</em></p>

</body>
</html>`;
}

async function main() {
  if (!ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY env var');
    process.exit(1);
  }

  // Wipe and recreate output dir
  if (fs.existsSync(OUTPUT_DIR)) {
    for (const f of fs.readdirSync(OUTPUT_DIR)) {
      fs.unlinkSync(path.join(OUTPUT_DIR, f));
    }
  } else {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const postsIndex = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, 'posts.json'), 'utf-8')).posts || [];
  // Sort by episode number ascending
  postsIndex.sort((a, b) => (a.episodeNumber || 0) - (b.episodeNumber || 0));

  console.log(`Generating Substack drafts for ${postsIndex.length} posts\n`);

  let done = 0;
  let failed = 0;
  for (let i = 0; i < postsIndex.length; i++) {
    const meta = postsIndex[i];
    const postFile = path.join(BLOG_DIR, `${meta.slug}.json`);
    if (!fs.existsSync(postFile)) {
      console.log(`  ⚠️  Missing post JSON: ${meta.slug}`);
      continue;
    }
    const post = JSON.parse(fs.readFileSync(postFile, 'utf-8'));

    try {
      console.log(`[${i + 1}/${postsIndex.length}] Ep ${post.episodeNumber}: ${post.title.slice(0, 60)}…`);
      const copy = await generateSubstackCopy(post);
      const html = buildHtml(post, copy);
      fs.writeFileSync(path.join(OUTPUT_DIR, `${post.slug}.html`), html);
      done++;
      console.log(`  ✅`);
    } catch (e) {
      failed++;
      console.error(`  ❌ ${e.message}`);
    }

    if (i < postsIndex.length - 1) await sleep(DELAY_MS);
  }

  // Index
  const indexData = postsIndex.map((p) => ({
    episodeNumber: p.episodeNumber,
    title: p.title,
    slug: p.slug,
    file: `${p.slug}.html`,
  }));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(indexData, null, 2));

  console.log(`\n🎉 Done. Generated ${done} drafts. Failed: ${failed}. Total in index: ${indexData.length}`);
}

main();
