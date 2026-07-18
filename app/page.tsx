"use client";

import { useMemo, useState } from "react";

type Dossier = "all" | "club" | "argentina" | "awards";

const sources = {
  calendar:
    "https://www.guinnessworldrecords.com/world-records/106274-most-football-goals-scored-in-a-calendar-year",
  barca:
    "https://www.fcbarcelona.com/en/football/first-team/news/2070529/leo-messi-fc-barcelonas-historic-record-breaker",
  fifaProfile:
    "https://inside.fifa.com/news/lionel-messi-the-best-finalist-in-focus",
  uefaRecords:
    "https://www.uefa.com/uefachampionsleague/news/0242-0e97e0ac1cb3-eef786ff788c-1000--messi-his-records/",
  streak:
    "https://www.fcbarcelona.com/en/news/1143701/leo-messis-record-breaking-run-continues-becomes-first-player-to-score-against-19-opponents-consecutively/amp",
  worldCup:
    "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/lionel-messi-argentina-stats-records",
  goldenBall:
    "https://www.fifa.com/en/tournaments/mens/worldcup/articles/messi-golden-ball-record",
  goldenShoes:
    "https://www.uefa.com/uefachampionsleague/news/0256-0e9808f5ebfe-fe246f291029-1000--scarpa-d-oro-a-messi-tutti-i-vincitori-della-storia/",
};

const ledger = [
  {
    value: "672",
    label: "official Barcelona goals",
    note: "440 more than César, the club’s next-highest scorer.",
    group: "club" as Dossier,
    href: sources.barca,
  },
  {
    value: "474",
    label: "La Liga goals",
    note: "The competition record. His single-season record is 50.",
    group: "club" as Dossier,
    href: sources.uefaRecords,
  },
  {
    value: "129",
    label: "Champions League goals",
    note: "120 came for one club—also a competition record.",
    group: "club" as Dossier,
    href: sources.uefaRecords,
  },
  {
    value: "125",
    label: "Argentina goals",
    note: "In 206 senior appearances through 15 July 2026.",
    group: "argentina" as Dossier,
    href: sources.uefaRecords,
  },
  {
    value: "21",
    label: "World Cup goals",
    note: "The tournament record as of 15 July 2026.",
    group: "argentina" as Dossier,
    href: sources.worldCup,
  },
  {
    value: "8",
    label: "Ballons d’Or",
    note: "Three clear of the next-most decorated player.",
    group: "awards" as Dossier,
    href: sources.uefaRecords,
  },
  {
    value: "6",
    label: "European Golden Shoes",
    note: "Two more than Cristiano Ronaldo’s four.",
    group: "awards" as Dossier,
    href: sources.goldenShoes,
  },
  {
    value: "2",
    label: "World Cup Golden Balls",
    note: "Nobody else has won the tournament’s best-player award twice.",
    group: "awards" as Dossier,
    href: sources.goldenBall,
  },
];

const calendarYear = [
  { name: "Lionel Messi", year: "2012", value: 91, tone: "blue" },
  { name: "Gerd Müller", year: "1972", value: 85, tone: "ink" },
];

const filters: { id: Dossier; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "club", label: "Club" },
  { id: "argentina", label: "Argentina" },
  { id: "awards", label: "Awards" },
];

