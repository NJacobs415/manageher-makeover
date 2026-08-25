// Defensive normalization for the per-post payload in public/blog/<slug>.json.
//
// The n8n Auto Blog Publisher (workflow At5iovQ74qk4ki5B) has shipped posts
// where `quiz` is a JSON-encoded *string* rather than an object. React then
// renders EpisodeQuiz against a string, the component throws while reading
// `quiz.questions`, and RouteErrorBoundary replaces the whole episode page
// with "This page didn't load" — one bad field takes down the entire post.
//
// Rather than trust the payload, we recover what we can and drop what we
// can't: a stringified field is parsed, and anything that doesn't match the
// shape its component requires is set to undefined. Both `quiz` and
// `guestQuiz` already render behind `post.quiz && …` guards in BlogPost, so
// undefined simply omits that section and the rest of the post still loads.

// A quiz is only usable if EpisodeQuiz can iterate its questions.
const isUsableQuiz = (v: unknown): boolean =>
  !!v && typeof v === "object" && Array.isArray((v as { questions?: unknown }).questions)
  && (v as { questions: unknown[] }).questions.length > 0;

// A guest quiz is only usable if there's somewhere for the button to go.
const isUsableGuestQuiz = (v: unknown): boolean => {
  if (!v || typeof v !== "object") return false;
  const url = (v as { url?: unknown }).url;
  return typeof url === "string" && url.length > 0;
};

// Parse if double-encoded, then validate. Returns undefined for anything
// malformed so the caller can drop the field entirely.
function coerce(value: unknown, isUsable: (v: unknown) => boolean): unknown {
  if (value == null) return undefined;
  let candidate = value;
  if (typeof candidate === "string") {
    try {
      candidate = JSON.parse(candidate);
    } catch {
      return undefined;
    }
  }
  return isUsable(candidate) ? candidate : undefined;
}

// Returns a copy of the fetched post with `quiz` / `guestQuiz` guaranteed to
// be either a usable object or absent. All other fields pass through as-is.
export function normalizeBlogPost<T extends Record<string, unknown>>(data: T): T {
  const quiz = coerce(data.quiz, isUsableQuiz);
  const guestQuiz = coerce(data.guestQuiz, isUsableGuestQuiz);

  const normalized: Record<string, unknown> = { ...data };
  if (quiz === undefined) delete normalized.quiz;
  else normalized.quiz = quiz;
  if (guestQuiz === undefined) delete normalized.guestQuiz;
  else normalized.guestQuiz = guestQuiz;

  return normalized as T;
}
