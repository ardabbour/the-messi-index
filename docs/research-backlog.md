# Research backlog

The index is intentionally edition-based. New plates should add a genuinely different statistical lens, retain a primary-source link and state whether the number is stable or live.

## Next live update

The 2026 FIFA World Cup final is scheduled after the current 15 July audit cutoff. Before the next publication:

1. Recheck Messi’s goals, assists, minutes, appearances, wins and Player of the Match awards on FIFA.
2. Update `data/live-world-cup-2026.json`; the page and arithmetic tests consume this single snapshot.
3. Recompute the career World Cup margins against Klose, Márquez and the assisted-editions comparison group.
4. Replace `status: "in_progress"` and the matching interface wording only when FIFA publishes final tournament statistics.
5. Run `npm test`, `npm run lint` and `npm run audit:sources`.

## High-value candidate plates

- **Post-final World Cup record margins:** highest priority once FIFA marks the 2026 tournament statistics final; should replace the live checkpoint rather than create a duplicate plate.
- **Player-of-the-Match edition distribution:** add only if FIFA publishes a clean edition-by-edition table; the current career and 2026 totals already appear in Plate 05A.
- **Future Inter Miami season ledger:** wait for an official completed-season source so a moving total is not presented as a stable record.

Rejected as duplicative: a separate eight-FIFA-awards panel substantially overlaps the eight-Ballon-d'Or comparison in Plate 11.

## Editorial gates

- Avoid mixing official and friendly club matches.
- Do not combine assist providers without noting definition changes.
- Prefer a record margin over a bare rank when the comparison is available.
- A new plate should not repeat an existing total unless it reveals composition, pace, longevity or distance.
- Live figures require an audit date in both the interface and source ledger.
