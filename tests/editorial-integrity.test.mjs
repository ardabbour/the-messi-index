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
  const interfacePlateCount = Number(page.match(/const editionPlateCount = (\d+)/)?.[1]);
  const advertisedPlateCount = Number(readme.match(/contains (\d+) statistical plates/)?.[1]);
  const ledgerPlateCount = ledger.match(/^\| (?:\d|05A)/gm)?.length ?? 0;

  assert.equal(renderedPlateCount, 40);
  assert.equal(interfacePlateCount, renderedPlateCount);
  assert.equal(advertisedPlateCount, renderedPlateCount);
  assert.equal(ledgerPlateCount, renderedPlateCount);
});

test("citation inventory uses unique secure URLs", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const urls = page.match(/https:\/\/[^"\s]+/g) ?? [];

  assert.equal(urls.length, 29);
  assert.equal(new Set(urls).size, urls.length);
  assert.doesNotMatch(page, /http:\/\//);
});

test("live World Cup claims retain their audit cutoff", async () => {
  const [page, ledger, snapshotText] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("docs/source-ledger.md", root), "utf8"),
    readFile(new URL("data/live-world-cup-2026.json", root), "utf8"),
  ]);
  const snapshot = JSON.parse(snapshotText);

  assert.equal(snapshot.auditDate, "2026-07-15");
  assert.equal(snapshot.status, "in_progress");
  assert.match(page, /wcAuditLabel/);
  assert.match(page, /wcIsInProgress/);
  assert.match(page, /tournament was still in progress/i);
  assert.match(ledger, new RegExp(`Live; dated ${snapshot.auditDateShort}`));
});
