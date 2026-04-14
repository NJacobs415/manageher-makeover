import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const OUTPUT_DIR = path.join(process.cwd(), 'public/substack-drafts');
const SITE_URL = 'https://themanageher.com';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const postsFile = path.join(BLOG_DIR, 'posts.json');
const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8')).posts || [];

let generated = 0;

for (const postMeta of posts) {
  const postFile = path.join(BLOG_DIR, `${postMeta.slug}.json`);
  if (!fs.existsSync(postFile)) continue;

  const post = JSON.parse(fs.readFileSync(postFile, 'utf-8'));
  const outputFile = path.join(OUTPUT_DIR, `${post.slug}.html`);

  if (fs.existsSync(outputFile)) {
    console.log(`⏭️  Already exists: Ep ${post.episodeNumber}`);
    continue;
  }

  const guestLine = post.guestName ? `with ${post.guestName}` : '';
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const videoId = post.youtubeUrl?.split('v=')[1] || '';

  let guestLinksHtml = '';
  if (post.guestLinks?.length > 0) {
    guestLinksHtml = '<p><strong>Connect with ' + (post.guestName || 'the guest') + ':</strong></p><ul>' +
      post.guestLinks.map(l => `<li><a href="${l.url}">${l.label}</a></li>`).join('\n') +
      '</ul>';
  }

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${post.title}</title></head>
<body>

<!-- SUBSTACK TITLE: ${post.title} -->
<!-- SUBSTACK SUBTITLE: Episode ${post.episodeNumber} | The Manage Her® Podcast ${guestLine} -->

<p><em>Episode ${post.episodeNumber} | ${date} | ${post.duration}</em></p>

<p><strong>${post.excerpt}</strong></p>

<hr>

<h2>🎬 Watch This Episode</h2>

<p><a href="${post.youtubeUrl}">▶️ Watch on YouTube</a> | <a href="${post.spotifyUrl}">🎧 Listen on Spotify</a> | <a href="${post.appleUrl}">🍎 Apple Podcasts</a></p>

${videoId ? `<div class="youtube-embed"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>` : ''}

<hr>

<h2>🔑 Key Takeaways</h2>

<ol>
${post.keyTakeaways?.map(t => `<li>${t}</li>`).join('\n') || ''}
</ol>

<hr>

${post.pullQuotes?.[0] ? `<blockquote><p><em>"${post.pullQuotes[0].text}"</em></p></blockquote>` : ''}

${post.content || ''}

${post.pullQuotes?.slice(1).map(q => `<blockquote><p><em>"${q.text}"</em></p></blockquote>`).join('\n') || ''}

<hr>

${post.guestBio ? `<h2>About ${post.guestName || 'The Guest'}</h2><p>${post.guestBio}</p>${guestLinksHtml}` : ''}

<hr>

<h2>📚 Go Deeper</h2>

<ul>
<li>📖 <a href="https://a.co/d/by5X0fV">Get the book: The Manage Her®</a></li>
<li>🎙️ <a href="https://podcasts.apple.com/us/podcast/the-manage-her/id1809208475">Subscribe on Apple Podcasts</a></li>
<li>💚 <a href="https://open.spotify.com/show/03FuFRyzkaWhZkk5yxFePJ">Follow on Spotify</a></li>
<li>📺 <a href="https://www.youtube.com/@TheManageHer">Subscribe on YouTube</a></li>
<li>📸 <a href="https://www.instagram.com/themanageher/">Follow on Instagram</a></li>
</ul>

<hr>

<p><em>This article was originally published at <a href="${SITE_URL}/blog/${post.slug}">${SITE_URL}/blog/${post.slug}</a></em></p>

<p><em>© 2026 The Manage Her® | Dream Life Media, LLC | <a href="${SITE_URL}">themanageher.com</a></em></p>

</body>
</html>`;

  fs.writeFileSync(outputFile, html);
  generated++;
  console.log(`✅ Generated: Ep ${post.episodeNumber} — ${post.title}`);
}

const index = posts.map(p => ({
  episodeNumber: p.episodeNumber,
  title: p.title,
  slug: p.slug,
  file: `${p.slug}.html`
}));
fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(index, null, 2));

console.log(`\n🎉 Done! Generated ${generated} new Substack drafts. Total: ${index.length} in index.`);
