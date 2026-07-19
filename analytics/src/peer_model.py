from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw" / "understat"
PROCESSED_DIR = ROOT / "data" / "processed"
MESSI_ID = 2097
MIN_MINUTES = 900

METRICS = {
    "npg90": "Non-penalty goals / 90",
    "npxg90": "Non-penalty xG / 90",
    "xa90": "Expected assists / 90",
    "shots90": "Shots / 90",
    "key_passes90": "Key passes / 90",
    "xgchain90": "xGChain / 90",
    "xgbuildup90": "xGBuildup / 90",
    "npg_minus_npxg90": "Non-penalty goals above xG / 90",
}


def season_from_path(path: Path) -> str:
    suffix = path.stem.removeprefix("la_liga_")
    start = int("20" + suffix[:2])
    return f"{start}/{str(start + 1)[-2:]}"


def load_raw() -> pd.DataFrame:
    frames = []
    for path in sorted(RAW_DIR.glob("la_liga_*.csv")):
        frame = pd.read_csv(path)
        frame["season"] = season_from_path(path)
        frame["source_file"] = path.name
        frames.append(frame)
    if not frames:
        raise FileNotFoundError(f"No Understat CSV files found in {RAW_DIR}")
    return pd.concat(frames, ignore_index=True)


def add_per90(frame: pd.DataFrame) -> pd.DataFrame:
    result = frame.copy()
    factor = 90 / result["time"]
    result["npg90"] = result["npg"] * factor
    result["npxg90"] = result["npxG"] * factor
    result["xa90"] = result["xA"] * factor
    result["shots90"] = result["shots"] * factor
    result["key_passes90"] = result["key_passes"] * factor
    result["xgchain90"] = result["xGChain"] * factor
    result["xgbuildup90"] = result["xGBuildup"] * factor
    result["npg_minus_npxg90"] = (result["npg"] - result["npxG"]) * factor
    return result


def qualified_forwards(
    frame: pd.DataFrame,
    min_minutes: int = MIN_MINUTES,
    position_pattern: str = "F",
) -> pd.DataFrame:
    positions = frame["position"].fillna("")
    return frame[(frame["time"] >= min_minutes) & positions.str.contains(position_pattern)].copy()


def robust_z(value: float, values: pd.Series) -> float:
    median = float(values.median())
    mad = float((values - median).abs().median())
    return float("nan") if mad == 0 else 0.67448975 * (value - median) / mad


def build_peer_distance(
    cohort: pd.DataFrame,
    min_minutes: int = MIN_MINUTES,
    cohort_label: str = "La Liga forwards",
) -> pd.DataFrame:
    rows = []
    for season, season_frame in cohort.groupby("season", sort=True):
        messi_rows = season_frame[season_frame["id"] == MESSI_ID]
        if len(messi_rows) != 1:
            raise ValueError(f"Expected one Messi row in {season}; found {len(messi_rows)}")
        messi = messi_rows.iloc[0]
        for metric, label in METRICS.items():
            values = season_frame[metric].astype(float)
            value = float(messi[metric])
            mean = float(values.mean())
            std = float(values.std(ddof=1))
            rows.append(
                {
                    "season": season,
                    "metric": metric,
                    "metric_label": label,
                    "messi_value": value,
                    "peer_mean": mean,
                    "peer_std": std,
                    "z_score": (value - mean) / std,
                    "peer_median": float(values.median()),
                    "robust_z": robust_z(value, values),
                    "percentile": float(values.rank(pct=True, method="average").loc[messi.name] * 100),
                    "rank": int(values.rank(ascending=False, method="min").loc[messi.name]),
                    "cohort_size": int(len(values)),
                    "min_minutes": min_minutes,
                    "cohort": cohort_label,
                }
            )
    return pd.DataFrame(rows).sort_values(["season", "metric"]).reset_index(drop=True)


