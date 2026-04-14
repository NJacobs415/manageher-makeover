import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const BLOG_DIR = path.join(process.cwd(), 'public/blog');
const OUT_DIR = path.join(process.cwd(), 'public/resources');

// Brand colors
const PINK = [235, 24, 135];
const GOLD = [201, 169, 110];
const DARK = [51, 51, 51];
const LIGHT_GRAY = [136, 136, 136];
const WHITE = [255, 255, 255];

const MARGIN = 72;
const PAGE_WIDTH = 612; // Letter
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function drawPinkRule(doc, y, width) {
  doc.save();
  doc.moveTo(MARGIN, y).lineTo(MARGIN + (width || CONTENT_WIDTH), y)
    .strokeColor(PINK).lineWidth(1.5).stroke();
  doc.restore();
}

function drawGoldRule(doc, y, width) {
  doc.save();
  doc.moveTo(MARGIN, y).lineTo(MARGIN + (width || CONTENT_WIDTH), y)
    .strokeColor(GOLD).lineWidth(0.75).stroke();
  doc.restore();
}

function sectionHeader(doc, text, color) {
  doc.font('Helvetica-Bold').fontSize(10)
    .fillColor(color || PINK)
    .text(text, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      characterSpacing: 3,
    });
  doc.moveDown(0.6);
}

function checkPageSpace(doc, needed) {
  if (doc.y + needed > 720) {
    doc.addPage();
    return true;
  }
  return false;
}

