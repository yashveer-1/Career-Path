import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateCompletionPercentage,
  generateCareerPath,
  getMotivationalMessage
} from "../src/services/careerPathService.js";

const analysis = {
  targetCareer: "AI Engineer",
  selectedSkills: ["Python", "Git"],
  missingSkills: ["Machine Learning", "Deep Learning", "Statistics"],
  readinessScore: 25
};

test("generates an actionable six-month career path", () => {
  const result = generateCareerPath(analysis, {
    interests: ["technology"],
    quizResults: { strengths: ["analytical thinking"] }
  });

  assert.equal(result.dailyTasks.length, 3);
  assert.equal(result.weeklyGoals.length, 4);
  assert.equal(result.monthlyMilestones.length, 6);
  assert.equal(result.monthlyMilestones.at(-1).title, "Internship applications");
  assert.deepEqual(result.contextUsed, ["quiz results", "student interests"]);
  assert.match(result.dailyTasks[0].title, /Machine Learning/);
});

test("uses readiness-specific motivation", () => {
  assert.match(getMotivationalMessage(39), /beginning/);
  assert.match(getMotivationalMessage(55), /strong progress/);
  assert.match(getMotivationalMessage(80), /internship-ready/);
});

test("calculates completion across all progress levels", () => {
  const progress = {
    dailyTasks: [{ completed: true }, { completed: false }],
    weeklyGoals: [{ completed: true }],
    monthlyMilestones: [{ completed: false }]
  };

  assert.equal(calculateCompletionPercentage(progress), 50);
});
