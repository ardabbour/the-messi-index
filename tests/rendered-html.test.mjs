import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Messi statistical almanac", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>The Messi Index — A statistical audit of the impossible<\/title>/i);
  assert.match(html, /The record book ran out of/);
  assert.match(html, /The calendar-year anomaly/);
  assert.match(html, />91</);
  assert.match(html, /The World Cup, rewritten at 39/);
  assert.match(html, /15 July 2026/);
  assert.match(html, /Guinness record/);
  assert.match(html, /FC Barcelona/);
  assert.match(html, /UEFA/);
  assert.match(html, /FIFA/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps the finished site free of starter artifacts", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /aria-pressed=\{filter === item\.id\}/);
  assert.match(page, /live-stat warning/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(layout, /The Messi Index/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|site-creator-vinext-starter/);
  assert.doesNotMatch(`${page}\n${layout}`, /codex-preview|SkeletonPreview|_sites-preview/);
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
