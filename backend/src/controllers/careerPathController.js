import mongoose from "mongoose";
import { CareerProgress } from "../models/CareerProgress.js";
import { SkillGapAnalysis } from "../models/SkillGapAnalysis.js";
import { User } from "../models/User.js";
import {
  calculateCompletionPercentage,
  generateCareerPath
} from "../services/careerPathService.js";
import { AppError } from "../utils/AppError.js";

const validObjectId = (value, fieldName) => {
  if (!mongoose.isValidObjectId(value)) {
    throw new AppError(`A valid ${fieldName} is required`, 400);
  }
};

export async function generate(request, response) {
  const { userId, analysisId, profileContext = {} } = request.body;
  validObjectId(userId, "userId");
  validObjectId(analysisId, "analysisId");

  const [user, analysis] = await Promise.all([
    User.findById(userId).lean(),
    SkillGapAnalysis.findOne({ _id: analysisId, userId }).lean()
  ]);

  if (!user) throw new AppError("User not found", 404);
  if (!analysis) {
    throw new AppError("Skill gap analysis not found for this user", 404);
  }

  const generatedPath = generateCareerPath(analysis, profileContext);
  const progress = await CareerProgress.findOneAndUpdate(
    { sourceAnalysisId: analysis._id, userId },
    {
      $setOnInsert: {
        userId,
        sourceAnalysisId: analysis._id,
        ...generatedPath
      }
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    }
  );

  return response.json({ success: true, data: progress });
}

export async function getCareerPath(request, response) {
  const { userId, career, analysisId } = request.query;
  validObjectId(userId, "userId");

  const query = { userId };
  if (career) query.career = career;
  if (analysisId) {
    validObjectId(analysisId, "analysisId");
    query.sourceAnalysisId = analysisId;
  }

  const progress = await CareerProgress.findOne(query)
    .sort({ lastUpdated: -1 })
    .lean();

  if (!progress) {
    throw new AppError("No personalized career path found", 404);
  }

  response.json({ success: true, data: progress });
}

export async function updateTaskCompletion(request, response) {
  const { userId, progressId, taskType, itemId, completed = true } = request.body;
  validObjectId(userId, "userId");
  validObjectId(progressId, "progressId");
  validObjectId(itemId, "itemId");

  const collectionByTaskType = {
    daily: "dailyTasks",
    weekly: "weeklyGoals",
    monthly: "monthlyMilestones"
  };
  const collectionName = collectionByTaskType[taskType];
  if (!collectionName) {
    throw new AppError("taskType must be daily, weekly, or monthly", 400);
  }
  if (typeof completed !== "boolean") {
    throw new AppError("completed must be a boolean", 400);
  }

  const progress = await CareerProgress.findOne({ _id: progressId, userId });
  if (!progress) {
    throw new AppError("Career progress not found", 404);
  }

  const item = progress[collectionName].id(itemId);
  if (!item) {
    throw new AppError("Progress item not found", 404);
  }

  item.completed = completed;
  item.completedAt = completed ? new Date() : null;
  progress.completionPercentage = calculateCompletionPercentage(progress);
  progress.lastUpdated = new Date();
  await progress.save();

  response.json({ success: true, data: progress });
}
