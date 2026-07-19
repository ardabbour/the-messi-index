# Messi peer-distance analysis

This is a clean analytical track for the next version of The Messi Index. It is
deliberately separate from the published almanac while the methodology is being
tested.

## Question

How far was Lionel Messi from a defensible group of his contemporaries, measured
in standard deviations and percentiles, on modern attacking metrics?

## Primary cohort

For each La Liga season from 2014/15 through 2020/21:

- players whose Understat position contains `F` (forward);
- at least 900 league minutes; and
- Messi is included in the distribution, so his z-score is a true distance from
  the population being described rather than a leave-one-out comparison.

The 900-minute threshold is fixed before looking at results. It reduces tiny-sample
rate explosions while retaining 91–110 forwards per season. A later sensitivity
pass will compare 600, 900, and 1,350-minute thresholds and a broader forward-or-
midfielder cohort.

## Metrics

All volume metrics are converted to per 90 minutes:

- non-penalty goals (`npg90`)
- non-penalty expected goals (`npxg90`)
- expected assists (`xa90`)
- shots (`shots90`)
- key passes (`key_passes90`)
- expected-goal chain involvement (`xgchain90`)
- expected-goal buildup involvement (`xgbuildup90`)
- non-penalty finishing above expectation (`npg_minus_npxg90`)

For every player-season/metric, the model calculates:

- arithmetic mean and sample standard deviation;
- z-score: `(value - mean) / sample SD`;
- median and MAD-based robust z-score: `0.67448975 × (value - median) / MAD`;
- percentile rank and descending rank.

Football rate distributions are skewed, so standard z-scores are not treated as
normally distributed probabilities. Percentiles are the plain-language display;
standard and robust z-scores expose how sensitive the conclusion is to outliers.
No cross-provider composite score is calculated.

## Reproduce

```bash
python3 analytics/src/peer_model.py
python3 -m unittest discover -s analytics/tests -p 'test_*.py'
```

The script regenerates `data/processed/messi_peer_distance.csv`,
`data/processed/sensitivity.csv`, `data/processed/data_quality.json`, and
`data/processed/highlights.json`.

`notebooks/messi_peer_distance.ipynb` is the inspectable notebook view of the
same tested functions. It requires pandas and a Jupyter environment.

## Provider boundary

Understat supplies the seven-season league peer layer. StatsBomb's open Messi
biography will supply a separate action-level longitudinal layer (carries, passes,
shots and locations). Its 2015/16 season is a complete 380-match La Liga panel and
can support a one-season event-level peer comparison. The other seasons are
Barcelona subsets and must not be used to create contemporaries from opponents
observed only against Barcelona.