def data_quality(raw: pd.DataFrame, cohort: pd.DataFrame) -> dict:
    by_season = []
    for season, frame in raw.groupby("season", sort=True):
        cohort_frame = cohort[cohort["season"] == season]
        by_season.append(
            {
                "season": season,
                "raw_rows": int(len(frame)),
                "qualified_forward_rows": int(len(cohort_frame)),
                "missing_cells": int(frame.isna().sum().sum()),
                "duplicate_player_ids": int(frame["id"].duplicated().sum()),
                "messi_rows": int((frame["id"] == MESSI_ID).sum()),
            }
        )
    return {
        "raw_rows": int(len(raw)),
        "seasons": int(raw["season"].nunique()),
        "missing_cells": int(raw.isna().sum().sum()),
        "duplicate_player_seasons": int(raw.duplicated(["season", "id"]).sum()),
        "nonpositive_minutes": int((raw["time"] <= 0).sum()),
        "by_season": by_season,
    }


def highlights(results: pd.DataFrame) -> dict:
    peak = results.loc[results.groupby("metric")["z_score"].idxmax()]
    return {
        "first_place_cells": int((results["rank"] == 1).sum()),
        "total_metric_seasons": int(len(results)),
        "cells_above_two_sd": int((results["z_score"] >= 2).sum()),
        "cells_above_three_sd": int((results["z_score"] >= 3).sum()),
        "peak_by_metric": peak[
            ["metric", "metric_label", "season", "messi_value", "z_score", "robust_z", "percentile", "rank", "cohort_size"]
        ].round(4).to_dict("records"),
    }


def build_sensitivity(enriched: pd.DataFrame) -> pd.DataFrame:
    scenarios = [
        ("forwards", "F", 600),
        ("forwards", "F", 900),
        ("forwards", "F", 1350),
        ("forwards_or_midfielders", "F|M", 600),
        ("forwards_or_midfielders", "F|M", 900),
        ("forwards_or_midfielders", "F|M", 1350),
    ]
    frames = []
    for label, pattern, threshold in scenarios:
        cohort = qualified_forwards(enriched, threshold, pattern)
        result = build_peer_distance(cohort, threshold, label)
        frames.append(result)
    return pd.concat(frames, ignore_index=True)


def dashboard_payload(results: pd.DataFrame, sensitivity: pd.DataFrame) -> dict:
    bounds = (
        sensitivity.groupby(["season", "metric"])["z_score"]
        .agg(sensitivity_min_z="min", sensitivity_max_z="max")
        .reset_index()
    )
    display = results.merge(bounds, on=["season", "metric"], how="left").copy()
    numeric = [
        "messi_value", "peer_mean", "peer_std", "z_score", "robust_z",
        "percentile", "sensitivity_min_z", "sensitivity_max_z",
    ]
    display[numeric] = display[numeric].round(3)
    return {
        "method": {
            "provider": "Understat",
            "competition": "La Liga",
            "seasons": "2014/15–2020/21",
            "cohort": "Forwards with at least 900 minutes",
            "metrics": len(METRICS),
        },
        "metric_labels": METRICS,
        "rows": display[
            [
                "season", "metric", "metric_label", "messi_value", "peer_mean",
                "peer_std", "z_score", "robust_z", "percentile", "rank",
                "cohort_size", "sensitivity_min_z", "sensitivity_max_z",
            ]
        ].to_dict("records"),
    }


def main() -> None:
    raw = load_raw()
    enriched = add_per90(raw)
    cohort = qualified_forwards(enriched)
    results = build_peer_distance(cohort)
    sensitivity = build_sensitivity(enriched)
    quality = data_quality(raw, cohort)
    summary = highlights(results)
    dashboard = dashboard_payload(results, sensitivity)

    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    results.round(6).to_csv(PROCESSED_DIR / "messi_peer_distance.csv", index=False)
    sensitivity.round(6).to_csv(PROCESSED_DIR / "sensitivity.csv", index=False)
    (PROCESSED_DIR / "data_quality.json").write_text(json.dumps(quality, indent=2) + "\n")
    (PROCESSED_DIR / "highlights.json").write_text(json.dumps(summary, indent=2) + "\n")
    (PROCESSED_DIR / "dashboard.json").write_text(json.dumps(dashboard, indent=2) + "\n")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
