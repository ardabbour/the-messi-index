"use client";

import { useMemo, useState } from "react";

type Dossier = "all" | "club" | "argentina" | "awards";

const sources = {
  calendar:
    "https://www.guinnessworldrecords.com/world-records/106274-most-football-goals-scored-in-a-calendar-year",
  calendarCentury:
    "https://www.uefa.com/news/027c-16dd00840cea-42f7bcafce6a-1000--who-is-top-men-s-scorer-in-2022/",
  calendarSplit:
    "https://www.fcbarcelona.com/en/football/first-team/news/1670444/stat-of-the-day-91-messis-goals-in-a-calendar-year/featured",
  barca:
    "https://www.fcbarcelona.com/en/football/first-team/news/2070529/leo-messi-fc-barcelonas-historic-record-breaker",
  uefaRecords:
    "https://www.uefa.com/uefachampionsleague/news/0242-0e97e0ac1cb3-eef786ff788c-1000--messi-his-records/",
  streak:
    "https://www.fcbarcelona.com/en/news/1143701/leo-messis-record-breaking-run-continues-becomes-first-player-to-score-against-19-opponents-consecutively/amp",
  worldCup:
    "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/lionel-messi-argentina-stats-records",
  worldCup2026:
    "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/fifa-world-cup-key-statistics",
  argentinaDebut:
    "https://www.fifa.com/en/articles/lionel-messi-international-debut-anniversary",
  assistMilestone:
    "https://inside.fifa.com/en/news/lionel-messi-consistency-personified",
  goldenBall:
    "https://www.fifa.com/en/tournaments/mens/worldcup/articles/messi-golden-ball-record",
  goldenShoes:
    "https://www.uefa.com/uefachampionsleague/news/0256-0e9808f5ebfe-fe246f291029-1000--scarpa-d-oro-a-messi-tutti-i-vincitori-della-storia/",
  fiftyYears:
    "https://www.fcbarcelona.com/en/football/first-team/news/1541353/messi-scores-50-goals-for-sixth-year-in-a-row",
  goldenSeason:
    "https://www.uefa.com/news-media/news/0250-0c50fcf1b3d9-0a7d71066738-1000--messi-scarpa-d-oro-da-record/",
  doubleCrown:
    "https://www.fcbarcelona.com/en/news/1732775/leo-messi-wins-his-seventh-pichichi-a-laliga-record/amp",
  mlsMvp:
    "https://www.mlssoccer.com/news/inter-miami-cf-forward-lionel-messi-named-2025-landon-donovan-mls-most-valuable-player-for-second-consecutive-season",
  awardGap:
    "https://www.fifa.com/en/the-best-fifa-football-awards/articles/lionel-messi-international-football-argentina-records-statistics",
  europeVictims:
    "https://www.uefa.com/uefachampionsleague/news/0253-0d81ee9b8a08-b457910cf27d-1000--who-were-lionel-messi-s-favourite-opponents/",
  suarezBarca:
    "https://www.fcbarcelona.com/en/football/first-team/players/4138/luis-suarez",
  freeKicks:
    "https://www.fcbarcelona.com/en/news/2127955/messi-50-goals-from-free-kicks-for-fc-barcelona",
  freeKickYear:
    "https://www.fcbarcelona.com/en/news/863072/messi-sets-new-record-with-eighth-free-kick-goal-of-the-year",
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
  {
    value: "12",
    label: "straight 30-goal seasons",
    note: "More than 30 official club goals every season from 2008/09 through 2019/20.",
    group: "club" as Dossier,
    href: sources.barca,
  },
  {
    value: "2×",
    label: "consecutive MLS MVP",
    note: "The first player in league history to win the award back to back.",
    group: "awards" as Dossier,
    href: sources.mlsMvp,
  },
  {
    value: "22",
    label: "straight Argentina calendar years",
    note: "Capped every year from 2005 through 2026; scored in the last 21.",
    group: "argentina" as Dossier,
    href: sources.uefaRecords,
  },
  {
    value: "36",
    label: "La Liga hat-tricks",
    note: "The competition record, alongside his records for goals, wins and Pichichis.",
    group: "club" as Dossier,
    href: sources.uefaRecords,
  },
  {
    value: "29",
    label: "Champions League round-of-16 goals",
    note: "The competition record in the first knockout round alone.",
    group: "club" as Dossier,
    href: sources.uefaRecords,
  },
];

const calendarYear = [
  { name: "Lionel Messi", year: "2012", value: 91, tone: "blue" },
  { name: "Gerd Müller", year: "1972", value: 85, tone: "ink" },
  { name: "Cristiano Ronaldo", year: "2013", value: 69, tone: "ink" },
  { name: "Robert Lewandowski", year: "2021", value: 69, tone: "ink" },
];

const decadeGoals = [
  { year: "2010", goals: 60 },
  { year: "2011", goals: 59 },
  { year: "2012", goals: 91 },
  { year: "2013", goals: 45 },
  { year: "2014", goals: 58 },
  { year: "2015", goals: 52 },
  { year: "2016", goals: 59 },
  { year: "2017", goals: 54 },
  { year: "2018", goals: 51 },
  { year: "2019", goals: 50 },
];