export default function Home() {
  const [filter, setFilter] = useState<Dossier>("all");
  const visibleLedger = useMemo(
    () => ledger.filter((item) => filter === "all" || item.group === filter),
    [filter],
  );

  return (
    <main>
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="The Messi Index home">
          The Messi Index
        </a>
        <div className="masthead-meta">
          <span>Vol. 01</span>
          <span>18 July 2026</span>
          <span>Records, audited</span>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-main">
          <p className="kicker">A study in statistical improbability</p>
          <h1 id="hero-title">
            The record book ran out of <em>adjectives.</em>
          </h1>
          <p className="dek">
            So we brought rulers. This is an audit of the distances Lionel Messi
            put between himself and football&apos;s idea of normal.
          </p>
        </div>
        <aside className="hero-aside" aria-label="Case summary">
          <span className="case-number">10</span>
          <p>
            “At some point the record book stops being a reference and starts
            being a biography.”
          </p>
          <a href="#calendar-year">Begin with 91 ↓</a>
        </aside>
      </section>

      <section className="plate calendar-plate" id="calendar-year" aria-labelledby="calendar-title">
        <div className="plate-heading">
          <span>Plate 01</span>
          <h2 id="calendar-title">The calendar-year anomaly</h2>
          <a href={sources.calendar} target="_blank" rel="noreferrer">
            Guinness record ↗
          </a>
        </div>
        <div className="calendar-layout">
          <div className="big-stat">
            <strong>91</strong>
            <span>goals · 2012</span>
          </div>
          <div className="bar-study" aria-label="Calendar year goal comparison: Messi 91 in 2012, Gerd Müller 85 in 1972">
            <p className="study-title">Official goals for club + country</p>
            {calendarYear.map((player) => (
              <div className="bar-row" key={player.name}>
                <div className="bar-label">
                  <span>{player.name}</span>
                  <small>{player.year}</small>
                </div>
                <div className="bar-track">
                  <span
                    className={`bar-fill ${player.tone}`}
                    style={{ width: `${(player.value / 91) * 100}%` }}
                  />
                </div>
                <strong>{player.value}</strong>
              </div>
            ))}
            <div className="margin-note">
              <b>+6</b>
              <span>past a record that had stood for 40 years.</span>
            </div>
          </div>
        </div>
        <div className="arithmetic-strip">
          <div><strong>1.32</strong><span>goals per appearance</span></div>
          <div><strong>1 every 4.02 days</strong><span>across a leap year</span></div>
          <div><strong>79 + 12</strong><span>Barcelona + Argentina</span></div>
          <p>Derived from 91 goals in 69 official appearances. Calendar spacing is illustrative; matches were not evenly distributed.</p>
        </div>
      </section>

      <section className="plate" aria-labelledby="barca-title">
        <div className="plate-heading">
          <span>Plate 02</span>
          <h2 id="barca-title">He nearly tripled a giant club&apos;s record</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="barca-comparison">
          <div className="barca-primary">
            <span className="ghost-number">672</span>
            <strong>672</strong>
            <p>official goals for FC Barcelona</p>
          </div>
          <div className="barca-rulers">
            <div className="ruler messi"><span>Messi</span><b>672</b></div>
            <div className="ruler cesar"><span>César Rodríguez</span><b>232</b></div>
            <div className="ruler note"><span>The gap</span><b>440</b></div>
          </div>
        </div>
        <p className="editorial-note">
          Barcelona existed for 105 years before Messi&apos;s senior debut. He left as its appearance leader, win leader, title leader and a scorer with <em>2.90×</em> the total of the man in second place.
        </p>
      </section>

      <section className="plate streak-plate" aria-labelledby="streak-title">
        <div className="plate-heading inverse">
          <span>Plate 03</span>
          <h2 id="streak-title">A lap of Spain without a blank</h2>
          <a href={sources.streak} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="streak-intro">
          <strong>21</strong>
          <p>consecutive La Liga appearances with a goal</p>
          <span>33 goals · 2012/13</span>
        </div>
        <div className="opponent-grid" role="img" aria-label="Nineteen consecutive league opponents scored against by Messi in 2012-13">
          {[
            "Osasuna", "Zaragoza", "Levante", "Athletic", "Betis", "Atlético",
            "Granada", "Rayo", "Mallorca", "Valladolid", "Espanyol", "Málaga",
            "Real Sociedad", "Valencia", "Getafe", "Real Madrid", "Deportivo", "Celta", "Everyone",
          ].map((team, index) => (
            <span className={team === "Everyone" ? "everyone" : ""} key={team}>
              <b>{String(index + 1).padStart(2, "0")}</b>{team}
            </span>
          ))}
        </div>
        <p className="streak-caption">He became the first player to score against all 19 league opponents consecutively—then extended the appearance streak to 21.</p>
      </section>

      <section className="plate" aria-labelledby="age-title">
        <div className="plate-heading">
          <span>Plate 04</span>
          <h2 id="age-title">The Champions League age ladder</h2>
          <a href={sources.uefaRecords} target="_blank" rel="noreferrer">UEFA ↗</a>
        </div>
        <p className="section-dek">Most goals ever scored in the competition before each birthday. Messi owns every rung shown.</p>
        <div className="age-ladder" role="img" aria-label="Messi Champions League goal records by age: 51 before age 25, 59 before 26, 67 before 27, 77 before 28, 83 before 29, 94 before 30">
          {[
            [25, 51], [26, 59], [27, 67], [28, 77], [29, 83], [30, 94],
          ].map(([age, goals]) => (
            <div className="age-rung" key={age}>
              <span>Before {age}</span>
              <div style={{ width: `${(goals / 94) * 100}%` }} />
              <strong>{goals}</strong>
            </div>
          ))}
        </div>
        <div className="ladder-note"><b>18</b><span>successive Champions League seasons with a goal · joint record</span></div>
      </section>

      <section className="plate world-plate" aria-labelledby="world-title">
        <div className="plate-heading">
          <span>Plate 05 · live dossier</span>
          <h2 id="world-title">The World Cup, rewritten at 39</h2>
          <a href={sources.worldCup} target="_blank" rel="noreferrer">FIFA · 15 Jul 2026 ↗</a>
        </div>
        <div className="world-grid">
          <div className="world-lead"><strong>21</strong><span>World Cup goals</span><p>All-time record</p></div>
          <div><strong>33</strong><span>appearances</span><p>All-time record</p></div>
          <div><strong>23</strong><span>match wins</span><p>All-time record</p></div>
          <div><strong>10</strong><span>knockout assists</span><p>All-time record</p></div>
          <div><strong>6</strong><span>tournaments assisted in</span><p>Only player</p></div>
          <div><strong>2,944</strong><span>minutes played</span><p>All-time record</p></div>
        </div>
        <p className="live-note">Live-stat warning: the 2026 tournament was still in progress when this plate was audited. Figures above follow FIFA’s 15 July 2026 update.</p>
      </section>

      <section className="ledger-section" aria-labelledby="ledger-title">
        <div className="ledger-header">
          <div><p className="kicker">Selected entries</p><h2 id="ledger-title">The ledger of implausibility</h2></div>
          <div className="filters" aria-label="Filter record ledger">
            {filters.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="ledger-list" aria-live="polite">
          {visibleLedger.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" className="ledger-row" key={item.label}>
              <strong>{item.value}</strong>
              <div><h3>{item.label}</h3><p>{item.note}</p></div>
              <span>Source ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="method" aria-labelledby="method-title">
        <div><p className="kicker">Reading the numbers</p><h2 id="method-title">No fan fiction. Just careful counting.</h2></div>
        <div className="method-copy">
          <p>Club totals use official competitive matches unless a plate explicitly says otherwise. “Calendar year” combines senior official club and national-team goals. Award counts and tournament totals follow the governing or awarding body linked on each plate.</p>
          <p>Comparisons across eras are context, not laboratory controls: formats, schedules and opposition changed. That makes precise counting more important—not less.</p>
        </div>
      </section>

      <footer>
        <span>The Messi Index · Issue 001</span>
        <p>The whole point is that this isn&apos;t normal.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
