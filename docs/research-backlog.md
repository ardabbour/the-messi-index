# Research backlog

The index is intentionally edition-based. New plates should add a genuinely different statistical lens, retain a primary-source link and state whether the number is stable or live.

## Next live update

The 2026 FIFA World Cup final is scheduled after the current 15 July audit cutoff. Before the next publication:

1. Recheck Messi’s goals, assists, minutes, appearances, wins and Player of the Match awards on FIFA.
2. Update `data/live-world-cup-2026.json`; the page and arithmetic tests consume this single snapshot.
3. Recompute the career World Cup margins against Klose, Márquez and the assisted-editions comparison group.
4. Replace `status: "in_progress"` and the matching interface wording only when FIFA publishes final tournament statistics.
5. Run `npm test`, `npm run lint` and `npm run audit:sources`.
6. Recheck UEFA’s quickest-to-60 Champions League table; Plate 42 is current through 1 June 2026 and Haaland had not yet reached the milestone at that cutoff.

The provisional JSON expires at 12:00 UTC on 20 July. After that deadline, the editorial-integrity suite intentionally fails until the snapshot is reconciled and marked final (or a documented later review deadline is set while FIFA’s completed table remains unavailable).

### Live-source conflict protocol

FIFA's dated key-stat article listed four Messi assists at the 15 July checkpoint, while mutable statistics surfaces can later revise assist attribution. Treat the dated article and its audit cutoff as one internally consistent snapshot. For the final update, record the exact FIFA page and publication/update date, reconcile goals plus assists before editing the JSON, and never combine a goal total from one revision with an assist total from another.

Rechecked 18 July: [FIFA’s 14 July key-stat table](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/fifa-world-cup-key-statistics) lists Messi on four assists, and [FIFA’s 17 July Spain–Argentina final preview](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/duels-messi-laporte-rodri-fernandez-yamal-tagliafico) independently says four, including two against England. Search excerpts that surface “5 Assists” are rendering Michael Olise’s category-leading total beside Messi-related page text; they are not evidence of a fifth Messi assist. Keep the snapshot at four until a completed-tournament table explicitly changes the player row.

## High-value candidate plates

- **Post-final World Cup record margins:** highest priority once FIFA marks the 2026 tournament statistics final; should replace the live checkpoint rather than create a duplicate plate.
- **Youngest-to-oldest Argentina World Cup scoring span:** after the final, measure the elapsed time from Messi’s 18 years 357 days youngest-player mark to his final oldest-player mark; UEFA’s 16 July inventory currently lists 39 years 13 days, but that endpoint can still move.
- **Player-of-the-Match edition distribution:** add only if FIFA publishes a clean edition-by-edition table; the current career and 2026 totals already appear in Plate 05A.
- **Future Inter Miami season ledger:** wait for an official completed-season source so a moving total is not presented as a stable record.

Rejected as duplicative: a separate eight-FIFA-awards panel substantially overlaps the eight-Ballon-d'Or comparison in Plate 11.

## Editorial gates

- Avoid mixing official and friendly club matches.
- Do not combine assist providers without noting definition changes.
- Prefer a record margin over a bare rank when the comparison is available.
- A new plate should not repeat an existing total unless it reveals composition, pace, longevity or distance.
- Live figures require an audit date in both the interface and source ledger.
