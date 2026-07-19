"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Row = {
  season: string;
  metric: string;
  metric_label: string;
  messi_value: number;
  peer_mean: number;
  peer_std: number;
  z_score: number;
  robust_z: number;
  percentile: number;
  rank: number;
  cohort_size: number;
  sensitivity_min_z: number;
  sensitivity_max_z: number;
};

type Dashboard = {
  method: Record<string, string | number>;
  metric_labels: Record<string, string>;
  rows: Row[];
};

const metricOrder = ["npg90", "npxg90", "xa90", "shots90", "key_passes90", "xgchain90", "xgbuildup90", "npg_minus_npxg90"];
const shortLabels: Record<string, string> = {
  npg90: "NPG",
  npxg90: "npxG",
  xa90: "xA",
  shots90: "Shots",
  key_passes90: "Key passes",
  xgchain90: "xGChain",
  xgbuildup90: "xGBuildup",
  npg_minus_npxg90: "Finishing",
};

function fmt(value: number) {
  return value.toFixed(2);
}

function heatClass(z: number) {
  if (z >= 4) return "heat heat-4";
  if (z >= 3) return "heat heat-3";
  if (z >= 2) return "heat heat-2";
  if (z >= 1) return "heat heat-1";
  return "heat heat-0";
}

export default function PeerModel({ data }: { data: Dashboard }) {
  const [metric, setMetric] = useState("xa90");
  const selected = useMemo(
    () => data.rows.filter((row) => row.metric === metric).sort((a, b) => a.season.localeCompare(b.season)),
    [data.rows, metric],
  );
  const seasons = [...new Set(data.rows.map((row) => row.season))].sort();
  const byKey = new Map(data.rows.map((row) => [`${row.metric}:${row.season}`, row]));
  const peak = selected.reduce((best, row) => (row.z_score > best.z_score ? row : best), selected[0]);
  const twoPlus = data.rows.filter((row) => row.z_score >= 2).length;
  const threePlus = data.rows.filter((row) => row.z_score >= 3).length;
  const firsts = data.rows.filter((row) => row.rank === 1).length;

  return (
    <main className="peer-page">
      <header className="peer-nav">
        <Link href="/" className="peer-wordmark">The Messi Index</Link>
        <span>Research build 01</span>
        <a href="#method">Method ↓</a>
      </header>

      <section className="peer-hero">
        <p className="peer-eyebrow">A peer-normalized audit · La Liga 2014/15–2020/21</p>
        <h1>How far<br />from <em>normal?</em></h1>
        <div className="peer-hero-foot">
          <p>Every dot is Messi measured against qualified forwards in the same league and season. Zero is the peer mean. One line is one standard deviation.</p>
          <div><b>+5.28</b><span>Peak standard deviations<br />Expected assists, 2019/20</span></div>
        </div>
      </section>

      <section className="peer-totals" aria-label="Analysis summary">
        <div><strong>{twoPlus}<small>/56</small></strong><span>Metric-seasons<br />at least +2 SD</span></div>
        <div><strong>{threePlus}<small>/56</small></strong><span>Metric-seasons<br />at least +3 SD</span></div>
        <div><strong>{firsts}</strong><span>First-place cells<br />in the primary cohort</span></div>
        <p>Not a highlights reel. A repeated distance from the same-season population, across scoring, creation, shooting and possession-chain involvement.</p>
      </section>

      <section className="peer-explorer">
        <div className="peer-section-head">
          <div><span>01</span><p>Metric explorer</p></div>
          <h2>{data.metric_labels[metric]}</h2>
        </div>
        <div className="metric-tabs" role="group" aria-label="Choose metric">
          {metricOrder.map((key) => (
            <button key={key} className={metric === key ? "active" : ""} onClick={() => setMetric(key)} aria-pressed={metric === key}>
              {shortLabels[key]}
            </button>
          ))}
        </div>
        <div className="z-chart">
          <div className="z-axis" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5, 6].map((tick) => <span key={tick} style={{ left: `${(tick / 6) * 100}%` }}>{tick === 0 ? "Mean" : `+${tick}σ`}</span>)}
          </div>
          {selected.map((row) => (
            <div className="z-row" key={row.season}>
              <b>{row.season}</b>
              <div className="z-plot">
                <i className="sensitivity" style={{ left: `${(row.sensitivity_min_z / 6) * 100}%`, width: `${((row.sensitivity_max_z - row.sensitivity_min_z) / 6) * 100}%` }} />
                <i className="z-bar" style={{ width: `${(row.z_score / 6) * 100}%` }} />
                <i className="z-dot" style={{ left: `${(row.z_score / 6) * 100}%` }} />
              </div>
              <strong>+{fmt(row.z_score)}σ</strong>
              <small>Rank {row.rank}/{row.cohort_size}</small>
            </div>
          ))}
        </div>
        <div className="selected-readout">
          <p><span>Peak</span><b>{peak.season}</b></p>
          <p><span>Messi</span><b>{fmt(peak.messi_value)} /90</b></p>
          <p><span>Peer mean</span><b>{fmt(peak.peer_mean)} /90</b></p>
          <p><span>Distance</span><b>+{fmt(peak.z_score)} SD</b></p>
          <p><span>Robust check</span><b>+{fmt(peak.robust_z)} MAD-z</b></p>
        </div>
        <p className="chart-note"><span /> Thin interval = the z-score range across six alternate cohort definitions. The conclusion survives; the exact decimal is not sacred.</p>
      </section>

      <section className="peer-matrix">
        <div className="peer-section-head inverse">
          <div><span>02</span><p>The whole surface</p></div>
          <h2>Seven seasons. Eight tests.</h2>
        </div>
        <div className="matrix-scroll">
          <div className="matrix-grid" style={{ gridTemplateColumns: `minmax(150px, 1.5fr) repeat(${seasons.length}, minmax(80px, 1fr))` }}>
            <span className="matrix-corner">Standard deviations</span>
            {seasons.map((season) => <b className="matrix-season" key={season}>{season}</b>)}
            {metricOrder.flatMap((key) => [
              <button className="matrix-label" key={`${key}-label`} onClick={() => { setMetric(key); document.querySelector(".peer-explorer")?.scrollIntoView(); }}>{shortLabels[key]} ↗</button>,
              ...seasons.map((season) => {
                const row = byKey.get(`${key}:${season}`)!;
                return <span className={heatClass(row.z_score)} key={`${key}-${season}`} title={`${row.metric_label}, ${season}: +${fmt(row.z_score)} SD, rank ${row.rank}/${row.cohort_size}`}>+{fmt(row.z_score)}</span>;
              }),
            ])}
          </div>
        </div>
        <div className="heat-legend"><span>Under +1</span><span>+1</span><span>+2</span><span>+3</span><span>+4 SD</span></div>
      </section>

      <section className="peer-method" id="method">
        <div className="peer-section-head">
          <div><span>03</span><p>Method before myth</p></div>
          <h2>What “normal” means here.</h2>
        </div>
        <div className="method-grid">
          <article><b>Population</b><h3>Same league.<br />Same season.<br />Same broad job.</h3><p>La Liga players tagged as forwards by Understat with at least 900 league minutes. Between 91 and 110 peers qualify each season.</p></article>
          <article><b>Normalization</b><h3>Per 90,<br />then distance<br />from the mean.</h3><p>Each rate becomes a season-level z-score. Percentile and median/MAD robust z are retained so skewed football distributions cannot hide behind one statistic.</p></article>
          <article><b>Stress test</b><h3>Six cohorts.<br />No single<br />magic cutoff.</h3><p>We rerun every cell at 600, 900 and 1,350 minutes for forwards alone and forwards plus midfielders. 44 of 56 cells stay above +2 SD in all six.</p></article>
          <article><b>Provider line</b><h3>Understat peers.<br />StatsBomb<br />actions next.</h3><p>Provider models stay separate. StatsBomb adds carries, passes and locations; its complete 2015/16 La Liga panel also permits one event-level peer study.</p></article>
        </div>
        <footer className="peer-footer">
          <p>Data: Understat player-season tables, archived by douglasbc. Reproducible scripts, raw tables and sensitivity output live in <code>analytics/</code>.</p>
          <Link href="/">Return to the published almanac ↗</Link>
        </footer>
      </section>
    </main>
  );
}
