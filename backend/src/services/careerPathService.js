import { careerPathProfiles } from "../data/careerPathProfiles.js";
import { skillCourses } from "../data/skillCourses.js";
import { AppError } from "../utils/AppError.js";

const cleanStrings = (values) =>
  Array.isArray(values)
    ? values
        .filter((value) => typeof value === "string" && value.trim())
        .map((value) => value.trim())
        .slice(0, 12)
    : [];

const firstMissingSkill = (analysis, fallback = "portfolio development") =>
  analysis.missingSkills[0] || fallback;

function courseFor(skill) {
  return skillCourses[skill]?.free?.title || `a focused ${skill} beginner course`;
}

export function getMotivationalMessage(score) {
  if (score < 40) {
    return "You're at the beginning of the journey. Most successful professionals started here—your advantage is that you now have a clear first step.";
  }
  if (score <= 70) {
    return "You're making strong progress. Focus on projects and practical experience to turn what you know into proof you can show.";
  }
  return "You're close to being internship-ready. Now focus on specialization, portfolio quality, and interview preparation.";
}

export function calculateCompletionPercentage(progress) {
  const items = [
    ...progress.dailyTasks,
    ...progress.weeklyGoals,
    ...progress.monthlyMilestones
  ];
  if (!items.length) return 0;
  return Math.round(
    (items.filter((item) => item.completed).length / items.length) * 100
  );
}

export function generateCareerPath(analysis, profileContext = {}) {
  const profile = careerPathProfiles[analysis.targetCareer];
  if (!profile) {
    throw new AppError(
      `Career path generation is not supported for "${analysis.targetCareer}"`,
      400
    );
  }

  const interests = cleanStrings(profileContext.interests);
  const quizStrengths = cleanStrings(
    profileContext.quizResults?.strengths || profileContext.quizResults
  );
  const nlpTraits = cleanStrings(
    profileContext.nlpResults?.traits ||
      profileContext.nlpResults?.interests ||
      profileContext.nlpResults
  );
  const missing = analysis.missingSkills;
  const primarySkill = firstMissingSkill(analysis);
  const secondarySkill = missing[1] || primarySkill;
  const tertiarySkill = missing[2] || secondarySkill;

  const contextUsed = [];
  if (quizStrengths.length) contextUsed.push("quiz results");
  if (nlpTraits.length) contextUsed.push("NLP analysis");
  if (interests.length) contextUsed.push("student interests");

  const reasoning = [
    `Your ${analysis.readinessScore}% readiness score shows ${
      analysis.readinessScore < 40
        ? "a clear opportunity to build strong foundations"
        : analysis.readinessScore <= 70
          ? "a useful foundation with specific gaps to close"
          : "strong alignment with the core requirements"
    }.`,
    analysis.selectedSkills.length
      ? `Your existing ${analysis.selectedSkills.slice(0, 3).join(", ")} skills already support ${profile.theme}.`
      : `This route begins with approachable foundations before moving into ${profile.theme}.`,
    `The plan prioritizes ${missing.slice(0, 3).join(", ") || "portfolio proof and interview preparation"} in the order that creates practical momentum.`,
    ...(interests.length
      ? [`Your stated interests in ${interests.slice(0, 3).join(", ")} strengthen the fit.`]
      : []),
    ...(quizStrengths.length
      ? [`Your quiz highlighted ${quizStrengths.slice(0, 3).join(", ")}.`]
      : []),
    ...(nlpTraits.length
      ? [`Your written-response analysis suggests ${nlpTraits.slice(0, 3).join(", ")}.`]
      : []),
    `This path uses ${profile.strengths.slice(0, 2).join(" and ")} while producing visible proof through projects.`
  ];

  const dailyTasks = [
    {
      title: `Complete one focused lesson on ${primarySkill}`,
      description: `Spend 30–45 minutes with ${courseFor(primarySkill)} and write five takeaway notes.`,
      skill: primarySkill
    },
    {
      title: `Practise ${primarySkill}`,
      description: "Complete two beginner exercises or recreate one small example without copying.",
      skill: primarySkill
    },
    {
      title: "Create your progress proof",
      description: "Save today's notes or code in a dedicated portfolio folder and write tomorrow's first task.",
      skill: "Accountability"
    }
  ];

  const weeklyGoals = [
    {
      week: 1,
      title: `${primarySkill} foundations`,
      tasks: [
        `Finish the beginner modules for ${primarySkill}`,
        "Complete at least 5 practice exercises"
      ]
    },
    {
      week: 2,
      title: `${secondarySkill} in practice`,
      tasks: [
        `Learn the core concepts of ${secondarySkill}`,
        `Use ${primarySkill} and ${secondarySkill} in a mini exercise`
      ]
    },
    {
      week: 3,
      title: `${tertiarySkill} fundamentals`,
      tasks: [
        `Complete a focused ${tertiarySkill} learning module`,
        "Document what you learned with one practical example"
      ]
    },
    {
      week: 4,
      title: "Build your first proof project",
      tasks: [
        `Build ${profile.starterProject}`,
        "Publish a short README explaining the problem, process, and result"
      ]
    }
  ];

  const monthlyMilestones = [
    {
      month: 1,
      title: "Foundation complete",
      description: `Gain working confidence in ${primarySkill} and ${secondarySkill}, then finish ${profile.starterProject}.`
    },
    {
      month: 2,
      title: "First project built",
      description: `Complete and publish ${profile.starterProject} with a clear explanation of your decisions.`
    },
    {
      month: 3,
      title: "Portfolio ready",
      description: `Create a second project and present both projects in a clean ${analysis.targetCareer} portfolio.`
    },
    {
      month: 4,
      title: "Advanced skills",
      description: `Deepen ${tertiarySkill} and complete ${profile.proofProject}.`
    },
    {
      month: 5,
      title: "Interview preparation",
      description: "Practise role-specific questions, project explanations, and two mock interviews each week."
    },
    {
      month: 6,
      title: "Internship applications",
      description: "Apply to targeted roles weekly, track responses, and improve your portfolio using feedback."
    }
  ];

  return {
    career: analysis.targetCareer,
    readinessScore: analysis.readinessScore,
    currentSkills: analysis.selectedSkills,
    missingSkills: analysis.missingSkills,
    dailyTasks,
    weeklyGoals,
    monthlyMilestones,
    reasoning,
    motivationalMessage: getMotivationalMessage(analysis.readinessScore),
    successStories: profile.stories,
    contextUsed,
    completionPercentage: 0,
    lastUpdated: new Date()
  };
}
