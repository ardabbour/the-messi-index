"use client";

import { useMemo, useState } from "react";
import edition from "../data/edition.json";
import worldCup2026 from "../data/live-world-cup-2026.json";

type Dossier = "all" | "club" | "argentina" | "creation" | "awards";

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
  semiFinal2026:
    "https://www.fifa.com/en/articles/england-argentina-match-report-highlights",
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
  mlsMvp2024:
    "https://www.mlssoccer.com/news/inter-miami-cf-forward-lionel-messi-named-2024-landon-donovan-mls-most-valuable-player",
  mlsSix:
    "https://www.mlssoccer.com/news/six-goal-contributions-lionel-messi-sets-two-more-mls-records-in-matchday-12",
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
  finalGoals:
    "https://www.fcbarcelona.com/en/news/3642383/leo-messi-becomes-the-most-decorated-player-in-history",
  finalsBreakdown:
    "https://www.fcbarcelona.com/en/football/first-team/news/2105698/leo-messi-29-goals-in-finals",
  copaFinal2021:
    "https://www.fcbarcelona.com/en/news/2108496/copa-del-rey-champions/amp",
  thirtyGoalRun:
    "https://www.fcbarcelona.com/en/football/first-team/news/2110565/thirteenth-consecutive-30-goal-season-for-messi/featured",
  worldXi:
    "https://www.fifa.com/en/the-best-fifa-football-awards/articles/lionel-messi-world-11-record-the-best",
  u20WorldCup:
    "https://www.fifa.com/en/tournaments/mens/u20worldcup/chile-2025/articles/lionel-messi-u20-world-cup",
  fifaTrophies:
    "https://www.fifa.com/en/the-best-fifa-football-awards/articles/the-world-cup-the-best-and-all-of-lionel-messis-trophy-wins",
  olympicWorldDouble:
    "https://www.fifa.com/en/tournaments/olympicgames/paris2024/articles/world-champions-olympic-gold",
  championsLeagueSixty:
    "https://www.uefa.com/uefachampionsleague/news/026f-13bff87268a6-5932644cbba5-1000--kylian-mbappe-in-the-champions-league-records-stats-who-he/",
  copaAppearances:
    "https://copaamerica.com/en/news/copa-america-2024-numbers-champion-top-scorer",
  copaFinals:
    "https://copaamerica.com/en/news/records-broken-feats-copa-america-2024-messi-james-colombia-canada",
  qualifyingScorers:
    "https://www.fifa.com/en/tournaments/mens/worldcup/articles/conmebol-qualifying-top-goalscorers-history",
  careerAssists400:
    "https://es.mlssoccer.com/playoffs/2025/noticias/leo-messi-records-sin-fin-en-un-inter-miami-que-nunca-llego-tan-lejos",
  decadeAnalysis:
    "https://www.fcbarcelona.com/en/football/first-team/actualites/1655195",
};

