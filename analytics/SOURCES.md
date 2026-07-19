# Source ledger

## Understat peer tables

- Original provider: [Understat](https://understat.com/)
- Archived dataset: [douglasbc/scraping-understat-dataset](https://github.com/douglasbc/scraping-understat-dataset)
- Archive scope: full player-season tables for La Liga, 2014/15–2020/21
- Retrieved: 2026-07-18
- Local files: `data/raw/understat/la_liga_*.csv`
- Fields used: player ID/name, minutes, position, non-penalty goals, npxG, xA,
  shots, key passes, xGChain and xGBuildup
- Limitation: third-party archive of Understat's model outputs; expected metrics
  are provider-specific and should not be numerically blended with StatsBomb xG.

## StatsBomb open Messi data

- Release note: [Free Messi Data: 2004/05–2020/21](https://www.hudl.com/blog/free-messi-data-2004-05-2020-21)
- Repository: [hudl/open-data](https://github.com/hudl/open-data)
- Confirmed competition: La Liga, competition ID 11, all 17 Messi Barcelona seasons
- Planned use: action-level longitudinal analysis across Messi's career, plus a
  one-season league peer study for 2015/16
- Attribution requirement: state that data is supplied by StatsBomb and display
  the StatsBomb logo on published research derived from it.
- Coverage audit: 2015/16 contains all 380 league matches and can support a true
  event-level peer panel. The other Messi-era seasons contain Barcelona subsets
  (7–38 matches), so opponents in those seasons are not representative peers.
- Local scope manifest: `data/raw/statsbomb/messi_la_liga_match_manifest.json`
