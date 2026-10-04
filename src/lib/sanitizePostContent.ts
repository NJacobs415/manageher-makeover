// Strips a CDATA wrapper from LLM-generated post fields before rendering.
//
// The n8n Auto Blog Publisher asks the model for HTML inside an XML-ish
// envelope, and the model sometimes keeps the `<![CDATA[ … ]]>` wrapper in
// the value it returns. Injected via dangerouslySetInnerHTML, the browser
// parses the opener as a bogus comment that swallows the first `<p>` tag —
// so the first paragraph renders as unstyled text in the wrong color — and
// the trailing `]]>` shows up as literal text at the end of the post.
//
// Only a wrapper at the very start/end is removed; CDATA anywhere else is
// left alone since it isn't this failure mode.
const CDATA_OPEN = "<![CDATA[";
const CDATA_CLOSE = "]]>";

export function sanitizePostContent(value: string): string {
  let out = value.trim();
  if (out.startsWith(CDATA_OPEN)) out = out.slice(CDATA_OPEN.length);
  if (out.endsWith(CDATA_CLOSE)) out = out.slice(0, -CDATA_CLOSE.length);
  return out.trim();
}