const wcCareer = worldCup2026.career;
const wcTournament = worldCup2026.tournament;
const wcComparators = worldCup2026.comparators;
const wcAuditLabel = worldCup2026.auditDateLabel;
const wcAuditShort = worldCup2026.auditDateShort;
const wcIsInProgress = worldCup2026.status === "in_progress";
const wcDossierLabel = wcIsInProgress ? "live dossier" : "final dossier";

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
    value: "6",
    label: "Argentina team trophies",
    note: "Five competitions from the 2005 U-20 World Cup through the 2024 Copa América.",
    group: "argentina" as Dossier,
    href: sources.fifaTrophies,
  },
  {
    value: "39",
    label: "Copa América appearances",
    note: "The tournament record, five beyond Sergio Livingstone’s previous 34.",
    group: "argentina" as Dossier,
    href: sources.copaAppearances,
  },
  {
    value: "36",
    label: "South American qualifying goals",
    note: "The competition record across six World Cup cycles; seven clear of Luis Suárez.",
    group: "argentina" as Dossier,
    href: sources.qualifyingScorers,
  },
  {
    value: String(wcCareer.goals),
    label: "World Cup goals",
    note: `The tournament record as of ${wcAuditLabel}.`,
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
    value: "4/4",
    label: "major individual honours in 2009/10",
    note: "The only Ballon d’Or, FIFA World Player, Pichichi and European Golden Shoe sweep.",
    group: "awards" as Dossier,
    href: sources.barca,
  },
  {
    value: "13",
    label: "straight 30-goal seasons",
    note: "At least 30 official club goals every season from 2008/09 through 2020/21.",
    group: "club" as Dossier,
    href: sources.thirtyGoalRun,
  },
  {
    value: "2×",
    label: "consecutive MLS MVP",
    note: "The first player in league history to win the award back to back.",
    group: "awards" as Dossier,
    href: sources.mlsMvp,
  },
  {
    value: "400",
    label: "official career assists reached",
    note: "A world-record first across Barcelona, Argentina, Paris Saint-Germain and Inter Miami.",
    group: "creation" as Dossier,
    href: sources.careerAssists400,
  },
  {
    value: "115",
    label: "goal contributions in calendar 2012",
    note: "Ninety-one goals plus 24 assists: one direct contribution every 3.18 days.",
    group: "creation" as Dossier,
    href: sources.calendarSplit,
  },
  {
    value: "21",
    label: "assists in one La Liga season",
    note: "The competition record, set while also winning the 2019/20 scoring title.",
    group: "creation" as Dossier,
    href: sources.assistMilestone,
  },
  {
    value: "10",
    label: "World Cup knockout assists",
    note: "The tournament record through the 15 July 2026 checkpoint.",
    group: "creation" as Dossier,
    href: sources.worldCup,
  },
  {
    value: "5",
    label: "assists in one MLS match",
    note: "A league record—and all five arrived in the second half.",
    group: "creation" as Dossier,
    href: sources.mlsSix,
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
  {
    value: "1,482",
    label: "La Liga dribbles in Barça’s decade analysis",
    note: "A 915-dribble lead over second place—2.61 times Iker Muniain’s total.",
    group: "club" as Dossier,
    href: sources.decadeAnalysis,
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
const decadeLeagueContributions = [
  { name: "Lionel Messi", goals: 350, assists: 137, total: 487 },
  { name: "Cristiano Ronaldo", goals: 285, assists: 80, total: 365 },
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

const finalGoalsBreakdown = [
  { name: "Spanish Super Cup", value: 13 },
  { name: "Copa del Rey", value: 9 },
  { name: "Club World Cup", value: 4 },
  { name: "European Super Cup", value: 3 },
  { name: "Champions League", value: 2 },
];

const thirtyGoalSeasons = [
  "08/09", "09/10", "10/11", "11/12", "12/13", "13/14", "14/15",
  "15/16", "16/17", "17/18", "18/19", "19/20", "20/21",
];

const barcaTrophies = [
  { name: "La Liga", value: 10 },
  { name: "Spanish Super Cup", value: 8 },
  { name: "Copa del Rey", value: 7 },
  { name: "Champions League", value: 4 },
  { name: "European Super Cup", value: 3 },
  { name: "Club World Cup", value: 3 },
];

const worldCupScoringStages = [
  { stage: "Group stage", years: "2006 → 2026" },
  { stage: "Round of 16", years: "2022 · 2026" },
  { stage: "Quarter-final", years: "2022" },
  { stage: "Semi-final", years: "2022" },
  { stage: "Final", years: "2022" },
];

const worldXiYears = Array.from({ length: 17 }, (_, index) => 2007 + index);
const u20KnockoutRun = [
  { round: "Round of 16", opponent: "Colombia", goals: 1 },
  { round: "Quarter-final", opponent: "Spain", goals: 1 },
  { round: "Semi-final", opponent: "Brazil", goals: 1 },
  { round: "Final", opponent: "Nigeria", goals: 2 },
];
const argentinaHonours = [
  { year: "2005", name: "U-20 World Cup", tier: "Youth world" },
  { year: "2008", name: "Olympic gold", tier: "Olympic" },
  { year: "2021", name: "Copa América", tier: "Continental" },
  { year: "2022", name: "Finalissima", tier: "Intercontinental" },
  { year: "2022", name: "World Cup", tier: "Senior world" },
  { year: "2024", name: "Copa América", tier: "Continental" },
];
const championsLeagueSixty = [
  { name: "Lionel Messi", matches: 80 },
  { name: "Robert Lewandowski", matches: 85 },
  { name: "Kylian Mbappé", matches: 89 },
  { name: "Cristiano Ronaldo", matches: 98 },
];
const copaAmericaEditions = [
  { year: "2007", matches: 6, finish: "Final" },
  { year: "2011", matches: 4, finish: "Quarter-final" },
  { year: "2015", matches: 6, finish: "Final" },
  { year: "2016", matches: 5, finish: "Final" },
  { year: "2019", matches: 6, finish: "Third" },
  { year: "2021", matches: 7, finish: "Champion" },
  { year: "2024", matches: 5, finish: "Champion" },
];
const qualifyingLeaders = [
  { name: "Lionel Messi", goals: 36 },
  { name: "Luis Suárez", goals: 29 },
  { name: "Marcelo Martins", goals: 22 },
];
const qualifyingCampaigns = [
  { cycle: "2006", goals: 0, games: 3 },
  { cycle: "2010", goals: 4, games: 18 },
  { cycle: "2014", goals: 10, games: 14 },
  { cycle: "2018", goals: 7, games: 10 },
  { cycle: "2022", goals: 7, games: 15 },
  { cycle: "2026", goals: 8, games: 12, winner: true },
];
const careerAssistBreakdown = [
  { team: "Barcelona", assists: 269 },
  { team: "Argentina", assists: 60 },
  { team: "Paris Saint-Germain", assists: 34 },
  { team: "Inter Miami", assists: 37 },
];
const decadeDribbleLeaders = [
  { name: "Lionel Messi", dribbles: 1482 },
  { name: "Iker Muniain", dribbles: 567 },
];
const editionPlateCount = edition.plateCount;

const filters: { id: Dossier; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "club", label: "Club" },
  { id: "argentina", label: "Argentina" },
  { id: "creation", label: "Creation" },
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
          <span>Vol. {edition.volume}</span>
          <span>{edition.publicationDate}</span>
          <span>{editionPlateCount} plates, audited</span>
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
        <span>Index of {editionPlateCount} plates</span>
        <a href="#calendar-title"><b>01</b> Scoring anomaly</a>
        <a href="#barca-title"><b>02</b> Barcelona</a>
        <a href="#age-title"><b>04</b> Europe</a>
        <a href="#world-title"><b>05</b> World Cup</a>
        <a href="#late-title"><b>10</b> Late career</a>
        <a href="#awards-title"><b>11</b> Awards</a>
        <a href="#career-assists-title"><b>45</b> Creation</a>
        <a href="#dribble-title"><b>46</b> Dribbling</a>
        <a href="#world-golden-ball-title"><b>47</b> World Cup awards</a>
        <a href="#argentina-honours-title"><b>41</b> Argentina honours</a>
        <a href="#copa-career-title"><b>43</b> Copa América</a>
        <a href="#qualifying-title"><b>44</b> Qualifying</a>
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
          <span>Plate 05 · {wcDossierLabel}</span>
          <h2 id="world-title">The World Cup, rewritten at 39</h2>
          <a href={sources.worldCup} target="_blank" rel="noreferrer">FIFA · {wcAuditShort} ↗</a>
        </div>
        <div className="world-grid">
          <div className="world-lead"><strong>{wcCareer.goals}</strong><span>World Cup goals</span><p>All-time record</p></div>
          <div><strong>{wcCareer.appearances}</strong><span>appearances</span><p>All-time record</p></div>
          <div><strong>{wcCareer.wins}</strong><span>match wins</span><p>All-time record</p></div>
          <div><strong>{wcCareer.knockoutAssists}</strong><span>knockout assists</span><p>All-time record</p></div>
          <div><strong>{wcCareer.assistedEditions}</strong><span>tournaments assisted in</span><p>Only player</p></div>
          <div><strong>{wcCareer.minutes.toLocaleString("en-US")}</strong><span>minutes played</span><p>All-time record</p></div>
        </div>
        <div className="world-span">
          <div><strong>{wcCareer.firstLatestGoalSpan}</strong><span>between his first and latest World Cup goals · record</span></div>
          <div><strong>Teens · 20s · 30s</strong><span>the only player to score across all three age decades</span></div>
        </div>
        <p className="live-note">{wcIsInProgress ? "Live-stat warning: the 2026 tournament was still in progress when this plate was audited." : "Final-tournament dossier."} Figures above follow FIFA’s {wcAuditLabel} update.</p>
      </section>

      <section className="plate live-2026-plate" aria-labelledby="live-2026-title">
        <div className="plate-heading inverse">
          <span>Plate 05A · {wcIsInProgress ? "tournament checkpoint" : "final tournament"}</span>
          <h2 id="live-2026-title">Thirty-nine. Still setting the pace.</h2>
          <a href={sources.worldCup2026} target="_blank" rel="noreferrer">FIFA · {wcAuditShort} ↗</a>
        </div>
        <div className="live-2026-equation" role="img" aria-label={`At the ${wcAuditLabel} checkpoint Messi had ${wcTournament.goals} goals and ${wcTournament.assists} assists, making ${wcTournament.contributions} goal contributions in ${wcTournament.matches} World Cup matches`}>
          <div><strong>{wcTournament.goals}</strong><span>goals</span></div>
          <b>+</b>
          <div><strong>{wcTournament.assists}</strong><span>assists</span></div>
          <b>=</b>
          <div className="live-2026-total"><strong>{wcTournament.contributions}</strong><span>goal contributions</span></div>
        </div>
        <div className="live-2026-footer">
          <div><strong>{wcTournament.matches}</strong><span>matches</span></div>
          <div><strong>{wcTournament.displayedMinutes}</strong><span>minutes</span></div>
          <div><strong>{wcTournament.minutesPerContribution}</strong><span>minutes per contribution</span></div>
          <p>{wcIsInProgress ? "FIFA listed Messi first in the Golden Boot race at this checkpoint. The final had not yet been played, so this is a dated snapshot—not a finished tournament total." : "FIFA’s completed-tournament table supplies the final totals in this snapshot."}</p>
        </div>
        <div className="live-2026-records">
          <div><strong>38 years · 357 days</strong><span>oldest World Cup hat-trick scorer</span><p>Three against Algeria; the previous record was 33 years, 130 days.</p></div>
          <div><strong>{wcTournament.playerOfMatchAwards}</strong><span>Player of the Match awards in 2026</span><p>A single-edition record; {wcCareer.playerOfMatchAwards} across his World Cup career is also unequalled.</p></div>
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
        <div className="decade-contributions">
          <div className="decade-contribution-intro">
            <span>La Liga · 2010/11 decade analysis</span>
            <strong>487</strong>
            <p>Messi goals + assists across 330 appearances</p>
            <a href={sources.decadeAnalysis} target="_blank" rel="noreferrer">FC Barcelona comparison ↗</a>
          </div>
          <div className="decade-contribution-race" role="img" aria-label="La Liga decade goal contributions in FC Barcelona's analysis: Lionel Messi 350 goals plus 137 assists equals 487; Cristiano Ronaldo 285 goals plus 80 assists equals 365">
            {decadeLeagueContributions.map((player) => (
              <div key={player.name}>
                <span>{player.name}</span>
                <i>
                  <b style={{ width: `${(player.goals / 487) * 100}%` }}><em>{player.goals} G</em></b>
                  <b className="assists" style={{ width: `${(player.assists / 487) * 100}%` }}><em>{player.assists} A</em></b>
                </i>
                <strong>{player.total}</strong>
              </div>
            ))}
            <p><strong>+122</strong><span>direct contributions beyond second place in the same analysis</span></p>
          </div>
        </div>
        <p className="decade-note">Calendar totals combine Barcelona and Argentina. The contribution comparison is a separate La Liga dataset beginning in 2010/11; both panels follow their linked FC Barcelona analyses.</p>
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
        <div className="award-sweep" role="img" aria-label="In the 2009/10 season, Messi became the only player to win the Ballon d'Or, FIFA World Player, Pichichi Trophy and European Golden Shoe in the same season">
          <div className="award-sweep-lead">
            <span>2009/10 · synchronized sweep</span>
            <strong>4 / 4</strong>
            <p>Four major individual honours. One season. The only player to complete the set.</p>
            <a href={sources.barca} target="_blank" rel="noreferrer">FC Barcelona record inventory ↗</a>
          </div>
          <div className="award-sweep-list">
            {["Ballon d’Or", "FIFA World Player", "Pichichi Trophy", "European Golden Shoe"].map((award, index) => (
              <div key={award}><b>{String(index + 1).padStart(2, "0")}</b><span>{award}</span><strong>Won</strong></div>
            ))}
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
          <div>
            <strong>132</strong>
            <span>UEFA club goals</span>
            <small><a href={sources.uefaRecords} target="_blank" rel="noreferrer">123 for Barcelona · single-club record ↗</a></small>
          </div>
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
          <span>Plate 18 · {wcIsInProgress ? "live margins" : "final margins"}</span>
          <h2 id="world-gap-title">“First” undersells the distance.</h2>
          <a href={sources.worldCup} target="_blank" rel="noreferrer">FIFA · {wcAuditShort} ↗</a>
        </div>
        <div className="world-gap-table" role="img" aria-label={`World Cup record margins: Messi ${wcCareer.goals} goals to previous record ${wcComparators.previousGoalRecord}, ${wcCareer.wins} wins to previous record ${wcComparators.previousWinRecord}, ${wcCareer.captainAppearances} captain appearances to next player ${wcComparators.nextCaptainAppearances}, and assists in ${wcCareer.assistedEditions} editions to next-best ${wcComparators.nextAssistedEditions}`}>
          {[
            { label: "World Cup goals", messi: wcCareer.goals, other: wcComparators.previousGoalRecord, otherLabel: "old record · Klose", suffix: `+${wcCareer.goals - wcComparators.previousGoalRecord}` },
            { label: "World Cup wins", messi: wcCareer.wins, other: wcComparators.previousWinRecord, otherLabel: "old record · Klose", suffix: `+${wcCareer.wins - wcComparators.previousWinRecord}` },
            { label: "Appearances as captain", messi: wcCareer.captainAppearances, other: wcComparators.nextCaptainAppearances, otherLabel: "next · Márquez", suffix: `+${wcCareer.captainAppearances - wcComparators.nextCaptainAppearances}` },
            { label: "Editions with an assist", messi: wcCareer.assistedEditions, other: wcComparators.nextAssistedEditions, otherLabel: "next-best group", suffix: `${wcCareer.assistedEditions / wcComparators.nextAssistedEditions}×` },
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
        <p className="world-gap-note">The comparison target changes by row: “old record” where Messi surpassed a prior mark, “next” where the active leaderboard matters. {wcIsInProgress ? "Tournament figures were still live at audit time." : "Tournament figures reflect FIFA’s completed-event audit."}</p>
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
          <span>Plate 29 · {wcDossierLabel}</span>
          <h2 id="distance-title">The penalty area was optional.</h2>
          <a href={sources.worldCup} target="_blank" rel="noreferrer">FIFA · {wcAuditShort} ↗</a>
        </div>
        <div className="distance-layout">
          <div className="distance-total"><strong>{wcCareer.outsideAreaGoals}</strong><span>World Cup goals from outside the box</span><p>tournament record</p></div>
          <div className="distance-comparison">
            <div><span>Lionel Messi</span><i style={{ width: "100%" }} /><strong>{wcCareer.outsideAreaGoals}</strong></div>
            <div><span>Rivellino · old record</span><i style={{ width: `${(wcComparators.previousOutsideAreaGoals / wcCareer.outsideAreaGoals) * 100}%` }} /><strong>{wcComparators.previousOutsideAreaGoals}</strong></div>
            <p><strong>+{wcCareer.outsideAreaGoals - wcComparators.previousOutsideAreaGoals} · {((wcCareer.outsideAreaGoals / wcComparators.previousOutsideAreaGoals - 1) * 100).toFixed(0)}% above</strong><span>the previous distance-scoring mark</span></p>
          </div>
        </div>
        <div className="distance-share"><strong>{wcCareer.outsideAreaGoals} ÷ {wcCareer.goals} = {((wcCareer.outsideAreaGoals / wcCareer.goals) * 100).toFixed(1)}%</strong><p>One in every three Messi World Cup goals has come from outside the area.</p><span>Live career total through {wcAuditLabel}</span></div>
      </section>

      <section className="plate semifinal-age-plate" aria-labelledby="semifinal-age-title">
        <div className="plate-heading">
          <span>Plate 30 · {wcDossierLabel}</span>
          <h2 id="semifinal-age-title">The semi-final had never seen this age.</h2>
          <a href={sources.semiFinal2026} target="_blank" rel="noreferrer">FIFA · 15 Jul 2026 ↗</a>
        </div>
        <div className="semifinal-age-layout">
          <div className="semifinal-age-total"><strong>39</strong><span>years · 21 days</span><p>oldest outfield player in a World Cup semi-final</p></div>
          <div className="semifinal-age-study" role="img" aria-label="Messi was 39 years and 21 days old in the 2026 World Cup semi-final, compared with the previous record of 37 years and 236 days shared by Fritz Walter and Gunnar Gren">
            <div className="semifinal-age-bar messi"><span>Lionel Messi · 2026</span><i style={{ width: "100%" }} /><strong>39y 21d</strong></div>
            <div className="semifinal-age-bar prior"><span>Walter / Gren · 1958</span><i style={{ width: `${((37 * 365 + 236) / (39 * 365 + 21)) * 100}%` }} /><strong>37y 236d</strong></div>
            <div className="semifinal-age-gap"><strong>More than a year</strong><span>older than the previous outfield-player benchmark</span></div>
          </div>
        </div>
        <p className="semifinal-age-note">The prior mark had stood since Fritz Walter and Gunnar Gren faced each other in the 1958 semi-final. Messi also received Player of the Match against England.</p>
      </section>

      <section className="plate six-cups-plate" aria-labelledby="six-cups-title">
        <div className="plate-heading inverse">
          <span>Plate 31 · {wcDossierLabel}</span>
          <h2 id="six-cups-title">Six World Cups. No empty columns.</h2>
          <a href={sources.worldCup} target="_blank" rel="noreferrer">FIFA · {wcAuditShort} ↗</a>
        </div>
        <div className="six-cups-summary">
          <div><strong>{wcCareer.editionsPlayed}</strong><span>World Cups played</span><p>joint record</p></div>
          <div><strong>{wcCareer.assistedEditions}</strong><span>World Cups with an assist</span><p>only player</p></div>
          <div><strong>{wcCareer.goalscoringEditions}</strong><span>World Cups with a goal</span><p>Argentina record</p></div>
        </div>
        <div className="six-cups-grid" role="img" aria-label="Messi played and assisted in the 2006, 2010, 2014, 2018, 2022 and 2026 World Cups, and scored in every one except 2010">
          {[2006, 2010, 2014, 2018, 2022, 2026].map((year) => (
            <div key={year}>
              <strong>{year}</strong>
              <span className="cup-mark assist">A</span>
              <span className={year === 2010 ? "cup-mark goal empty" : "cup-mark goal"}>{year === 2010 ? "—" : "G"}</span>
            </div>
          ))}
        </div>
        <div className="six-cups-legend"><span><i className="assist" />A · assist</span><span><i className="goal" />G · goal</span><p>Every edition contains a direct contribution; five contain both.</p></div>
      </section>

      <section className="plate world-streak-plate" aria-labelledby="world-streak-title">
        <div className="plate-heading">
          <span>Plate 32 · {wcDossierLabel}</span>
          <h2 id="world-streak-title">Nine World Cup matches. Nine scoresheets.</h2>
          <a href={sources.uefaRecords} target="_blank" rel="noreferrer">UEFA · 16 Jul 2026 ↗</a>
        </div>
        <div className="world-streak-summary">
          <div><strong>{wcCareer.goalscoringStreak}</strong><span>consecutive World Cup matches scoring</span><p>tournament record</p></div>
          <div><strong>13</strong><span>goals inside the streak</span><p>five in 2022 · eight in 2026</p></div>
          <div><strong>1.44</strong><span>goals per match</span><p>derived across the nine</p></div>
        </div>
        <div className="world-streak-run" role="img" aria-label="Messi scored in nine consecutive World Cup matches: the 2022 round of 16, quarter-final, semi-final and final, then three 2026 group matches, the round of 32 and round of 16, scoring 13 goals total">
          {[
            ["2022", "R16", "1"], ["2022", "QF", "1"], ["2022", "SF", "1"], ["2022", "Final", "2"],
            ["2026", "Group", "3"], ["2026", "Group", "2"], ["2026", "Group", "1"], ["2026", "R32", "1"], ["2026", "R16", "1"],
          ].map(([year, stage, goals], index) => (
            <div className={year === "2026" ? "current" : "prior"} key={`${year}-${stage}-${index}`}>
              <span>{year} · {stage}</span><strong>{goals}</strong><b>{Number(goals) === 1 ? "goal" : "goals"}</b>
            </div>
          ))}
        </div>
        <p className="world-streak-note">The run begins with every knockout round of Argentina’s 2022 title and continues through the first five matches of 2026. Two tournament formats; no blank match between them.</p>
      </section>

      <section className="plate six-in-half-plate" aria-labelledby="six-in-half-title">
        <div className="plate-heading inverse">
          <span>Plate 33</span>
          <h2 id="six-in-half-title">One half. Six goal contributions.</h2>
          <a href={sources.mlsSix} target="_blank" rel="noreferrer">Major League Soccer ↗</a>
        </div>
        <div className="six-in-half-summary">
          <div className="six-in-half-total"><strong>6</strong><span>contributions in one match</span><p>MLS record</p></div>
          <div className="six-in-half-equation"><div><strong>1</strong><span>goal</span></div><b>+</b><div><strong>5</strong><span>assists · MLS record</span></div><b>=</b><div><strong>6</strong><span>total · MLS record</span></div></div>
        </div>
        <div className="half-timeline" role="img" aria-label="All six Messi goal contributions against New York Red Bulls came in the second half: assists in minutes 48, 62, 69, 75 and 81, plus a goal in minute 50">
          <div className="half-axis"><span>46′</span><span>60′</span><span>75′</span><span>90′</span></div>
          {[
            { minute: 48, type: "A" }, { minute: 50, type: "G" }, { minute: 62, type: "A" },
            { minute: 69, type: "A" }, { minute: 75, type: "A" }, { minute: 81, type: "A" },
          ].map((event, index) => (
            <span className={event.type === "G" ? "half-event goal" : "half-event assist"} style={{ left: `${((event.minute - 45) / 45) * 100}%` }} key={`${event.minute}-${index}`}><b>{event.type}</b><small>{event.minute}′</small></span>
          ))}
        </div>
        <div className="six-in-half-rate"><strong>45 ÷ 6 = 7.5 minutes</strong><p>One direct contribution every 7.5 minutes of the second half.</p><span>Inter Miami 6–2 New York Red Bulls · 4 May 2024</span></div>
      </section>

      <section className="plate mls-two-year-plate" aria-labelledby="mls-two-year-title">
        <div className="plate-heading">
          <span>Plate 34</span>
          <h2 id="mls-two-year-title">Two MVP seasons. Eighty-four contributions.</h2>
          <a href={sources.mlsMvp} target="_blank" rel="noreferrer">Major League Soccer ↗</a>
        </div>
        <div className="mls-two-year-seasons">
          <div><span>2024 regular season</span><strong>20G + 16A</strong><b>36</b><small>contributions · 19 matches</small><a href={sources.mlsMvp2024} target="_blank" rel="noreferrer">Season source ↗</a></div>
          <div><span>2025 regular season</span><strong>29G + 19A</strong><b>48</b><small>contributions · 28 matches</small><a href={sources.mlsMvp} target="_blank" rel="noreferrer">Season source ↗</a></div>
        </div>
        <div className="mls-two-year-total">
          <div><strong>49</strong><span>goals</span></div><b>+</b><div><strong>35</strong><span>assists</span></div><b>=</b><div className="mls-two-year-lead"><strong>84</strong><span>contributions</span></div>
        </div>
        <div className="mls-two-year-rate"><strong>84 ÷ 47 = 1.79</strong><p>goal contributions per regular-season appearance across the two MVP campaigns</p><span>First player in MLS history to win the award back to back</span></div>
      </section>

      <section className="plate finals-plate" aria-labelledby="finals-title">
        <div className="plate-heading inverse">
          <span>Plate 35 · high stakes</span>
          <h2 id="finals-title">The trophy match got thirty-one goals.</h2>
          <a href={sources.finalGoals} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="finals-layout">
          <div className="finals-total"><strong>31</strong><span>goals in finals for Barcelona</span><p>across five competitions</p></div>
          <div className="finals-breakdown" role="img" aria-label="Messi's 31 goals in finals for Barcelona: 13 in the Spanish Super Cup, 9 in the Copa del Rey, 4 in the Club World Cup, 3 in the European Super Cup and 2 in the Champions League">
            {finalGoalsBreakdown.map((item) => (
              <div key={item.name}>
                <span>{item.name}</span>
                <i style={{ width: `${(item.value / 13) * 100}%` }} />
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="finals-proof">
          <strong>13 + 9 + 4 + 3 + 2 = 31</strong>
          <p>The stage changed. The scoring habit did not.</p>
          <span><a href={sources.finalsBreakdown} target="_blank" rel="noreferrer">29-goal breakdown ↗</a><a href={sources.copaFinal2021} target="_blank" rel="noreferrer">2021 final brace ↗</a></span>
        </div>
      </section>

      <section className="plate thirty-run-plate" aria-labelledby="thirty-run-title">
        <div className="plate-heading">
          <span>Plate 36 · production floor</span>
          <h2 id="thirty-run-title">Thirteen seasons. The floor was thirty.</h2>
          <a href={sources.thirtyGoalRun} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="thirty-run-summary">
          <div><strong>13</strong><span>consecutive 30-goal seasons</span></div>
          <p>From the treble-winning 2008/09 campaign through 2020/21, every season cleared the same elite threshold.</p>
          <div><strong>390</strong><span>minimum goals required</span></div>
        </div>
        <div className="thirty-run-track" role="img" aria-label="Thirteen consecutive Barcelona seasons with at least 30 Messi goals, from 2008-09 through 2020-21; the first had 38 and the 2011-12 peak had 73">
          {thirtyGoalSeasons.map((season) => (
            <div className={season === "11/12" ? "peak" : ""} key={season}>
              <span>{season}</span>
              <strong>{season === "11/12" ? "73" : season === "08/09" ? "38" : "30+"}</strong>
            </div>
          ))}
        </div>
        <div className="thirty-run-proof"><strong>13 × 30 = 390</strong><p>That is the minimum entry fee for the streak, not his actual total.</p><span>Peak: 73 official goals · 2011/12</span></div>
      </section>

      <section className="plate trophy-plate" aria-labelledby="trophy-title">
        <div className="plate-heading inverse">
          <span>Plate 37 · honours</span>
          <h2 id="trophy-title">Seventeen seasons. Thirty-five trophies.</h2>
          <a href={sources.finalGoals} target="_blank" rel="noreferrer">FC Barcelona ↗</a>
        </div>
        <div className="trophy-layout">
          <div className="trophy-total"><strong>35</strong><span>team trophies with Barcelona</span><p>a club-record haul</p></div>
          <div className="trophy-breakdown" role="img" aria-label="Messi's 35 Barcelona trophies: 10 La Liga, 8 Spanish Super Cups, 7 Copas del Rey, 4 Champions Leagues, 3 European Super Cups and 3 Club World Cups">
            {barcaTrophies.map((item) => (
              <div key={item.name}>
                <strong>{item.value}</strong>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="trophy-proof"><strong>35 ÷ 17 = 2.06</strong><p>trophies per Barcelona season</p><span>One trophy per 22.2 appearances across 778 games</span></div>
      </section>

      <section className="plate world-stage-plate" aria-labelledby="world-stage-title">
        <div className="plate-heading">
          <span>Plate 38 · stage coverage</span>
          <h2 id="world-stage-title">One player. Every World Cup stage.</h2>
          <a href={sources.uefaRecords} target="_blank" rel="noreferrer">UEFA · 16 Jul 2026 ↗</a>
        </div>
        <div className="world-stage-route" role="img" aria-label="Messi is the only player to score in the World Cup group stage, round of 16, quarter-final, semi-final and final">
          {worldCupScoringStages.map((item, index) => (
            <div key={item.stage}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <strong>{item.stage}</strong>
              <span>{item.years}</span>
            </div>
          ))}
        </div>
        <div className="world-stage-proof"><strong>5 / 5</strong><p>The only player to score at every traditional stage.</p><span>New 2026 round of 32? Scored there too.</span></div>
      </section>

      <section className="plate world-xi-plate" aria-labelledby="world-xi-title">
        <div className="plate-heading inverse">
          <span>Plate 39 · peer recognition</span>
          <h2 id="world-xi-title">Seventeen World XIs. No missing year.</h2>
          <a href={sources.worldXi} target="_blank" rel="noreferrer">FIFA ↗</a>
        </div>
        <div className="world-xi-summary">
          <strong>17</strong>
          <div><span>FIFA FIFPRO Men’s World 11 selections</span><p>2007 through 2023, inclusive</p></div>
        </div>
        <div className="world-xi-run" role="img" aria-label="Messi was selected to the FIFA FIFPRO Men's World 11 in every year from 2007 through 2023, seventeen consecutive editions">
          {worldXiYears.map((year) => <div key={year}><span>{year}</span><strong>XI</strong></div>)}
        </div>
        <div className="world-xi-proof"><strong>2023 − 2007 + 1 = 17</strong><p>Seventeen consecutive annual selections.</p><span>Age 20 → age 36</span></div>
      </section>

      <section className="plate u20-plate" aria-labelledby="u20-title">
        <div className="plate-heading">
          <span>Plate 40 · prologue</span>
          <h2 id="u20-title">Before the senior era, he swept the tournament.</h2>
          <a href={sources.u20WorldCup} target="_blank" rel="noreferrer">FIFA U-20 archive ↗</a>
        </div>
        <div className="u20-sweep" role="img" aria-label="At the 2005 FIFA U-20 World Cup, Messi won the team title, Golden Ball and Golden Boot with six goals, scoring in every knockout round">
          <div><strong>01</strong><span>World champion</span></div>
          <div><strong>02</strong><span>Golden Ball</span></div>
          <div><strong>03</strong><span>Golden Boot</span></div>
        </div>
        <div className="u20-knockout" role="img" aria-label="Messi scored one goal against Colombia in the round of 16, one against Spain in the quarter-final, one against Brazil in the semi-final and two against Nigeria in the final">
          {u20KnockoutRun.map((match) => (
            <div key={match.round}>
              <span>{match.round}</span>
              <strong>{match.goals}</strong>
              <p>{match.opponent}</p>
            </div>
          ))}
        </div>
        <div className="u20-proof"><strong>4 / 4</strong><p>Scored in every knockout round: five there, six in the tournament.</p><span>Golden Boot · Golden Ball · world champion</span></div>
      </section>

      <section className="plate argentina-honours-plate" aria-labelledby="argentina-honours-title">
        <div className="plate-heading inverse">
          <span>Plate 41 · Argentina honours</span>
          <h2 id="argentina-honours-title">The youth world title was only the first one.</h2>
          <a href={sources.fifaTrophies} target="_blank" rel="noreferrer">FIFA honours inventory ↗</a>
        </div>
        <div className="argentina-honours-summary">
          <strong>6</strong>
          <div><span>team trophies with Argentina</span><p>Five competitions. Youth, Olympic, continental, intercontinental and senior world champions.</p></div>
        </div>
        <div className="argentina-honours-run" role="img" aria-label="Messi won six Argentina trophies: the 2005 U-20 World Cup, 2008 Olympic gold, 2021 Copa America, 2022 Finalissima, 2022 World Cup and 2024 Copa America">
          {argentinaHonours.map((honour, index) => (
            <div key={`${honour.year}-${honour.name}`}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <strong>{honour.year}</strong>
              <span>{honour.name}</span>
              <p>{honour.tier}</p>
            </div>
          ))}
        </div>
        <div className="argentina-honours-proof"><strong>2024 − 2005 = 19</strong><p>Nineteen years from the first Argentina trophy to the latest.</p><span><a href={sources.olympicWorldDouble} target="_blank" rel="noreferrer">1 of 15 Olympic + World Cup double winners ↗</a></span></div>
      </section>

      <section className="plate sixty-goal-plate" aria-labelledby="sixty-goal-title">
        <div className="plate-heading">
          <span>Plate 42 · scoring velocity</span>
          <h2 id="sixty-goal-title">Sixty goals. Eighty matches. Two records.</h2>
          <a href={sources.championsLeagueSixty} target="_blank" rel="noreferrer">UEFA · updated 1 Jun 2026 ↗</a>
        </div>
        <div className="sixty-goal-lead">
          <strong>80</strong>
          <div><span>matches to 60 Champions League goals</span><p>The quickest anyone reached the milestone—and, at 26 years 86 days, the youngest.</p></div>
        </div>
        <div className="sixty-goal-race" role="img" aria-label="Matches needed to reach 60 Champions League goals: Lionel Messi 80, Robert Lewandowski 85, Kylian Mbappe 89 and Cristiano Ronaldo 98. Messi was five, nine and eighteen matches quicker respectively.">
          {championsLeagueSixty.map((player) => (
            <div className={player.name === "Lionel Messi" ? "leader" : ""} key={player.name}>
              <span>{player.name}</span>
              <i><b style={{ width: `${(player.matches / 100) * 100}%` }} /></i>
              <strong>{player.matches}</strong>
              <em>{player.matches === 80 ? "record" : `+${player.matches - 80}`}</em>
            </div>
          ))}
        </div>
        <div className="sixty-goal-proof"><strong>60 ÷ 80 = 0.75</strong><p>Three Champions League goals every four matches to the milestone.</p><span>Current through UEFA’s 1 June 2026 update</span></div>
      </section>

      <section className="plate copa-career-plate" aria-labelledby="copa-career-title">
        <div className="plate-heading inverse">
          <span>Plate 43 · continental longevity</span>
          <h2 id="copa-career-title">The 71-year record fell. Then he added four more.</h2>
          <a href={sources.copaAppearances} target="_blank" rel="noreferrer">CONMEBOL Copa América ↗</a>
        </div>
        <div className="copa-record-race" role="img" aria-label="Copa America appearance record: Lionel Messi 39 matches, five more than Sergio Livingstone's previous record of 34">
          <div className="copa-record-lead"><span>Lionel Messi</span><i><b style={{ width: "100%" }} /></i><strong>39</strong></div>
          <div><span>Sergio Livingstone</span><i><b style={{ width: `${(34 / 39) * 100}%` }} /></i><strong>34</strong></div>
          <p><strong>+5</strong><span>beyond a benchmark set in 1953</span></p>
        </div>
        <div className="copa-edition-run" role="img" aria-label="Messi's 39 Copa America matches by edition: six in 2007, four in 2011, six in 2015, five in 2016, six in 2019, seven in 2021 and five in 2024. He reached five finals and won the last two.">
          {copaAmericaEditions.map((edition) => (
            <div className={edition.finish === "Champion" ? "champion" : ""} key={edition.year}>
              <span>{edition.year}</span>
              <strong>{edition.matches}</strong>
              <p>{edition.finish}</p>
            </div>
          ))}
        </div>
        <div className="copa-career-proof"><strong>6 + 4 + 6 + 5 + 6 + 7 + 5 = 39</strong><p>Seven editions. Five finals. Champion in the last two.</p><span><a href={sources.copaFinals} target="_blank" rel="noreferrer">Finals record verified by CONMEBOL ↗</a></span></div>
      </section>

      <section className="plate qualifying-plate" aria-labelledby="qualifying-title">
        <div className="plate-heading">
          <span>Plate 44 · qualification marathon</span>
          <h2 id="qualifying-title">Thirty-six goals across six roads to the World Cup.</h2>
          <a href={sources.qualifyingScorers} target="_blank" rel="noreferrer">FIFA qualifying archive ↗</a>
        </div>
        <div className="qualifying-leaders" role="img" aria-label="All-time South American World Cup qualifying goals: Lionel Messi 36, Luis Suarez 29 and Marcelo Martins 22">
          {qualifyingLeaders.map((player) => (
            <div className={player.name === "Lionel Messi" ? "leader" : ""} key={player.name}>
              <span>{player.name}</span>
              <i><b style={{ width: `${(player.goals / 36) * 100}%` }} /></i>
              <strong>{player.goals}</strong>
              <em>{player.goals === 36 ? "record" : `−${36 - player.goals}`}</em>
            </div>
          ))}
        </div>
        <div className="qualifying-campaigns" role="img" aria-label="Messi's South American qualifying goals and games by World Cup cycle: zero in three games for 2006, four in 18 for 2010, ten in 14 for 2014, seven in 10 for 2018, seven in 15 for 2022 and eight in 12 for 2026, when he led the scoring table for the first time">
          {qualifyingCampaigns.map((campaign) => (
            <div className={campaign.winner ? "winner" : ""} key={campaign.cycle}>
              <span>Road to {campaign.cycle}</span>
              <strong>{campaign.goals}</strong>
              <p>goals · {campaign.games} games</p>
              {campaign.winner ? <b>Top scorer</b> : null}
            </div>
          ))}
        </div>
        <div className="qualifying-proof"><strong>0 + 4 + 10 + 7 + 7 + 8 = 36</strong><p>CONMEBOL’s career leader—and, at 38, its 2026 campaign leader.</p><span>Seven goals clear of second place</span></div>
      </section>

      <section className="plate career-assists-plate" aria-labelledby="career-assists-title">
        <div className="plate-heading inverse">
          <span>Plate 45 · creation milestone</span>
          <h2 id="career-assists-title">Four hundred goals without taking the shot.</h2>
          <a href={sources.careerAssists400} target="_blank" rel="noreferrer">Major League Soccer ↗</a>
        </div>
        <div className="career-assists-lead">
          <strong>400</strong>
          <div><span>official career assists</span><p>The first footballer in MLS’s records to reach the milestone.</p></div>
        </div>
        <div className="assist-composition" role="img" aria-label="Messi's first 400 official career assists: 269 for Barcelona, 60 for Argentina, 34 for Paris Saint-Germain and 37 for Inter Miami">
          <div className="assist-stack" aria-hidden="true">
            {careerAssistBreakdown.map((item) => <i key={item.team} style={{ width: `${(item.assists / 400) * 100}%` }} />)}
          </div>
          <div className="assist-breakdown">
            {careerAssistBreakdown.map((item, index) => (
              <div key={item.team}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <strong>{item.assists}</strong>
                <span>{item.team}</span>
                <p>{((item.assists / 400) * 100).toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>
        <div className="career-assists-proof"><strong>269 + 60 + 34 + 37 = 400</strong><p>Four shirts. Nearly two decades of making somebody else the scorer.</p><span>Milestone reached 9 November 2025</span></div>
      </section>

      <section className="plate dribble-plate" aria-labelledby="dribble-title">
        <div className="plate-heading">
          <span>Plate 46 · ball carrying</span>
          <h2 id="dribble-title">First place was 915 dribbles away.</h2>
          <a href={sources.decadeAnalysis} target="_blank" rel="noreferrer">FC Barcelona decade analysis ↗</a>
        </div>
        <div className="dribble-layout">
          <div className="dribble-lead">
            <span>La Liga · Barça’s ten-season analysis</span>
            <strong>1,482</strong>
            <p>recorded dribbles by Lionel Messi across 330 appearances</p>
          </div>
          <div className="dribble-race" role="img" aria-label="La Liga dribbles in FC Barcelona's decade analysis: Lionel Messi 1,482 and second-place Iker Muniain 567, a gap of 915">
            {decadeDribbleLeaders.map((player) => (
              <div className={player.name === "Lionel Messi" ? "leader" : ""} key={player.name}>
                <span>{player.name}</span>
                <i><b style={{ width: `${(player.dribbles / 1482) * 100}%` }} /></i>
                <strong>{player.dribbles.toLocaleString("en-US")}</strong>
              </div>
            ))}
            <div className="dribble-margin"><strong>+915</strong><p>Messi’s advantage was 161.4% of the runner-up’s entire total.</p></div>
          </div>
        </div>
        <div className="dribble-proof"><strong>1,482 ÷ 330 = 4.49</strong><p>Recorded dribbles per appearance—and 2.61 for every one by second place.</p><span>Historical snapshot published 17 April 2020</span></div>
      </section>

      <section className="plate world-golden-ball-plate" aria-labelledby="world-golden-ball-title">
        <div className="plate-heading inverse">
          <span>Plate 47 · tournament influence</span>
          <h2 id="world-golden-ball-title">The Golden Ball had never found a repeat winner.</h2>
          <a href={sources.goldenBall} target="_blank" rel="noreferrer">FIFA record archive ↗</a>
        </div>
        <div className="world-golden-ball-lead">
          <div><strong>2</strong><span>World Cup Golden Balls</span><p>The first—and through 2022, only—player to win the tournament’s best-player award twice.</p></div>
          <div className="world-golden-ball-years" role="img" aria-label="Lionel Messi won FIFA World Cup Golden Balls eight years apart: in 2014 with four goals and one assist, and in 2022 with seven goals and three assists">
            <article>
              <span>Brazil · 2014</span>
              <strong>4 + 1</strong>
              <p>goals + assists</p>
              <ul>
                <li>Most dribbles</li>
                <li>Most chances created</li>
                <li>Most deliveries into the penalty area</li>
              </ul>
            </article>
            <b><span>8 years</span>→</b>
            <article>
              <span>Qatar · 2022</span>
              <strong>7 + 3</strong>
              <p>goals + assists</p>
              <ul>
                <li>Joint-most assists and key passes</li>
                <li>Most shots on target</li>
                <li>Every minute of the title run</li>
              </ul>
            </article>
          </div>
        </div>
        <div className="world-golden-ball-proof"><strong>5 → 10</strong><p>He doubled his direct goal contributions between his first and second award-winning World Cups.</p><span>2014 and 2022 · FIFA</span></div>
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
        <span>The Messi Index · Issue {edition.issue}</span>
        <p>The whole point is that this isn&apos;t normal.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
