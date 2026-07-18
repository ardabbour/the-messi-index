# The Messi Index

An interactive, evidence-backed football almanac about the statistical distances Lionel Messi put between himself and everyone else.

Edition 003 contains 40 statistical plates, a filterable record ledger and an interactive scoring-pace translator.

The site favors directly labeled comparisons, transparent arithmetic and links to primary or governing-body sources. Moving totals—especially 2026 World Cup figures—carry explicit audit dates.

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

The development site runs at `http://localhost:3000` by default.

## Verify

```bash
npm test
npm run lint
npm run audit:sources
```

`npm test` creates the production build, checks the server-rendered page for the finished product copy and source labels, and reconciles the arithmetic behind the headline comparisons. `npm run audit:sources` performs a live reachability check for every linked statistical source.

## Counting policy

- Club totals mean official competitive matches unless a plate says otherwise.
- Calendar-year totals combine official senior club and national-team matches.
- Derived values are labeled as arithmetic rather than independent records.
- Assist totals retain the definition used by the linked provider because historical assist conventions vary.
- Cross-era comparisons are context, not claims that competitions and schedules were equivalent.

## Main source families

- FIFA for World Cup, international and major-honour records
- UEFA for European club competition and league-era comparisons
- FC Barcelona for the club archive and season-by-season records
- Major League Soccer for the 2024–25 Inter Miami seasons
- Guinness World Records for the recognized 91-goal calendar year

Every statistical plate links to its specific source.

The claim-by-claim audit trail lives in [`docs/source-ledger.md`](docs/source-ledger.md).
Future editions are queued in [`docs/research-backlog.md`](docs/research-backlog.md), including the post-final 2026 World Cup refresh.

## Project shape

- `app/page.tsx` contains the almanac content and interactions.
- `app/globals.css` contains the responsive archival design system.
- `data/edition.json` keeps the published volume, issue, date and plate count synchronized.
- `data/live-world-cup-2026.json` is the dated source of truth for the tournament snapshot; its status also controls live/final interface wording.
- `tests/rendered-html.test.mjs` verifies the production-rendered product.
- `tests/statistical-arithmetic.test.mjs` verifies derived totals, rates and gaps.
- `tests/editorial-integrity.test.mjs` keeps plate counts, source rows and live cutoffs synchronized.
- `scripts/audit-sources.mjs` checks every citation URL before a live-data update ships.
- `.openai/hosting.json` contains the Sites project binding.
