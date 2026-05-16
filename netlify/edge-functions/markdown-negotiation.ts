import type { Context } from "https://edge.netlify.com";

const ROUTE_TO_MARKDOWN: Record<string, string> = {
  "/": "/cv.md",
  "/about": "/about.md",
  "/about/": "/about.md",
};

export default async (request: Request, context: Context): Promise<Response | void> => {
  const url = new URL(request.url);
  const target = ROUTE_TO_MARKDOWN[url.pathname];
  if (!target) return;

  if (request.method !== "GET" && request.method !== "HEAD") return;

  const accept = request.headers.get("accept") || "";
  if (!prefersMarkdown(accept)) return;

  const mdResponse = await fetch(new URL(target, url.origin).toString(), {
    headers: { accept: "text/markdown" },
  });
  if (!mdResponse.ok) return;

  const body = request.method === "HEAD" ? null : await mdResponse.text();

  const headers = new Headers({
    "content-type": "text/markdown; charset=utf-8",
    "vary": "Accept",
    "cache-control": "public, max-age=3600, must-revalidate",
    "x-markdown-source": target,
    "link": [
      `</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
      `</.well-known/agent-skills/index.json>; rel="https://agentskills.io/rel/index"; type="application/json"`,
      `<${url.pathname}>; rel="canonical"`,
    ].join(", "),
  });

  return new Response(body, { status: 200, headers });
};

function prefersMarkdown(accept: string): boolean {
  if (!accept) return false;
  const entries = accept
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [type, ...params] = entry.split(";").map((s) => s.trim());
      const qParam = params.find((p) => p.startsWith("q="));
      const q = qParam ? parseFloat(qParam.slice(2)) : 1;
      return { type: type.toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    });

  const md = entries.find((e) => e.type === "text/markdown" || e.type === "text/x-markdown");
  if (!md || md.q === 0) return false;

  const html = entries.find((e) => e.type === "text/html");
  const htmlQ = html ? html.q : 0;

  return md.q >= htmlQ;
}
