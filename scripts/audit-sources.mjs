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
    await response.body?.cancel();
    return {
      url,
      status: response.status,
      ok: response.ok && approvedHost && htmlDocument,
      finalHost: finalUrl.hostname,
      contentType,
      reason: !response.ok
        ? "HTTP failure"
        : !approvedHost
          ? "redirected outside the approved source owners"
          : !htmlDocument
            ? "did not return an HTML document"
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
console.log(`\n${results.length - failures.length}/${results.length} source links reachable`);

if (failures.length > 0) {
  process.exitCode = 1;
}
