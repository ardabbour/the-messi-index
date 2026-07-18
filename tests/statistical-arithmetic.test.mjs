import assert from "node:assert/strict";
import test from "node:test";

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
  assert.equal(8 + 4, 12);
  assert.equal((620 / 12).toFixed(1), "51.7");
});

test("comparison gaps and pace translator reconcile", () => {
  assert.equal(672 - 232, 440);
  assert.equal((672 / 232).toFixed(2), "2.90");
  assert.equal(50 - 26, 24);
  assert.equal((50 / 26).toFixed(2), "1.92");
  assert.equal((672 / 60).toFixed(1), "11.2");
});

test("World Cup record margins reconcile at the live checkpoint", () => {
  assert.equal(21 - 16, 5);
  assert.equal(23 - 17, 6);
  assert.equal(26 - 17, 9);
  assert.equal(6 / 3, 2);
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
  assert.equal(7 - 5, 2);
  assert.equal(((7 / 5 - 1) * 100).toFixed(0), "40");
  assert.equal(((7 / 21) * 100).toFixed(1), "33.3");
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