const barcaBreakdown = [
  { name: "La Liga", value: 474 },
  { name: "Champions League", value: 120 },
  { name: "Copa del Rey", value: 56 },
  { name: "Spanish Super Cup", value: 14 },
  { name: "Club World Cup", value: 5 },
  { name: "UEFA Super Cup", value: 3 },
];

const peakSeasonBreakdown = [
  { name: "La Liga", value: 50 },
  { name: "Champions League", value: 14 },
  { name: "Copa del Rey", value: 3 },
  { name: "Spanish Super Cup", value: 3 },
  { name: "UEFA Super Cup", value: 1 },
  { name: "Club World Cup", value: 2 },
];

const filters: { id: Dossier; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "club", label: "Club" },
  { id: "argentina", label: "Argentina" },
  { id: "awards", label: "Awards" },
];

export default function Home() {
  const [filter, setFilter] = useState<Dossier>("all");
  const [pace, setPace] = useState(30);
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
          <span>Vol. 02</span>
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

      <nav className="evidence-index" aria-label="Index of statistical evidence">
        <span>Index of evidence</span>
        <a href="#calendar-title"><b>01</b> Scoring anomaly</a>
        <a href="#barca-title"><b>02</b> Barcelona</a>
        <a href="#age-title"><b>04</b> Europe</a>
        <a href="#world-title"><b>05</b> World Cup</a>
        <a href="#late-title"><b>10</b> Late career</a>
        <a href="#ledger-title"><b>∞</b> Full ledger</a>
      </nav>

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
            <a className="study-source" href={sources.calendarCentury} target="_blank" rel="noreferrer">UEFA calendar-year table ↗</a>
          </div>
        </div>
        <div className="arithmetic-strip">
          <div><strong>1.32</strong><span>goals per appearance</span></div>
          <div><strong>1 every 4.02 days</strong><span>across a leap year</span></div>
          <div><strong>79 + 12</strong><span>Barcelona + Argentina</span></div>
          <div><strong>115</strong><span>goals + assists</span></div>
          <p>Derived from 91 goals in 69 official appearances. The 24-assist total follows <a href={sources.calendarSplit} target="_blank" rel="noreferrer">FC Barcelona</a>. Assist definitions can vary by provider; calendar spacing is illustrative.</p>
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
        <div className="world-span">
          <div><strong>20 years · 21 days</strong><span>between his first and latest World Cup goals · record</span></div>
          <div><strong>Teens · 20s · 30s</strong><span>the only player to score across all three age decades</span></div>
        </div>
        <p className="live-note">Live-stat warning: the 2026 tournament was still in progress when this plate was audited. Figures above follow FIFA’s 15 July 2026 update.</p>
      </section>

      <section className="plate live-2026-plate" aria-labelledby="live-2026-title">
        <div className="plate-heading inverse">
          <span>Plate 05A · tournament checkpoint</span>
          <h2 id="live-2026-title">Thirty-nine. Still setting the pace.</h2>
          <a href={sources.worldCup2026} target="_blank" rel="noreferrer">FIFA · 15 Jul 2026 ↗</a>
        </div>
        <div className="live-2026-equation" role="img" aria-label="At the 15 July 2026 checkpoint Messi had eight goals and four assists, making twelve goal contributions in seven World Cup matches">
          <div><strong>8</strong><span>goals</span></div>
          <b>+</b>
          <div><strong>4</strong><span>assists</span></div>
          <b>=</b>
          <div className="live-2026-total"><strong>12</strong><span>goal contributions</span></div>
        </div>
        <div className="live-2026-footer">
          <div><strong>7</strong><span>matches</span></div>
          <div><strong>620</strong><span>minutes</span></div>
          <div><strong>51.6</strong><span>minutes per contribution</span></div>
          <p>FIFA listed Messi first in the Golden Boot race at this checkpoint. The final had not yet been played, so this is a dated snapshot—not a finished tournament total.</p>
        </div>
        <div className="live-2026-records">
          <div><strong>38 years · 357 days</strong><span>oldest World Cup hat-trick scorer</span><p>Three against Algeria; the previous record was 33 years, 130 days.</p></div>
          <div><strong>5</strong><span>Player of the Match awards in 2026</span><p>A single-edition record. His prior high of four in 2014 had been the joint record.</p></div>
          <a href={sources.worldCup} target="_blank" rel="noreferrer">FIFA record dossier ↗</a>
        </div>
      </section>

      <section className="plate decade-plate" aria-labelledby="decade-title">
        <div className="plate-heading">
          <span>Plate 06</span>
          <h2 id="decade-title">The “bad” year was 45 goals</h2>
          <a href={sources.fiftyYears} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="decade-summary">
          <div><strong>579</strong><span>goals · 2010–2019</span></div>
          <p>Nine half-centuries in ten calendar years. The only miss was a 45-goal year.</p>
          <div><strong>57.9</strong><span>average per year</span></div>
        </div>
        <div className="decade-chart" role="img" aria-label="Messi goals by calendar year from 2010 to 2019: 60, 59, 91, 45, 58, 52, 59, 54, 51 and 50">
          {decadeGoals.map((item) => (
            <div className={item.year === "2012" ? "decade-column peak" : "decade-column"} key={item.year}>
              <strong>{item.goals}</strong>
              <div style={{ height: `${(item.goals / 91) * 100}%` }} />
              <span>{item.year}</span>
            </div>
          ))}
          <i className="fifty-line"><span>50-goal line</span></i>
        </div>
        <p className="decade-note">Totals combine Barcelona and Argentina. Sum and annual mean are derived from FC Barcelona’s year-by-year table.</p>
      </section>

      <section className="plate fifty-plate" aria-labelledby="fifty-title">
        <div className="plate-heading">
          <span>Plate 07</span>
          <h2 id="fifty-title">Fifty in the league. Not the season.</h2>
          <a href={sources.goldenSeason} target="_blank" rel="noreferrer">UEFA ↗</a>
        </div>
        <div className="fifty-layout">
          <div className="fifty-number"><strong>50</strong><span>La Liga goals</span></div>
          <div className="fifty-copy">
            <p className="section-dek">In 2011/12, Messi scored 50 times in 37 league appearances. That is <em>1.35 goals per match</em> across almost an entire domestic season.</p>
            <div className="fifty-facts">
              <div><strong>6</strong><span>hat-tricks</span></div>
              <div><strong>2</strong><span>four-goal matches</span></div>
              <div><strong>+4</strong><span>over Ronaldo</span></div>
            </div>
            <p className="red-note">Then zoom out: he scored 73 official goals in all club competitions that season.</p>
          </div>
        </div>
      </section>

      <section className="plate double-plate" aria-labelledby="double-title">
        <div className="plate-heading">
          <span>Plate 08</span>
          <h2 id="double-title">He led both columns. Three years running.</h2>
          <a href={sources.doubleCrown} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="double-intro">
          <p>La Liga rank</p>
          <div><span>Goals</span><strong>#1</strong></div>
          <b>+</b>
          <div><span>Assists</span><strong>#1</strong></div>
          <p>2017/18 · 2018/19 · 2019/20</p>
        </div>
        <div className="double-seasons">
          {[
            { season: "2017/18", goals: 34, assists: 12, apps: 36 },
            { season: "2018/19", goals: 36, assists: 13, apps: 34 },
            { season: "2019/20", goals: 25, assists: 21, apps: 33 },
          ].map((item) => (
            <div className="double-season" key={item.season}>
              <span>{item.season}</span>
              <div className="split-total">
                <div><strong>{item.goals}</strong><small>goals</small></div>
                <i>+</i>
                <div><strong>{item.assists}</strong><small>assists</small></div>
              </div>
              <p>{((item.goals + item.assists) / item.apps).toFixed(2)} direct goal involvements per appearance</p>
            </div>
          ))}
        </div>
        <p className="double-note">In the final season, at age 33, he set the league’s single-season assist record (21) while winning its scoring title (25). Assist totals follow FC Barcelona’s provider and may differ under other definitions.</p>
      </section>

      <section className="plate late-plate" aria-labelledby="late-title">
        <div className="plate-heading inverse">
          <span>Plate 10</span>
          <h2 id="late-title">Age 38. League leader in both jobs.</h2>
          <a href={sources.mlsMvp} target="_blank" rel="noreferrer">Major League Soccer ↗</a>
        </div>
        <div className="late-layout">
          <div className="late-lead"><span>2025 regular season</span><strong>48</strong><p>direct goal contributions</p></div>
          <div className="late-equation">
            <div><strong>29</strong><span>goals · league #1</span></div>
            <b>+</b>
            <div><strong>19</strong><span>assists · joint #1</span></div>
            <i>=</i>
            <div className="rate"><strong>1.71</strong><span>per match</span></div>
          </div>
        </div>
        <div className="late-records">
          <div><strong>28</strong><span>matches</span></div>
          <div><strong>9</strong><span>matches with 3+ contributions · MLS record</span></div>
          <div><strong>2nd</strong><span>most contributions in any MLS season</span></div>
          <div><strong>1st</strong><span>back-to-back MVP in MLS history</span></div>
        </div>
        <p className="late-note">He turned 38 in June 2025. The season ended with the Golden Boot, MLS Cup and a second straight league MVP award.</p>
      </section>

      <section className="plate awards-plate" aria-labelledby="awards-title">
        <div className="plate-heading">
          <span>Plate 11</span>
          <h2 id="awards-title">Even the award gaps have gaps</h2>
          <a href={sources.awardGap} target="_blank" rel="noreferrer">FIFA ↗</a>
        </div>
        <div className="award-columns">
          <div className="award-study">
            <div className="award-name"><span>Ballon d’Or</span><strong>8</strong></div>
            {[
              { name: "Lionel Messi", value: 8 },
              { name: "Cristiano Ronaldo", value: 5 },
              { name: "Cruyff · Platini · Van Basten", value: 3 },
            ].map((item) => (
              <div className="award-row" key={item.name}>
                <span>{item.name}</span>
                <div>{Array.from({ length: 8 }, (_, index) => <i className={index < item.value ? "filled" : ""} key={index} />)}</div>
                <strong>{item.value}</strong>
              </div>
            ))}
            <p>Messi’s margin over second place equals the entire career total of the joint third-place legends.</p>
          </div>
          <div className="award-study">
            <div className="award-name"><span>European Golden Shoe</span><strong>6</strong></div>
            {[
              { name: "Lionel Messi", value: 6 },
              { name: "Cristiano Ronaldo", value: 4 },
              { name: "Next-best winners", value: 2 },
            ].map((item) => (
              <div className="award-row" key={item.name}>
                <span>{item.name}</span>
                <div>{Array.from({ length: 6 }, (_, index) => <i className={index < item.value ? "filled" : ""} key={index} />)}</div>
                <strong>{item.value}</strong>
              </div>
            ))}
            <p>His final three arrived consecutively. No other player has won more than four overall.</p>
            <a className="award-source" href={sources.goldenShoes} target="_blank" rel="noreferrer">UEFA Golden Shoe history ↗</a>
          </div>
        </div>
      </section>

      <section className="plate europe-plate" aria-labelledby="europe-title">
        <div className="plate-heading">
          <span>Plate 12</span>
          <h2 id="europe-title">Europe was a very long contact list</h2>
          <a href={sources.europeVictims} target="_blank" rel="noreferrer">UEFA opponent archive ↗</a>
        </div>
        <div className="europe-summary">
          <div><strong>46</strong><span>clubs faced</span></div>
          <div><strong>42</strong><span>clubs scored against</span></div>
          <div><strong>19</strong><span>countries represented</span></div>
          <div><strong>132</strong><span>UEFA club goals</span></div>
        </div>
        <div className="victim-table">
          <div className="victim-head"><span>Opponent</span><span>Goals</span><span>Minutes</span><span>Minutes per goal</span></div>
          {[
            { club: "Bayer Leverkusen", goals: 7, minutes: "270", rate: "38:34" },
            { club: "Ajax", goals: 6, minutes: "247", rate: "41:10" },
            { club: "PSV", goals: 4, minutes: "180", rate: "45:00" },
            { club: "Arsenal", goals: 9, minutes: "537", rate: "59:40" },
            { club: "All opponents", goals: 132, minutes: "14,005", rate: "106:06" },
          ].map((item) => (
            <div className={item.club === "All opponents" ? "victim-row total" : "victim-row"} key={item.club}>
              <strong>{item.club}</strong><span>{item.goals}</span><span>{item.minutes}</span><b>{item.rate}</b>
            </div>
          ))}
        </div>
        <div className="europe-notes">
          <p><strong>9</strong> against Arsenal—the most he scored against one European opponent.</p>
          <p><strong>5</strong> against Leverkusen in a single match. The other two came in his remaining 180 minutes against them.</p>
          <p><strong>4</strong> clubs escaped without conceding: Atlético, Inter, Rubin Kazan and Udinese.</p>
        </div>
      </section>

      <section className="plate anatomy-plate" aria-labelledby="anatomy-title">
        <div className="plate-heading">
          <span>Plate 13</span>
          <h2 id="anatomy-title">Anatomy of 672</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="anatomy-lead">
          <strong>672</strong>
          <p>official goals · six competitions · one club</p>
        </div>
        <div className="stacked-goals" role="img" aria-label="Messi's 672 official Barcelona goals: 474 in La Liga, 120 in Champions League, 56 in Copa del Rey, 14 in Spanish Super Cup, 5 in Club World Cup and 3 in UEFA Super Cup">
          {barcaBreakdown.map((item, index) => (
            <span className={`segment segment-${index + 1}`} style={{ width: `${(item.value / 672) * 100}%` }} key={item.name} />
          ))}
        </div>
        <div className="anatomy-key">
          {barcaBreakdown.map((item, index) => (
            <div key={item.name}><i className={`segment-${index + 1}`} /><span>{item.name}</span><strong>{item.value}</strong><small>{((item.value / 672) * 100).toFixed(1)}%</small></div>
          ))}
        </div>
        <div className="nonleague-proof">
          <div><span>Remove every league goal</span><strong>672 − 474 = 198</strong></div>
          <b>=</b>
          <div><span>Luis Suárez’s entire official Barça career</span><strong>198 goals</strong><a href={sources.suarezBarca} target="_blank" rel="noreferrer">Source ↗</a></div>
        </div>
      </section>

      <section className="plate free-plate" aria-labelledby="free-title">
        <div className="plate-heading inverse">
          <span>Plate 14</span>
          <h2 id="free-title">He nearly doubled the specialist</h2>
          <a href={sources.freeKicks} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="free-layout">
          <div className="free-primary"><strong>50</strong><span>direct free-kick goals for Barcelona</span></div>
          <div className="free-versus">
            <p>Former club benchmark</p>
            <div className="free-bar"><span>Ronald Koeman</span><i style={{ width: "52%" }} /><strong>26</strong></div>
            <div className="free-bar messi"><span>Lionel Messi</span><i style={{ width: "100%" }} /><strong>50</strong></div>
            <b>+24 · 1.92× the previous mark</b>
          </div>
        </div>
        <div className="free-footer">
          <div><strong>8</strong><span>free-kick goals in calendar 2018 · a record</span></div>
          <p>His 600th Barcelona goal was also a direct free kick: the 2019 Champions League strike against Liverpool.</p>
          <a href={sources.freeKickYear} target="_blank" rel="noreferrer">2018 record source ↗</a>
        </div>
      </section>

      <section className="plate liga-plate" aria-labelledby="liga-title">
        <div className="plate-heading">
          <span>Plate 15</span>
          <h2 id="liga-title">One league. Six different monopolies.</h2>
          <a href={sources.uefaRecords} target="_blank" rel="noreferrer">UEFA · 16 Jul 2026 ↗</a>
        </div>
        <div className="liga-records">
          {[
            ["474", "career goals", "competition record"],
            ["50", "goals in one season", "competition record"],
            ["36", "career hat-tricks", "competition record"],
            ["21", "straight matches scoring", "competition record"],
            ["383", "matches won as a player", "competition record"],
            ["8", "Pichichi awards", "competition record"],
          ].map(([value, label, note], index) => (
            <div className={index === 0 ? "liga-record lead" : "liga-record"} key={label}>
              <strong>{value}</strong><span>{label}</span><p>{note}</p>
            </div>
          ))}
        </div>
        <p className="liga-note">These are six different record categories, not six ways of restating one total. Career volume, peak season, repeat explosions, consistency, team results and scoring titles all resolve to the same name.</p>
      </section>

      <section className="plate longevity-plate" aria-labelledby="longevity-title">
        <div className="plate-heading inverse">
          <span>Plate 16</span>
          <h2 id="longevity-title">Twenty-one straight years on the scoresheet.</h2>
          <a href={sources.uefaRecords} target="_blank" rel="noreferrer">UEFA · 16 Jul 2026 ↗</a>
        </div>
        <div className="longevity-summary">
          <div><strong>22</strong><span>consecutive calendar years capped</span></div>
          <div><strong>21</strong><span>consecutive calendar years scoring</span></div>
          <p>Senior Argentina debut in 2005. A goal in every calendar year from 2006 through the live 2026 season.</p>
        </div>
        <div className="year-run" role="img" aria-label="Messi played for Argentina in every year from 2005 through 2026, scoring in every year from 2006 through 2026">
          {Array.from({ length: 22 }, (_, index) => 2005 + index).map((year) => (
            <div className={year === 2005 ? "debut" : "scored"} key={year}>
              <span>{year}</span><b>{year === 2005 ? "Cap" : "Goal"}</b>
            </div>
          ))}
        </div>
        <div className="longevity-endpoints">
          <p><strong>17 Aug 2005</strong><span>senior Argentina debut · <a href={sources.argentinaDebut} target="_blank" rel="noreferrer">FIFA archive ↗</a></span></p>
          <b>→</b>
          <p><strong>39 years · 13 days</strong><span>oldest Argentinian World Cup scorer · July 2026</span></p>
        </div>
      </section>

      <section className="plate knockout-plate" aria-labelledby="knockout-title">
        <div className="plate-heading">
          <span>Plate 17</span>
          <h2 id="knockout-title">The knockout rounds were not a deterrent.</h2>
          <a href={sources.uefaRecords} target="_blank" rel="noreferrer">UEFA · 16 Jul 2026 ↗</a>
        </div>
        <div className="knockout-grid">
          <div className="knockout-lead"><strong>29</strong><span>round-of-16 goals</span><p>Champions League record</p></div>
          <div><strong>5</strong><span>goals in one knockout match</span><p>vs Leverkusen · 2012 · joint record</p></div>
          <div><strong>6</strong><span>goals in one round-of-16 tie</span><p>vs Leverkusen · 2012 · record</p></div>
          <div><strong>4</strong><span>goals in one quarter-final</span><p>vs Arsenal · 2010 · record</p></div>
        </div>
        <div className="knockout-proof"><b>One player</b><span>→</span><b>three elimination-round scales</b><span>→</span><b>four records</b></div>
      </section>

      <section className="plate world-gap-plate" aria-labelledby="world-gap-title">
        <div className="plate-heading inverse">
          <span>Plate 18 · live margins</span>
          <h2 id="world-gap-title">“First” undersells the distance.</h2>
          <a href={sources.worldCup} target="_blank" rel="noreferrer">FIFA · 15 Jul 2026 ↗</a>
        </div>
        <div className="world-gap-table" role="img" aria-label="World Cup record margins: Messi 21 goals to previous record 16, 23 wins to previous record 17, 26 captain appearances to next player 17, and assists in six editions to next-best three">
          {[
            { label: "World Cup goals", messi: 21, other: 16, otherLabel: "old record · Klose", suffix: "+5" },
            { label: "World Cup wins", messi: 23, other: 17, otherLabel: "old record · Klose", suffix: "+6" },
            { label: "Appearances as captain", messi: 26, other: 17, otherLabel: "next · Márquez", suffix: "+9" },
            { label: "Editions with an assist", messi: 6, other: 3, otherLabel: "next-best group", suffix: "2×" },
          ].map((row) => (
            <div className="world-gap-row" key={row.label}>
              <div className="world-gap-label"><strong>{row.label}</strong><b>{row.suffix}</b></div>
              <div className="world-gap-bars">
                <p><span>Lionel Messi</span><i style={{ width: "100%" }} /><strong>{row.messi}</strong></p>
                <p><span>{row.otherLabel}</span><i style={{ width: `${(row.other / row.messi) * 100}%` }} /><strong>{row.other}</strong></p>
              </div>
            </div>
          ))}
        </div>
        <p className="world-gap-note">The comparison target changes by row: “old record” where Messi surpassed a prior mark, “next” where the active leaderboard matters. Tournament figures were still live at audit time.</p>
      </section>

      <section className="plate peak-season-plate" aria-labelledby="peak-season-title">
        <div className="plate-heading">
          <span>Plate 19</span>
          <h2 id="peak-season-title">Seventy-three. In one club season.</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="peak-season-layout">
          <div className="peak-season-total"><strong>73</strong><span>official goals · 2011/12</span></div>
          <div className="peak-season-equation" role="img" aria-label="Messi's 73 official goals in 2011-12: 50 in La Liga, 14 in Champions League, 3 in Copa del Rey, 3 in Spanish Super Cup, 1 in UEFA Super Cup and 2 in Club World Cup">
            {peakSeasonBreakdown.map((item) => (
              <div key={item.name}><strong>{item.value}</strong><span>{item.name}</span></div>
            ))}
          </div>
        </div>
        <div className="peak-season-strip">
          {peakSeasonBreakdown.map((item, index) => (
            <i className={`segment-${index + 1}`} style={{ width: `${(item.value / 73) * 100}%` }} key={item.name} />
          ))}
        </div>
        <p className="peak-season-note"><strong>Six competitions. Goals in all six.</strong> The league supplied 68.5% of the total; the other five competitions still added 23 more.</p>
      </section>

      <section className="plate eruption-plate" aria-labelledby="eruption-title">
        <div className="plate-heading">
          <span>Plate 20</span>
          <h2 id="eruption-title">The hat-trick was the small version.</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="eruption-summary">
          <div><strong>48</strong><span>official Barça matches with 3+ goals</span></div>
          <div><strong>152</strong><span>goals inside those matches</span></div>
          <div><strong>22.6%</strong><span>of all 672 Barcelona goals</span></div>
        </div>
        <div className="eruption-grid" role="img" aria-label="Forty-eight Barcelona matches with three or more Messi goals: 41 hat-tricks, six four-goal games and one five-goal game">
          {Array.from({ length: 48 }, (_, index) => {
            const goals = index < 41 ? 3 : index < 47 ? 4 : 5;
            return <span className={`eruption-${goals}`} key={index} aria-label={`Match ${index + 1}: ${goals} goals`}>{goals}</span>;
          })}
        </div>
        <div className="eruption-legend">
          <p><i className="eruption-3" /><strong>41</strong><span>hat-tricks</span></p>
          <p><i className="eruption-4" /><strong>6</strong><span>four-goal games</span></p>
          <p><i className="eruption-5" /><strong>1</strong><span>five-goal game</span></p>
          <b>41×3 + 6×4 + 1×5 = 152</b>
        </div>
      </section>

      <section className="plate venue-plate" aria-labelledby="venue-title">
        <div className="plate-heading inverse">
          <span>Plate 21</span>
          <h2 id="venue-title">Change the venue. Same result.</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="venue-grid">
          <div className="venue-home"><strong>35</strong><span>home La Liga goals</span><p>2011/12 · season record</p></div>
          <div className="venue-away"><strong>24</strong><span>away La Liga goals</span><p>2012/13 · season record</p></div>
          <div><strong>15</strong><span>straight away league matches scoring</span><p>2012/13 · record streak</p></div>
          <div><strong>28</strong><span>goals in a league season’s second half</span><p>2011/12 · record</p></div>
        </div>
        <p className="venue-note">Two different seasons. Four different slices of the schedule. Each slice ends in a competition record.</p>
      </section>

      <section className="plate single-club-plate" aria-labelledby="single-club-title">
        <div className="plate-heading">
          <span>Plate 22</span>
          <h2 id="single-club-title">He cleared Pelé, then kept going.</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="single-club-race" role="img" aria-label="Official goals for one club: Lionel Messi scored 672 for Barcelona, 29 more than Pelé's previous record of 643 for Santos">
          <div className="single-club-line pele"><span>Pelé · Santos · 1956–1974</span><i style={{ width: `${(643 / 672) * 100}%` }} /><strong>643</strong></div>
          <div className="single-club-line messi"><span>Lionel Messi · Barcelona · 2004–2021</span><i style={{ width: "100%" }} /><strong>672</strong></div>
        </div>
        <div className="single-club-margin"><strong>+29</strong><p>official goals beyond the previous single-club world record</p><span>672 ÷ 643 = 1.045×</span></div>
      </section>

      <section className="plate milestone-plate" aria-labelledby="milestone-title">
        <div className="plate-heading">
          <span>Plate 23</span>
          <h2 id="milestone-title">The milestones started arriving faster.</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="milestone-track" role="img" aria-label="Barcelona goal milestones: Messi reached 100 official goals on 16 January 2010 at age 22, 200 on 1 November 2011 at age 24, and finished with 672 in 2021">
          <div><span>16 Jan 2010</span><i /><strong>100</strong><p>youngest to 100 · age 22</p></div>
          <div><span>1 Nov 2011</span><i /><strong>200</strong><p>youngest to 200 · age 24</p></div>
          <div><span>2021</span><i /><strong>672</strong><p>final official Barça total</p></div>
        </div>
        <div className="milestone-math">
          <div><strong>654 days</strong><span>from goal 100 to goal 200</span></div>
          <div><strong>6.54 days</strong><span>per goal across that hundred</span></div>
          <div><strong>+472</strong><span>after reaching 200</span></div>
        </div>
      </section>

      <section className="plate wins-plate" aria-labelledby="wins-title">
        <div className="plate-heading inverse">
          <span>Plate 24</span>
          <h2 id="wins-title">Even the win column has a chasm.</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="wins-layout">
          <div className="wins-total"><strong>542</strong><span>official Barcelona wins</span><p>club player record</p></div>
          <div className="wins-study">
            <div className="wins-bar"><span>Lionel Messi</span><i style={{ width: "100%" }} /><strong>542</strong></div>
            <div className="wins-bar"><span>Xavi Hernández</span><i style={{ width: `${(476 / 542) * 100}%` }} /><strong>476</strong></div>
            <div className="wins-gap"><strong>+66 wins</strong><span>beyond the previous club benchmark</span></div>
          </div>
        </div>
        <div className="wins-rate"><strong>542 ÷ 778 = 69.7%</strong><p>Messi’s Barcelona won nearly seven of every ten official matches he played.</p><span>Derived from club appearance and win totals</span></div>
      </section>

      <section className="plate clasico-plate" aria-labelledby="clasico-title">
        <div className="plate-heading">
          <span>Plate 25</span>
          <h2 id="clasico-title">The biggest fixture got 26 examples.</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="clasico-layout">
          <div className="clasico-total"><strong>26</strong><span>El Clásico goals</span><p>all-time record</p></div>
          <div className="clasico-split" role="img" aria-label="Messi's 26 El Clásico goals: 18 in La Liga, six in the Spanish Super Cup and two in the Champions League">
            <div className="clasico-segment liga"><strong>18</strong><span>La Liga</span><small>69.2%</small></div>
            <div className="clasico-segment super"><strong>6</strong><span>Spanish Super Cup</span><small>23.1%</small></div>
            <div className="clasico-segment europe"><strong>2</strong><span>Champions League</span><small>7.7%</small></div>
          </div>
        </div>
        <div className="clasico-cells" role="img" aria-label="Twenty-six cells representing Messi's El Clásico goals, grouped 18 league, six Spanish Super Cup and two Champions League">
          {Array.from({ length: 26 }, (_, index) => <span className={index < 18 ? "liga" : index < 24 ? "super" : "europe"} key={index}>{index + 1}</span>)}
        </div>
      </section>

      <section className="plate double-38-plate" aria-labelledby="double-38-title">
        <div className="plate-heading inverse">
          <span>Plate 26</span>
          <h2 id="double-38-title">Thirty-eight, twice.</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="double-38-layout">
          <div><strong>38</strong><span>different La Liga opponents scored against</span><p>Competition record · prior mark 35</p></div>
          <b>≠</b>
          <div><strong>38</strong><span>direct free-kick goals in La Liga</span><p>Competition record</p></div>
        </div>
        <div className="double-38-proof">
          <p><strong>+3 opponents</strong><span>beyond Raúl González and Aritz Aduriz’s prior breadth record</span></p>
          <p><strong>One number</strong><span>two unrelated record categories</span></p>
        </div>
      </section>

      <section className="plate argentina-year-plate" aria-labelledby="argentina-year-title">
        <div className="plate-heading">
          <span>Plate 27</span>
          <h2 id="argentina-year-title">His Argentina peak arrived in the World Cup year.</h2>
          <a href={sources.awardGap} target="_blank" rel="noreferrer">FIFA ↗</a>
        </div>
        <div className="argentina-year-layout">
          <div className="argentina-year-total"><strong>18</strong><span>Argentina goals · 2022</span><p>national-team calendar-year record</p></div>
          <div className="argentina-year-study">
            <div><strong>14</strong><span>appearances</span></div>
            <div><strong>1.29</strong><span>goals per appearance</span></div>
            <div><strong>+6</strong><span>above the previous 12-goal tier</span></div>
            <p>The next-highest calendar total was 12—set by Messi himself in 2012 and Gabriel Batistuta in 1998. Eighteen is 50% higher.</p>
          </div>
        </div>
        <div className="argentina-year-dots" role="img" aria-label="Eighteen goals for Argentina in 2022 compared with the prior calendar-year tier of twelve goals">
          {Array.from({ length: 18 }, (_, index) => <span className={index < 12 ? "baseline" : "margin"} key={index}>{index + 1}</span>)}
        </div>
      </section>

      <section className="plate creation-plate" aria-labelledby="creation-title">
        <div className="plate-heading inverse">
          <span>Plate 28</span>
          <h2 id="creation-title">The scorer had a second career as a provider.</h2>
          <a href={sources.assistMilestone} target="_blank" rel="noreferrer">FIFA ↗</a>
        </div>
        <div className="creation-layout">
          <div className="creation-career"><strong>250</strong><span>Barcelona assists reached</span><p>23 June 2020 · one day before his 33rd birthday</p></div>
          <div className="creation-season">
            <div><strong>25</strong><span>league goals</span></div>
            <b>+</b>
            <div><strong>21</strong><span>league assists · record</span></div>
            <b>=</b>
            <div className="creation-total"><strong>46</strong><span>direct contributions</span></div>
          </div>
        </div>
        <div className="creation-rate"><strong>46 ÷ 33 = 1.39</strong><p>goals plus assists per La Liga appearance in 2019/20</p><span>The 21 assists surpassed Xavi’s previous single-season mark of 20.</span></div>
      </section>

      <section className="plate distance-plate" aria-labelledby="distance-title">
        <div className="plate-heading inverse">
          <span>Plate 29 · live dossier</span>
          <h2 id="distance-title">The penalty area was optional.</h2>
          <a href={sources.worldCup} target="_blank" rel="noreferrer">FIFA · 15 Jul 2026 ↗</a>
        </div>
        <div className="distance-layout">
          <div className="distance-total"><strong>7</strong><span>World Cup goals from outside the box</span><p>tournament record</p></div>
          <div className="distance-comparison">
            <div><span>Lionel Messi</span><i style={{ width: "100%" }} /><strong>7</strong></div>
            <div><span>Rivellino · old record</span><i style={{ width: `${(5 / 7) * 100}%` }} /><strong>5</strong></div>
            <p><strong>+2 · 40% above</strong><span>the previous distance-scoring mark</span></p>
          </div>
        </div>
        <div className="distance-share"><strong>7 ÷ 21 = 33.3%</strong><p>One in every three Messi World Cup goals has come from outside the area.</p><span>Live career total through 15 July 2026</span></div>
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

      <section className="plate pace-plate" aria-labelledby="pace-title">
        <div className="plate-heading">
          <span>Plate 09 · interactive</span>
          <h2 id="pace-title">Try to manufacture 672</h2>
          <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="pace-layout">
          <div className="pace-control">
            <label htmlFor="pace">Hypothetical official club goals per season <output htmlFor="pace">{pace}</output></label>
            <input id="pace" type="range" min="10" max="60" step="1" value={pace} onChange={(event) => setPace(Number(event.target.value))} />
            <div className="pace-scale"><span>10</span><span>35</span><span>60</span></div>
          </div>
          <div className="pace-answer" aria-live="polite">
            <strong>{(672 / pace).toFixed(1)}</strong>
            <p>seasons at {pace} goals every season</p>
            <span>{672 % pace === 0 ? `Exactly ${672 / pace} complete seasons` : `${Math.floor(672 / pace)} complete seasons, then ${672 % pace} more goals`}</span>
          </div>
        </div>
        <div className="season-grid" role="img" aria-label={`It takes ${(672 / pace).toFixed(1)} seasons at ${pace} goals per season to score 672 goals`}>
          {Array.from({ length: Math.ceil(672 / pace) }, (_, index) => {
            const isLast = index === Math.ceil(672 / pace) - 1;
            const remainder = 672 % pace;
            const fill = isLast && remainder ? (remainder / pace) * 100 : 100;
            return <span key={index}><i style={{ width: `${fill}%` }} /><b>{index + 1}</b></span>;
          })}
        </div>
        <p className="pace-note">This is a pace translation, not a forecast: it simply divides Messi’s 672 official Barcelona goals by the rate you choose. Move the rate all the way to 60 and the answer is still 11.2 seasons.</p>
      </section>

      <section className="method" aria-labelledby="method-title">
        <div><p className="kicker">Reading the numbers</p><h2 id="method-title">No fan fiction. Just careful counting.</h2></div>
        <div className="method-copy">
          <p>Club totals use official competitive matches unless a plate explicitly says otherwise. “Calendar year” combines senior official club and national-team goals. Award counts and tournament totals follow the governing or awarding body linked on each plate.</p>
          <p>Comparisons across eras are context, not laboratory controls: formats, schedules and opposition changed. That makes precise counting more important—not less.</p>
        </div>
      </section>

      <footer>
        <span>The Messi Index · Issue 002</span>
        <p>The whole point is that this isn&apos;t normal.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
