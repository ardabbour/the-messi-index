import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const urls = [...new Set(page.match(/https:\/\/[^"\s]+/g) ?? [])].sort();
const approvedHosts = [
  "copaamerica.com",
  "fcbarcelona.com",
  "fifa.com",
  "guinnessworldrecords.com",
  "mlssoccer.com",
  "uefa.com",
];
const claimFingerprints = new Map([
  [
    "https://www.fcbarcelona.com/en/football/first-team/actualites/1655195",
    ["1,482", "Iker Muniain", "567", "487", "Cristiano Ronaldo", "365"],
  ],
  [
    "https://www.uefa.com/uefachampionsleague/news/023e-0e97dfba07ee-e1db23662ae5-1000--how-messi-s-100-european-goals-were-scored/",
    ["Right foot", "Left foot", "Header", "100 goals", "122 games", "1–20", "42 games", "81–100"],
  ],
  [
    "https://www.uefa.com/uefachampionsleague/news/0257-0e9a02ecaf1e-a1d96d1587ba-1000--who-are-the-all-time-champions-league-group-stage-top-scorers/",
    ["just 86 matches", "ratio of 0.93", "40 goals / 38 games", "80 / 86", "73 / 87", "73 / 98"],
  ],
  [
    "https://inside.fifa.com/en/media-releases/messi-lloyd-luis-enrique-and-ellis-triumph-at-fifa-ballon-d-or-2015-2754944",
    ["165 national team coaches", "162 national team captains", "171 media representatives", "41.33%", "27.76%", "7.86%"],
  ],
]);

if (urls.length === 0) {
  throw new Error("No source URLs found in app/page.tsx");
}

async function check(url) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
      headers: { "user-agent": "The-Messi-Index/source-audit" },
    });
    const finalUrl = new URL(response.url);
    const approvedHost = approvedHosts.some(
      (host) => finalUrl.hostname === host || finalUrl.hostname.endsWith(`.${host}`),
    );
    const contentType = response.headers.get("content-type") ?? "";
    const htmlDocument = /^text\/html\b/i.test(contentType);
    const expectedFingerprints = claimFingerprints.get(url) ?? [];
    const document = expectedFingerprints.length > 0 && response.ok && htmlDocument
      ? await response.text()
      : "";
    const missingFingerprints = expectedFingerprints.filter((fingerprint) => !document.includes(fingerprint));
    if (expectedFingerprints.length === 0) await response.body?.cancel();
    return {
      url,
      status: response.status,
      ok: response.ok && approvedHost && htmlDocument && missingFingerprints.length === 0,
      finalHost: finalUrl.hostname,
      contentType,
      reason: !response.ok
        ? "HTTP failure"
        : !approvedHost
          ? "redirected outside the approved source owners"
          : !htmlDocument
            ? "did not return an HTML document"
            : missingFingerprints.length > 0
              ? `missing claim fingerprints: ${missingFingerprints.join(", ")}`
            : "",
    };
  } catch (error) {
    return { url, status: "ERR", ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

const results = await Promise.all(urls.map(check));

for (const result of results) {
  const detail = result.error || result.reason;
  console.log(`${result.ok ? "PASS" : "FAIL"} ${result.status} ${result.url}${detail ? ` · ${detail}` : ""}`);
}

const failures = results.filter((result) => !result.ok);
console.log(`\n${results.length - failures.length}/${results.length} source links verified`);

if (failures.length > 0) {
  process.exitCode = 1;
}
