import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("edition plate counts agree across product and documentation", async () => {
  const [page, readme, ledger, editionText] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("README.md", root), "utf8"),
    readFile(new URL("docs/source-ledger.md", root), "utf8"),
    readFile(new URL("data/edition.json", root), "utf8"),
  ]);
  const edition = JSON.parse(editionText);

  const renderedPlateCount = page.match(/className="plate-heading(?:\s|\")/g)?.length ?? 0;
  const advertisedPlateCount = Number(readme.match(/contains (\d+) statistical plates/)?.[1]);
  const ledgerPlateCount = ledger.match(/^\| (?:\d|05A)/gm)?.length ?? 0;
  const ledgerAuditDate = ledger.match(/^Last audited: (.+)\.$/m)?.[1];

  assert.equal(renderedPlateCount, edition.plateCount);
  assert.equal(advertisedPlateCount, renderedPlateCount);
  assert.equal(ledgerPlateCount, renderedPlateCount);
  assert.equal(ledgerAuditDate, edition.publicationDate);
});

test("citation inventory uses unique secure URLs", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const urls = page.match(/https:\/\/[^"\s]+/g) ?? [];

  assert.equal(urls.length, 37);
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

test("live World Cup snapshot remains structurally coherent", async () => {
  const snapshotText = await readFile(new URL("data/live-world-cup-2026.json", root), "utf8");
  const snapshot = JSON.parse(snapshotText);
  const numericGroups = [snapshot.career, snapshot.tournament, snapshot.comparators];

  assert.match(snapshot.auditDate, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(["in_progress", "final"].includes(snapshot.status));
  numericGroups.forEach((group) => {
    Object.values(group).forEach((value) => {
      if (typeof value === "number") assert.ok(Number.isFinite(value) && value >= 0);
    });
  });
  assert.equal(snapshot.tournament.goals + snapshot.tournament.assists, snapshot.tournament.contributions);
  assert.ok(snapshot.career.goals > snapshot.comparators.previousGoalRecord);
  assert.ok(snapshot.career.wins > snapshot.comparators.previousWinRecord);
  assert.ok(snapshot.career.captainAppearances > snapshot.comparators.nextCaptainAppearances);
});

test("an in-progress World Cup snapshot cannot outlive its review deadline", async () => {
  const snapshotText = await readFile(new URL("data/live-world-cup-2026.json", root), "utf8");
  const snapshot = JSON.parse(snapshotText);
  const reviewDeadline = Date.parse(snapshot.reviewDeadline);

  assert.ok(Number.isFinite(reviewDeadline), "The live snapshot needs a valid reviewDeadline");
  assert.match(snapshot.reviewReason, /completed tournament statistics/i);
  if (snapshot.status === "in_progress") {
    assert.ok(
      Date.now() <= reviewDeadline,
      `The provisional World Cup snapshot expired at ${snapshot.reviewDeadline}; reconcile FIFA's completed table before publishing`,
    );
  }
});

test("visual plates and source links retain accessible, safe markup", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const imageRoles = page.match(/<[^>]+role="img"[^>]*>/g) ?? [];
  const labelledSections = [...page.matchAll(/<section[^>]+aria-labelledby="([^"]+)"/g)]
    .map((match) => match[1]);
  const ids = new Set([...page.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
  const externalAnchors = page.match(/<a [^>]*target="_blank"[^>]*>/g) ?? [];

  assert.ok(imageRoles.length >= 20);
  imageRoles.forEach((tag) => assert.match(tag, /aria-label=/));
  assert.equal(new Set(labelledSections).size, labelledSections.length);
  labelledSections.forEach((id) => assert.ok(ids.has(id), `Missing heading id: ${id}`));
  assert.ok(externalAnchors.length >= 40);
  externalAnchors.forEach((tag) => assert.match(tag, /rel="noreferrer"/));
});

test("every evidence-index destination resolves to an in-page heading", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const indexMarkup = page.match(/<nav className="evidence-index"[\s\S]*?<\/nav>/)?.[0] ?? "";
  const destinations = [...indexMarkup.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  const ids = new Set([...page.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));

  assert.equal(destinations.length, 11);
  destinations.forEach((destination) => {
    assert.ok(ids.has(destination), `Missing evidence-index destination: #${destination}`);
  });
});

test("the Argentina ledger exposes the newest international records", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const ledgerSource = page.match(/const ledger = \[[\s\S]*?\n\];/)?.[0] ?? "";

  assert.match(ledgerSource, /label: "Copa América appearances"/);
  assert.match(ledgerSource, /label: "South American qualifying goals"/);
  assert.match(ledgerSource, /value: "39"/);
  assert.match(ledgerSource, /value: "36"/);
});

test("the creation dossier contains several independently sourced records", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const ledgerSource = page.match(/const ledger = \[[\s\S]*?\n\];/)?.[0] ?? "";
  const creationEntries = ledgerSource.match(/group: "creation" as Dossier/g) ?? [];

  assert.match(page, /\{ id: "creation", label: "Creation" \}/);
  assert.equal(creationEntries.length, 4);
  assert.match(ledgerSource, /label: "official career assists reached"/);
  assert.match(ledgerSource, /label: "assists in one La Liga season"/);
  assert.match(ledgerSource, /label: "World Cup knockout assists"/);
  assert.match(ledgerSource, /label: "assists in one MLS match"/);
});

test("public discovery routes share the canonical production origin", async () => {
  const [layout, robots, sitemap, readme] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/robots.ts", root), "utf8"),
    readFile(new URL("app/sitemap.ts", root), "utf8"),
    readFile(new URL("README.md", root), "utf8"),
  ]);
  const canonical = layout.match(/metadataBase: new URL\("([^"]+)"\)/)?.[1];

  assert.equal(canonical, "https://messi-rouge.vercel.app");
  assert.match(robots, new RegExp(canonical.replaceAll(".", "\\.")));
  assert.match(sitemap, new RegExp(canonical.replaceAll(".", "\\.")));
  assert.match(readme, new RegExp(canonical.replaceAll(".", "\\.")));
});
