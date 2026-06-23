import assert from "node:assert/strict";
import test from "node:test";
import {
  analyzeSkillGap,
  getReadinessCategory
} from "../src/services/skillGapService.js";

test("calculates AI Engineer readiness and missing skills", () => {
  const result = analyzeSkillGap("AI Engineer", ["Python", "SQL", "Git"]);

  assert.equal(result.readinessScore, 38);
  assert.deepEqual(result.matchedSkills, ["Python", "SQL", "Git"]);
  assert.equal(result.missingSkills.length, 5);
  assert.equal(result.readinessCategory, "Beginner");
  assert.equal(result.resources.length, result.missingSkills.length);
});

test("normalizes skill casing and removes duplicates", () => {
  const result = analyzeSkillGap("Software Engineer", [
    "javascript",
    "JavaScript",
    " git "
  ]);

  assert.deepEqual(result.selectedSkills, ["JavaScript", "Git"]);
  assert.equal(result.readinessScore, 40);
});

test("uses the requested readiness boundaries", () => {
  assert.equal(getReadinessCategory(40), "Beginner");
  assert.equal(getReadinessCategory(41), "Intermediate");
  assert.equal(getReadinessCategory(70), "Intermediate");
  assert.equal(getReadinessCategory(71), "Advanced");
});
