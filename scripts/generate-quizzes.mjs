import fs from 'fs';
import path from 'path';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const BLOG_DIR = path.join(process.cwd(), 'public/blog');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function generateQuiz(post) {
  const contentPlain = stripHtml(post.content).substring(0, 2000);
  const takeawaysList = (post.keyTakeaways || []).map(t => `- ${t}`).join('\n');

  const prompt = `You are creating a self-discovery quiz for The Manage Her® Podcast — a women's leadership podcast. This quiz should help listeners learn something meaningful about THEMSELVES based on the themes of this episode. This is NOT a knowledge test — it's a personality/self-awareness assessment like a magazine quiz.

EPISODE: ${post.title}
EPISODE NUMBER: ${post.episodeNumber}
GUEST: ${post.guestName || 'Aimee Rickabus (solo episode)'}
KEY TAKEAWAYS:
${takeawaysList}
TOPICS: ${(post.topics || []).join(', ')}
CONTENT SUMMARY: ${contentPlain}

Generate a JSON quiz with EXACTLY this structure (no markdown, no backticks, just raw JSON):
{
  "title": "A compelling quiz title that feels personal and inviting, related to the episode theme (e.g., 'What\\'s Your Leadership Superpower?' or 'What\\'s Your Money Mindset?')",
  "description": "1-2 sentence invitation to take the quiz, referencing the episode theme",
  "types": {
    "A": {"name": "A short memorable archetype name (2-4 words)", "description": "3-4 sentence personalized result that validates the reader, connects to episode themes, and encourages growth. Write in second person (you/your). End with why they should listen to this episode."},
    "B": {"name": "archetype name", "description": "..."},
    "C": {"name": "archetype name", "description": "..."},
    "D": {"name": "archetype name", "description": "..."}
  },
  "questions": [
    {
      "question": "A relatable scenario or self-reflection question written in second person",
      "options": [
        {"text": "Option text — a realistic behavior or belief (not obviously good or bad)", "type": "A"},
        {"text": "Option text", "type": "B"},
        {"text": "Option text", "type": "C"},
        {"text": "Option text", "type": "D"}
      ]
    }
  ]
}

RULES:
- Generate exactly 6 questions
- Each question should have exactly 4 options (one for each type A/B/C/D)
- Questions should feel like a conversation, not a test
- Options should all feel valid — no obviously 'right' or 'wrong' answers
- Archetype names should be empowering (The Visionary, The Steady Builder, etc.)
- Results should make every type feel seen and valued
- Tie the results back to WHY this specific episode would help them
- Make it feel like a Cosmo/Enneagram quiz, not a school exam

IMPORTANT: Return ONLY valid JSON.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  const text = data.content[0].text;
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const raw = JSON.parse(clean);

  // Convert the types/questions format to the quiz format the component expects
  const quiz = {
    title: raw.title,
    description: raw.description,
    questions: raw.questions,
    results: Object.entries(raw.types).map(([type, info]) => ({
      type,
      title: info.name,
      description: info.description
    }))
  };

  return quiz;
}

async function main() {
  if (!ANTHROPIC_API_KEY) {
    console.error('Set ANTHROPIC_API_KEY env var');
    process.exit(1);
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  const posts = files.map(f => ({
    file: f,
    data: JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8'))
  }));

  const needQuiz = posts.filter(p => !p.data.quiz);
  console.log(`Found ${posts.length} posts, ${needQuiz.length} need quizzes\n`);

  let generated = 0;
  for (let i = 0; i < needQuiz.length; i++) {
    const { file, data } = needQuiz[i];
    console.log(`[${i + 1}/${needQuiz.length}] Ep ${data.episodeNumber}: ${data.title.substring(0, 60)}...`);

    try {
      const quiz = await generateQuiz(data);
      data.quiz = quiz;
      fs.writeFileSync(path.join(BLOG_DIR, file), JSON.stringify(data, null, 2));
      generated++;
      console.log(`  ✅ "${quiz.title}"`);

      if (i < needQuiz.length - 1) await sleep(3000);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
  }

  // Rebuild posts.json
  console.log('\n📝 Rebuilding posts.json...');
  const allFiles = fs.readdirSync(BLOG_DIR).filter(f => f !== 'posts.json' && f.endsWith('.json'));
  const allPosts = allFiles.map(f => {
    const p = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8'));
    return {
      slug: p.slug, title: p.title, episodeNumber: p.episodeNumber,
      guestName: p.guestName, publishedAt: p.publishedAt, duration: p.duration,
      thumbnail: p.thumbnail, excerpt: p.excerpt, topics: p.topics, youtubeUrl: p.youtubeUrl
    };
  }).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  fs.writeFileSync(path.join(BLOG_DIR, 'posts.json'), JSON.stringify({ posts: allPosts }, null, 2));

  console.log(`\n🎉 Done! Generated ${generated} quizzes. ${allPosts.length} posts in index.`);
}

main().catch(console.error);
