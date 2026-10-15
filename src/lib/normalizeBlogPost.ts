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
//
// The array fields (`timestamps`, `keyTakeaways`, `pullQuotes`, `guestLinks`)
// get the same treatment: ep 73 shipped `timestamps` as a string, which passes
// BlogPost's `?.length > 0` guard and then throws on `.map`.

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

// Timestamps are only usable if every entry has a string time and label.
const isUsableTimestamps = (v: unknown): boolean =>
  Array.isArray(v) && v.every((t) =>
    !!t && typeof t === "object"
    && typeof (t as { time?: unknown }).time === "string"
    && typeof (t as { label?: unknown }).label === "string");

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
// be either a usable object or absent, and `timestamps` / `keyTakeaways` /
// `pullQuotes` / `guestLinks` either an array or absent. All other fields
// pass through as-is.
export function normalizeBlogPost<T extends Record<string, unknown>>(data: T): T {
  const fields: [string, (v: unknown) => boolean][] = [
    ["quiz", isUsableQuiz],
    ["guestQuiz", isUsableGuestQuiz],
    ["timestamps", isUsableTimestamps],
    ["keyTakeaways", Array.isArray],
    ["pullQuotes", Array.isArray],
    ["guestLinks", Array.isArray],
  ];

  const normalized: Record<string, unknown> = { ...data };
  for (const [key, isUsable] of fields) {
    const value = coerce(data[key], isUsable);
    if (value === undefined) delete normalized[key];
    else normalized[key] = value;
  }

  return normalized as T;
}
