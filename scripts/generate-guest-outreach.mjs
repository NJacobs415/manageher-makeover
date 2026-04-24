import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const OUTPUT_DIR = path.join(process.cwd(), 'scripts/guest-outreach');
const SITE_URL = 'https://themanageher.com';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.json') && f !== 'posts.json');

const csvRows = ['Guest Name,Episode Number,Subject,Blog URL,Guest Links'];
let generated = 0;
let skipped = 0;

for (const file of files) {
  const post = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'));

  if (!post.guestName) {
    skipped++;
    continue;
  }

  const blogUrl = `${SITE_URL}/blog/${post.slug}`;
  const subject = `Your episode on The Manage Her® is live — here's your link`;
  const nameParts = post.guestName.split(' ');
  const titles = ['Dr.', 'Dr', 'Mrs.', 'Mrs', 'Ms.', 'Ms', 'Mr.', 'Mr', 'Prof.', 'Rev.'];
  const firstName = titles.includes(nameParts[0]) && nameParts.length > 1 ? nameParts[1] : nameParts[0];

  const quizLine = post.quiz?.title
    ? `\nIt also has a fun self-discovery quiz your audience might love: "${post.quiz.title}"\n`
    : '';

  const linksForCsv = (post.guestLinks || []).map(l => l.url).join(' | ');

  const email = `Subject: ${subject}

Hey ${firstName},

Your episode on The Manage Her® Podcast is now a full blog post with show notes, key takeaways, and your bio + links at:
${blogUrl}
${quizLine}
Would you mind sharing the link or adding it to your press/media page? Here's a few easy options:
- Share the blog post on social media
- Add it to your website's "As Seen On" or "Press" page
- Link to it from your own show notes if you have a podcast

Every link helps both of us show up higher in search results!

Thank you for being part of The Manage Her® community.

Aimee
`;

  const safeName = post.slug.substring(0, 80);
  fs.writeFileSync(path.join(OUTPUT_DIR, `${safeName}.txt`), email);
  generated++;

  const escapeCsv = (s) => `"${String(s).replace(/"/g, '""')}"`;
  csvRows.push([
    escapeCsv(post.guestName),
    post.episodeNumber || 0,
    escapeCsv(subject),
    escapeCsv(blogUrl),
    escapeCsv(linksForCsv),
  ].join(','));

  console.log(`✅ Ep ${post.episodeNumber}: ${post.guestName}`);
}

fs.writeFileSync(path.join(OUTPUT_DIR, 'guest-outreach.csv'), csvRows.join('\n') + '\n');

console.log(`\n🎉 Done. Generated ${generated} emails, skipped ${skipped} (no guest name).`);
console.log(`📁 Emails: ${OUTPUT_DIR}/`);
console.log(`📊 CSV: ${path.join(OUTPUT_DIR, 'guest-outreach.csv')}`);
