import { careerSkills } from "../data/careerSkills.js";
import { skillCourses } from "../data/skillCourses.js";
import { AppError } from "../utils/AppError.js";

const normalize = (value) => value.trim().toLowerCase();

export function getReadinessCategory(score) {
  if (score <= 40) return "Beginner";
  if (score <= 70) return "Intermediate";
  return "Advanced";
}

export function generateRoadmap(career, missingSkills) {
  const learningSteps = missingSkills.map((skill, index) => ({
    month: index + 1,
    title: `Learn ${skill}`,
    description: `Build practical foundations in ${skill} with a focused course and weekly exercises.`,
    type: "learning"
  }));

  return [
    ...learningSteps,
    {
      month: learningSteps.length + 1,
      title: `Build a ${career} portfolio project`,
      description: "Combine your new skills in one documented project that demonstrates real-world ability.",
      type: "project"
    },
    {
      month: learningSteps.length + 2,
      title: "Internship and interview preparation",
      description: "Polish your portfolio, practise role-specific interviews, and begin targeted applications.",
      type: "career"
    }
  ];
}

export function generateRecommendations(category, career, missingSkills) {
  const categoryMessage = {
    Beginner: `Start with the fundamentals for ${career} and follow the roadmap one skill at a time.`,
    Intermediate: `You have a solid base for ${career}. Close the remaining gaps through hands-on projects.`,
    Advanced: `You are close to career-ready for ${career}. Focus on portfolio depth, interviews, and applications.`
  };

  const recommendations = [categoryMessage[category]];

  if (missingSkills.length > 0) {
    recommendations.push(
      `Prioritize ${missingSkills.slice(0, 3).join(", ")}${missingSkills.length > 3 ? " first" : ""}.`
    );
  } else {
    recommendations.push(
      "Your core skill coverage is complete; validate it with a substantial portfolio project."
    );
  }

  recommendations.push(
    "Re-run this analysis after completing roadmap milestones to measure your progress."
  );

  return recommendations;
}

export function analyzeSkillGap(career, selectedSkills = []) {
  const requiredSkills = careerSkills[career];

  if (!requiredSkills) {
    throw new AppError(`Career "${career}" is not supported`, 400);
  }

  const requiredByNormalizedName = new Map(
    requiredSkills.map((skill) => [normalize(skill), skill])
  );

  const canonicalSelectedSkills = [
    ...new Set(
      selectedSkills
        .filter((skill) => typeof skill === "string")
        .map((skill) => requiredByNormalizedName.get(normalize(skill)))
        .filter(Boolean)
    )
  ];

  const selectedSet = new Set(canonicalSelectedSkills);
  const matchedSkills = requiredSkills.filter((skill) => selectedSet.has(skill));
  const missingSkills = requiredSkills.filter((skill) => !selectedSet.has(skill));
  const readinessScore = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );
  const readinessCategory = getReadinessCategory(readinessScore);

  const resources = missingSkills.map((skill) => ({
    skill,
    ...skillCourses[skill]
  }));

  return {
    targetCareer: career,
    selectedSkills: canonicalSelectedSkills,
    matchedSkills,
    missingSkills,
    readinessScore,
    readinessCategory,
    roadmap: generateRoadmap(career, missingSkills),
    recommendations: generateRecommendations(
      readinessCategory,
      career,
      missingSkills
    ),
    resources
  };
}
