import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const worldCup2026 = JSON.parse(
  await readFile(new URL("../data/live-world-cup-2026.json", import.meta.url), "utf8"),
);
const { career: wcCareer, tournament: wcTournament, comparators: wcComparators } = worldCup2026;

test("calendar-year anomaly reconciles", () => {
  assert.equal(79 + 12, 91);
  assert.equal(91 + 24, 115);
  assert.equal((91 / 69).toFixed(2), "1.32");
  assert.equal((366 / 91).toFixed(2), "4.02");
});

test("the 2010s total and mean reconcile", () => {
  const goals = [60, 59, 91, 45, 58, 52, 59, 54, 51, 50];
  assert.equal(goals.reduce((sum, value) => sum + value, 0), 579);
  assert.equal((579 / goals.length).toFixed(1), "57.9");
  assert.equal(goals.filter((value) => value >= 50).length, 9);
});

test("Barcelona competition anatomy sums to 672", () => {
  const breakdown = [474, 120, 56, 14, 5, 3];
  assert.equal(breakdown.reduce((sum, value) => sum + value, 0), 672);
  assert.equal(672 - 474, 198);
});

test("late-career production rates reconcile", () => {
  assert.equal(29 + 19, 48);
  assert.equal((48 / 28).toFixed(2), "1.71");
  assert.equal(wcTournament.goals + wcTournament.assists, wcTournament.contributions);
  assert.equal((wcTournament.displayedMinutes / wcTournament.contributions).toFixed(1), "51.7");
  assert.equal(wcTournament.minutesPerContribution, 51.6);
});

test("comparison gaps and pace translator reconcile", () => {
  assert.equal(672 - 232, 440);
  assert.equal((672 / 232).toFixed(2), "2.90");
  assert.equal(50 - 26, 24);
  assert.equal((50 / 26).toFixed(2), "1.92");
  assert.equal((672 / 60).toFixed(1), "11.2");
});

test("World Cup record margins reconcile at the live checkpoint", () => {
  assert.equal(wcCareer.goals - wcComparators.previousGoalRecord, 5);
  assert.equal(wcCareer.wins - wcComparators.previousWinRecord, 6);
  assert.equal(wcCareer.captainAppearances - wcComparators.nextCaptainAppearances, 9);
  assert.equal(wcCareer.assistedEditions / wcComparators.nextAssistedEditions, 2);
});

test("the 73-goal club season reconciles across six competitions", () => {
  const breakdown = [50, 14, 3, 3, 1, 2];
  assert.equal(breakdown.reduce((sum, value) => sum + value, 0), 73);
  assert.equal(73 - 50, 23);
  assert.equal(((50 / 73) * 100).toFixed(1), "68.5");
});

test("Barcelona multi-goal eruptions reconcile", () => {
  assert.equal(41 + 6 + 1, 48);
  assert.equal(41 * 3 + 6 * 4 + 1 * 5, 152);
  assert.equal(((152 / 672) * 100).toFixed(1), "22.6");
});

test("the single-club record margin reconciles", () => {
  assert.equal(672 - 643, 29);
  assert.equal((672 / 643).toFixed(3), "1.045");
});

test("Barcelona goal milestone acceleration reconciles", () => {
  const days = (Date.UTC(2011, 10, 1) - Date.UTC(2010, 0, 16)) / 86_400_000;
  assert.equal(days, 654);
  assert.equal((days / 100).toFixed(2), "6.54");
  assert.equal(672 - 200, 472);
});

test("Barcelona win volume reconciles", () => {
  assert.equal(542 - 476, 66);
  assert.equal(((542 / 778) * 100).toFixed(1), "69.7");
});

test("El Clásico goal composition reconciles", () => {
  assert.equal(18 + 6 + 2, 26);
  assert.deepEqual([18, 6, 2].map((value) => ((value / 26) * 100).toFixed(1)), ["69.2", "23.1", "7.7"]);
});

test("La Liga opponent breadth margin reconciles", () => {
  assert.equal(38 - 35, 3);
});

test("Argentina's 2022 calendar peak reconciles", () => {
  assert.equal((18 / 14).toFixed(2), "1.29");
  assert.equal(18 - 12, 6);
  assert.equal(((18 / 12 - 1) * 100).toFixed(0), "50");
});

test("the 2019/20 league contribution rate reconciles", () => {
  assert.equal(25 + 21, 46);
  assert.equal((46 / 33).toFixed(2), "1.39");
  assert.equal(21 - 20, 1);
});

test("World Cup goals from distance reconcile", () => {
  assert.equal(wcCareer.outsideAreaGoals - wcComparators.previousOutsideAreaGoals, 2);
  assert.equal(((wcCareer.outsideAreaGoals / wcComparators.previousOutsideAreaGoals - 1) * 100).toFixed(0), "40");
  assert.equal(((wcCareer.outsideAreaGoals / wcCareer.goals) * 100).toFixed(1), "33.3");
});

test("nine-match World Cup scoring streak reconciles", () => {
  const goals = [1, 1, 1, 2, 3, 2, 1, 1, 1];
  assert.equal(goals.length, 9);
  assert.equal(goals.reduce((sum, value) => sum + value, 0), 13);
  assert.equal((13 / 9).toFixed(2), "1.44");
});

test("six contributions in one MLS half reconcile", () => {
  assert.equal(1 + 5, 6);
  assert.equal((45 / 6).toFixed(1), "7.5");
});

test("back-to-back MLS MVP seasons reconcile", () => {
  assert.equal(20 + 29, 49);
  assert.equal(16 + 19, 35);
  assert.equal(36 + 48, 84);
  assert.equal(19 + 28, 47);
  assert.equal((84 / 47).toFixed(2), "1.79");
});

test("Barcelona final goals reconcile across five competitions", () => {
  const breakdown = [13, 9, 4, 3, 2];
  assert.equal(breakdown.reduce((sum, value) => sum + value, 0), 31);
  assert.equal(29 + 2, 31);
});

test("thirteen-season scoring floor reconciles", () => {
  assert.equal(13 * 30, 390);
  assert.equal(2021 - 2008, 13);
});

test("Barcelona trophy cabinet reconciles", () => {
  const trophies = [10, 8, 7, 4, 3, 3];
  assert.equal(trophies.reduce((sum, value) => sum + value, 0), 35);
  assert.equal((35 / 17).toFixed(2), "2.06");
  assert.equal((778 / 35).toFixed(1), "22.2");
});

test("seventeen consecutive World XI editions reconcile", () => {
  assert.equal(2023 - 2007 + 1, 17);
});

test("the U-20 knockout sweep reconciles", () => {
  const knockoutGoals = [1, 1, 1, 2];
  assert.equal(knockoutGoals.length, 4);
  assert.equal(knockoutGoals.reduce((sum, value) => sum + value, 0), 5);
  assert.equal(5 + 1, 6);
  assert.ok(knockoutGoals.every((value) => value > 0));
});

test("Argentina's six-trophy arc reconciles", () => {
  const honours = ["U20", "Olympic", "Copa", "Finalissima", "World Cup", "Copa"];
  assert.equal(honours.length, 6);
  assert.equal(new Set(honours).size, 5);
  assert.equal(2024 - 2005, 19);
});

test("the race to 60 Champions League goals reconciles", () => {
  const matches = [80, 85, 89, 98];
  assert.deepEqual(matches.slice(1).map((value) => value - matches[0]), [5, 9, 18]);
  assert.equal((60 / 80).toFixed(2), "0.75");
  assert.equal((80 / 60).toFixed(2), "1.33");
});
