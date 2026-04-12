import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const BULK_UPLOAD_PREFIX = '2026-03-27T22:51:';

function main() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  const posts = [];

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'));
      posts.push({ file, ...data, isAudioRSS: (data.publishedAt || '').startsWith(BULK_UPLOAD_PREFIX) });
    } catch (e) {
      console.error(`  Skipping malformed: ${file}`);
    }
  }

  console.log(`Found ${posts.length} total posts`);
  console.log(`  Audio RSS uploads (bulk ${BULK_UPLOAD_PREFIX}*): ${posts.filter(p => p.isAudioRSS).length}`);
  console.log(`  Real video episodes: ${posts.filter(p => !p.isAudioRSS).length}`);

  // Group by episodeNumber
  const byEpisode = {};
  for (const post of posts) {
    const ep = post.episodeNumber || 0;
    if (!byEpisode[ep]) byEpisode[ep] = [];
    byEpisode[ep].push(post);
  }

  const toDelete = [];

  for (const [epStr, group] of Object.entries(byEpisode)) {
    const ep = parseInt(epStr);

    if (group.length > 1) {
      // Duplicates — prefer real video over audio RSS, then longer content as tiebreaker
      const sorted = group.sort((a, b) => {
        // Real video first (not audio RSS)
        if (a.isAudioRSS !== b.isAudioRSS) return a.isAudioRSS ? 1 : -1;
        // Longer content wins
        return (b.content || '').length - (a.content || '').length;
      });

      // Keep the first (best), delete the rest
      const keep = sorted[0];
      const remove = sorted.slice(1);

      if (remove.length > 0) {
        console.log(`\n  Episode ${ep}: keeping "${keep.file}" (${keep.isAudioRSS ? 'audio' : 'video'}, ${(keep.content || '').length} chars)`);
        for (const r of remove) {
          console.log(`    Deleting "${r.file}" (${r.isAudioRSS ? 'audio' : 'video'}, ${(r.content || '').length} chars)`);
          toDelete.push(r.file);
        }
      }
    } else if (ep === 0 && group[0].isAudioRSS) {
      // Episode 0 audio RSS uploads — no real episode number, delete them
      console.log(`\n  Episode 0 audio: Deleting "${group[0].file}" (unidentified audio RSS upload)`);
      toDelete.push(group[0].file);
    }
  }

  // Delete files
  console.log(`\n🗑️  Deleting ${toDelete.length} files...`);
  for (const file of toDelete) {
    const filePath = path.join(BLOG_DIR, file);
    fs.unlinkSync(filePath);
    console.log(`  Deleted: ${file}`);
  }

  // Rebuild posts.json index
  console.log('\n📝 Rebuilding posts.json index...');
  const remaining = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  const allPosts = [];

  for (const file of remaining) {
    try {
      const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'));
      allPosts.push({
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
      });
    } catch (e) {
      console.error(`  Skipping malformed: ${file}`);
    }
  }

  allPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  fs.writeFileSync(path.join(BLOG_DIR, 'posts.json'), JSON.stringify({ posts: allPosts }, null, 2));

  console.log(`\n🎉 Done! Deleted ${toDelete.length} files. ${allPosts.length} posts remain in index.`);
}

main();
