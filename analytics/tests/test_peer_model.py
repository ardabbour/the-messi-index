import sys
import unittest
import json
from pathlib import Path

import numpy as np

ANALYTICS_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ANALYTICS_ROOT / "src"))

from peer_model import (  # noqa: E402
    METRICS,
    add_per90,
    build_sensitivity,
    build_peer_distance,
    load_raw,
    qualified_forwards,
)


class PeerModelTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.raw = load_raw()
        cls.cohort = qualified_forwards(add_per90(cls.raw))
        cls.results = build_peer_distance(cls.cohort)

    def test_raw_integrity(self):
        self.assertEqual(len(self.raw), 3817)
        self.assertEqual(self.raw["season"].nunique(), 7)
        self.assertEqual(int(self.raw.isna().sum().sum()), 0)
        self.assertEqual(int(self.raw.duplicated(["season", "id"]).sum()), 0)

    def test_messi_is_present_once_per_season(self):
        counts = self.raw[self.raw["id"] == 2097].groupby("season").size()
        self.assertEqual(counts.to_dict(), {season: 1 for season in sorted(self.raw["season"].unique())})

    def test_result_shape_and_ranges(self):
        self.assertEqual(len(self.results), 7 * len(METRICS))
        self.assertTrue(self.results["percentile"].between(0, 100).all())
        self.assertTrue((self.results["rank"] >= 1).all())
        self.assertTrue((self.results["rank"] <= self.results["cohort_size"]).all())
        self.assertTrue(np.isfinite(self.results[["z_score", "robust_z"]]).all().all())

    def test_known_2014_15_npg_rate(self):
        row = self.results.query("season == '2014/15' and metric == 'npg90'").iloc[0]
        self.assertAlmostEqual(row["messi_value"], 38 * 90 / 3374, places=10)

    def test_sensitivity_scenarios_are_complete(self):
        sensitivity = build_sensitivity(add_per90(self.raw))
        self.assertEqual(len(sensitivity), 6 * 7 * len(METRICS))
        self.assertEqual(set(sensitivity["min_minutes"]), {600, 900, 1350})
        self.assertEqual(set(sensitivity["cohort"]), {"forwards", "forwards_or_midfielders"})

    def test_statsbomb_scope_manifest_marks_the_complete_season(self):
        path = ANALYTICS_ROOT / "data" / "raw" / "statsbomb" / "messi_la_liga_match_manifest.json"
        manifest = json.loads(path.read_text())
        seasons = {row["season_name"]: row for row in manifest["seasons"]}
        self.assertEqual(len(seasons), 17)
        self.assertEqual(seasons["2015/2016"]["match_count"], 380)
        self.assertEqual(seasons["2015/2016"]["barcelona_match_count"], 38)
        self.assertTrue(all(row["match_count"] < 380 for name, row in seasons.items() if name != "2015/2016"))


if __name__ == "__main__":
    unittest.main()