function main() {
  // Find Episode 56
  const files = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  let post = null;
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'));
    if (data.episodeNumber === 56) {
      post = data;
      break;
    }
  }
  if (!post) { console.error('Episode 56 not found'); process.exit(1); }

  console.log(`Generating cheat sheet for: ${post.title}`);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const doc = new PDFDocument({
    size: 'letter',
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: {
      Title: `Episode ${post.episodeNumber} Cheat Sheet — ${post.title}`,
      Author: 'The Manage Her®',
      Subject: 'Podcast Episode Cheat Sheet',
    }
  });

  const outPath = path.join(OUT_DIR, `ep-${post.episodeNumber}-cheat-sheet.pdf`);
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  // ══════════════════════════════════════════
  // PAGE 1
  // ══════════════════════════════════════════

  // Brand header
  doc.font('Helvetica-Bold').fontSize(9).fillColor(PINK)
    .text('THE MANAGE HER®', MARGIN, MARGIN, {
      width: CONTENT_WIDTH,
      align: 'center',
      characterSpacing: 4,
    });
  doc.moveDown(0.8);

  // Episode badge line
  const badgeY = doc.y;
  const badgeText = `EPISODE ${post.episodeNumber}`;
  const cheatText = ' CHEAT SHEET';

  // Draw pink rounded rect badge for episode number
  const badgeWidth = 100;
  const badgeHeight = 22;
  const badgeX = (PAGE_WIDTH - 200) / 2;
  doc.save();
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 11)
    .fill(PINK);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(WHITE)
    .text(badgeText, badgeX, badgeY + 6, { width: badgeWidth, align: 'center', characterSpacing: 1.5 });
  doc.restore();

  // "CHEAT SHEET" next to badge
  doc.font('Helvetica-Bold').fontSize(9).fillColor(DARK)
    .text(cheatText, badgeX + badgeWidth + 6, badgeY + 6, { characterSpacing: 2 });

  doc.y = badgeY + badgeHeight + 20;

  // Title
  doc.font('Helvetica-Bold').fontSize(22).fillColor(DARK)
    .text(post.title, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      align: 'center',
      lineGap: 4,
    });
  doc.moveDown(0.5);

  // Guest name
  if (post.guestName) {
    doc.font('Helvetica-Oblique').fontSize(13).fillColor(GOLD)
      .text(`with ${post.guestName}`, MARGIN, doc.y, {
        width: CONTENT_WIDTH,
        align: 'center',
      });
    doc.moveDown(0.8);
  }

  // Pink horizontal rule
  drawPinkRule(doc, doc.y);
  doc.moveDown(1.2);

  // ── KEY TAKEAWAYS ──
  sectionHeader(doc, 'KEY TAKEAWAYS');

  for (let i = 0; i < post.keyTakeaways.length; i++) {
    checkPageSpace(doc, 50);
    const numX = MARGIN;
    const textX = MARGIN + 28;
    const y = doc.y;

    // Gold number circle
    doc.save();
    doc.circle(numX + 9, y + 8, 10).fill(GOLD);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(WHITE)
      .text(String(i + 1), numX, y + 3, { width: 18, align: 'center' });
    doc.restore();

    // Takeaway text
    doc.font('Helvetica').fontSize(10.5).fillColor(DARK)
      .text(post.keyTakeaways[i], textX, y, {
        width: CONTENT_WIDTH - 28,
        lineGap: 3,
      });
    doc.moveDown(0.6);
  }

  doc.moveDown(0.5);

  // ── Pull Quote ──
  if (post.pullQuotes?.[0]) {
    checkPageSpace(doc, 80);

    const quoteY = doc.y;
    // Pink left border
    doc.save();
    doc.moveTo(MARGIN + 10, quoteY).lineTo(MARGIN + 10, quoteY + 50)
      .strokeColor(PINK).lineWidth(3).stroke();
    doc.restore();

    doc.font('Helvetica-BoldOblique').fontSize(14).fillColor(DARK)
      .text(`"${post.pullQuotes[0].text}"`, MARGIN + 22, quoteY + 4, {
        width: CONTENT_WIDTH - 32,
        lineGap: 5,
      });

    if (post.pullQuotes[0].timestamp) {
      doc.moveDown(0.3);
      doc.font('Helvetica').fontSize(8).fillColor(LIGHT_GRAY)
        .text(`— at ${post.pullQuotes[0].timestamp}`, MARGIN + 22, doc.y, {
          width: CONTENT_WIDTH - 32,
        });
    }
    doc.moveDown(1.5);
  }

  // ══════════════════════════════════════════
  // PAGE 2
  // ══════════════════════════════════════════
  doc.addPage();

  // Brand header (repeated)
  doc.font('Helvetica-Bold').fontSize(9).fillColor(PINK)
    .text('THE MANAGE HER®', MARGIN, MARGIN, {
      width: CONTENT_WIDTH,
      align: 'center',
      characterSpacing: 4,
    });
  doc.moveDown(1.2);

  // ── YOUR ACTION STEPS ──
  sectionHeader(doc, 'YOUR ACTION STEPS');

  const actionSteps = [
    'Schedule one non-negotiable hour of self-care this week — whether it\'s movement, rest, or something that fills your cup. Put it on the calendar and protect it like a meeting.',
    'If you\'re planning to conceive in the next year, start a preconception wellness plan now. Research local practitioners (chiropractor, functional medicine, naturopath) and book an initial consultation.',
    'Practice nervous system regulation daily: try 5 minutes of box breathing (4 counts in, 4 hold, 4 out, 4 hold) before your first meeting or before picking up the kids.',
    'Audit your energy: write down where you\'re operating in "push" mode vs. "flow" mode. Identify one area where you can soften your approach this week.',
  ];

  for (let i = 0; i < actionSteps.length; i++) {
    checkPageSpace(doc, 50);
    const y = doc.y;

    // Pink checkbox square
    doc.save();
    doc.roundedRect(MARGIN, y + 1, 14, 14, 2).strokeColor(PINK).lineWidth(1.5).stroke();
    doc.restore();

    doc.font('Helvetica').fontSize(10.5).fillColor(DARK)
      .text(actionSteps[i], MARGIN + 24, y, {
        width: CONTENT_WIDTH - 24,
        lineGap: 3,
      });
    doc.moveDown(0.7);
  }

  doc.moveDown(0.8);
  drawGoldRule(doc, doc.y, CONTENT_WIDTH);
  doc.moveDown(1.2);

  // ── REFLECT ON THIS ──
  sectionHeader(doc, 'REFLECT ON THIS', GOLD);

  const reflections = [
    'Where in your life are you treating self-care as optional rather than mandatory? What would change if you committed to it as non-negotiable?',
    'Are you leading your home and family from intuition or from fear? What would it look like to trust your inner knowing more?',
    'What permission have you been waiting for someone else to give you — to pivot, to slow down, to prioritize differently? Can you give it to yourself today?',
  ];

  for (let i = 0; i < reflections.length; i++) {
    checkPageSpace(doc, 60);
    const y = doc.y;

    // Gold number
    doc.font('Helvetica-Bold').fontSize(11).fillColor(GOLD)
      .text(`${i + 1}.`, MARGIN, y);

    doc.font('Helvetica-Oblique').fontSize(10.5).fillColor(DARK)
      .text(reflections[i], MARGIN + 24, y, {
        width: CONTENT_WIDTH - 24,
        lineGap: 3,
      });
    doc.moveDown(0.9);
  }

  // ── Listen CTA ──
  doc.moveDown(1);
  checkPageSpace(doc, 80);
  drawPinkRule(doc, doc.y);
  doc.moveDown(1);

  doc.font('Helvetica-Bold').fontSize(10).fillColor(PINK)
    .text('LISTEN TO THE FULL EPISODE', MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      align: 'center',
      characterSpacing: 2,
    });
  doc.moveDown(0.4);

  doc.font('Helvetica').fontSize(10).fillColor(DARK)
    .text(`themanageher.com/blog/${post.slug}`, MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      align: 'center',
      link: `https://themanageher.com/blog/${post.slug}`,
      underline: true,
    });

  doc.moveDown(0.5);

  doc.font('Helvetica').fontSize(9).fillColor(LIGHT_GRAY)
    .text('Available on YouTube, Apple Podcasts, Spotify & Amazon Music', MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      align: 'center',
    });

  // ── Footer ──
  doc.font('Helvetica').fontSize(7.5).fillColor(LIGHT_GRAY)
    .text(
      '© 2026 The Manage Her® | Dream Life Media, LLC | themanageher.com',
      MARGIN,
      740,
      { width: CONTENT_WIDTH, align: 'center' }
    );

  doc.end();

  stream.on('finish', () => {
    const size = fs.statSync(outPath).size;
    console.log(`✅ Saved: ${outPath} (${(size / 1024).toFixed(1)} KB)`);
  });
}

main();
