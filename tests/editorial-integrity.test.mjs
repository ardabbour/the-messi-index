import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("edition plate counts agree across product and documentation", async () => {
  const [page, readme, ledger] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("README.md", root), "utf8"),
    readFile(new URL("docs/source-ledger.md", root), "utf8"),
  ]);

  const renderedPlateCount = page.match(/className="plate-heading(?:\s|\")/g)?.length ?? 0;
  const advertisedPlateCount = Number(readme.match(/contains (\d+) statistical plates/)?.[1]);
  const ledgerPlateCount = ledger.match(/^\| (?:\d|05A)/gm)?.length ?? 0;

  assert.equal(renderedPlateCount, 34);
  assert.equal(advertisedPlateCount, renderedPlateCount);
  assert.equal(ledgerPlateCount, renderedPlateCount);
});

test("citation inventory uses unique secure URLs", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const urls = page.match(/https:\/\/[^"\s]+/g) ?? [];

  assert.equal(urls.length, 23);
  assert.equal(new Set(urls).size, urls.length);
  assert.doesNotMatch(page, /http:\/\//);
});

test("live World Cup claims retain their audit cutoff", async () => {
  const [page, ledger] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("docs/source-ledger.md", root), "utf8"),
  ]);

  assert.match(page, /15 July 2026/);
  assert.match(page, /tournament was still in progress/i);
  assert.match(ledger, /Live; dated 15 Jul 2026/);
});
