import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const urls = [...new Set(page.match(/https:\/\/[^"\s]+/g) ?? [])].sort();

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
    await response.body?.cancel();
    return { url, status: response.status, ok: response.ok };
  } catch (error) {
    return { url, status: "ERR", ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

const results = await Promise.all(urls.map(check));

for (const result of results) {
  console.log(`${result.ok ? "PASS" : "FAIL"} ${result.status} ${result.url}${result.error ? ` · ${result.error}` : ""}`);
}

const failures = results.filter((result) => !result.ok);
console.log(`\n${results.length - failures.length}/${results.length} source links reachable`);

if (failures.length > 0) {
  process.exitCode = 1;
}
