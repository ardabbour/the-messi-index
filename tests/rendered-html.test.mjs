import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const worldCup2026 = JSON.parse(
  await readFile(new URL("../data/live-world-cup-2026.json", import.meta.url), "utf8"),
);
const edition = JSON.parse(
  await readFile(new URL("../data/edition.json", import.meta.url), "utf8"),
);

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
  assert.match(html, new RegExp(`Vol\\. (?:<!-- -->)?${edition.volume}`));
  assert.match(html, new RegExp(`Issue (?:<!-- -->)?${edition.issue}`));
  assert.match(html, new RegExp(`${edition.plateCount}(?:<!-- -->)? plates, audited`));
  assert.match(html, /href="#awards-title"/);
  assert.match(html, /href="#world-xi-title"/);
  assert.match(html, /The calendar-year anomaly/);
  assert.match(html, />91</);
  assert.match(html, /The World Cup, rewritten at 39/);
  assert.match(html, /Thirty-nine\. Still setting the pace\./);
  assert.match(html, new RegExp(`>${worldCup2026.career.goals}<`));
  assert.match(html, new RegExp(`>${worldCup2026.tournament.contributions}<`));
  assert.match(html, new RegExp(String(worldCup2026.tournament.minutesPerContribution).replace(".", "\\.")));
  assert.match(html, /oldest World Cup hat-trick scorer/);
  assert.match(html, /Player of the Match awards in 2026/);
  assert.match(
    html,
    new RegExp(`${worldCup2026.career.playerOfMatchAwards}(?:<!-- -->)? across his World Cup career is also unequalled`),
  );
  assert.match(html, new RegExp(worldCup2026.auditDateLabel));
  if (worldCup2026.status === "in_progress") {
    assert.match(html, /final had not yet been played/i);
    assert.match(html, /live dossier/i);
  } else {
    assert.match(html, /completed-tournament table/i);
    assert.match(html, /final dossier/i);
  }
  assert.match(html, /The “bad” year was 45 goals/);
  assert.match(html, /Fifty in the league\. Not the season\./);
  assert.match(html, /He led both columns\. Three years running\./);
  assert.match(html, /Try to manufacture 672/);
  assert.match(html, /Age 38\. League leader in both jobs\./);
  assert.match(html, /Even the award gaps have gaps/);
  assert.match(html, /Europe was a very long contact list/);
  assert.match(html, /Anatomy of 672/);
  assert.match(html, /He nearly doubled the specialist/);
  assert.match(html, /One league\. Six different monopolies\./);
  assert.match(html, /Twenty-one straight years on the scoresheet\./);
  assert.match(html, /The knockout rounds were not a deterrent\./);
  assert.match(html, /“First” undersells the distance\./);
  assert.match(html, /Seventy-three\. In one club season\./);
  assert.match(html, /The hat-trick was the small version\./);
  assert.match(html, /Change the venue\. Same result\./);
  assert.match(html, /He cleared Pelé, then kept going\./);
  assert.match(html, /The milestones started arriving faster\./);
  assert.match(html, /Even the win column has a chasm\./);
  assert.match(html, /The biggest fixture got 26 examples\./);
  assert.match(html, /Thirty-eight, twice\./);
  assert.match(html, /His Argentina peak arrived in the World Cup year\./);
  assert.match(html, /The scorer had a second career as a provider\./);
  assert.match(html, /The penalty area was optional\./);
  assert.match(html, /The semi-final had never seen this age\./);
  assert.match(html, /Six World Cups\. No empty columns\./);
  assert.match(html, /Nine World Cup matches\. Nine scoresheets\./);
  assert.match(html, /One half\. Six goal contributions\./);
  assert.match(html, /Two MVP seasons\. Eighty-four contributions\./);
  assert.match(html, /The trophy match got thirty-one goals\./);
  assert.match(html, /Thirteen seasons\. The floor was thirty\./);
  assert.match(html, /Seventeen seasons\. Thirty-five trophies\./);
  assert.match(html, /One player\. Every World Cup stage\./);
  assert.match(html, /Seventeen World XIs\. No missing year\./);
  assert.match(html, /Before the senior era, he swept the tournament\./);
  assert.match(html, /The youth world title was only the first one\./);
  assert.match(html, /1 of 15 Olympic \+ World Cup double winners/);
  assert.match(html, /Argentina team trophies/);
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
