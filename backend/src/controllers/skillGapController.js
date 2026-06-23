import mongoose from "mongoose";
import { careerNames, careerSkills, allSkills } from "../data/careerSkills.js";
import { SkillGapAnalysis } from "../models/SkillGapAnalysis.js";
import { User } from "../models/User.js";
import { analyzeSkillGap } from "../services/skillGapService.js";
import { AppError } from "../utils/AppError.js";

export function getSkillGapOptions(_request, response) {
  response.json({
    success: true,
    data: {
      careers: careerNames,
      careerSkills,
      allSkills
    }
  });
}

export async function analyze(request, response) {
  const { userId, career, selectedSkills } = request.body;

  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError("A valid userId is required", 400);
  }

  if (typeof career !== "string" || !career.trim()) {
    throw new AppError("career is required", 400);
  }

  if (!Array.isArray(selectedSkills)) {
    throw new AppError("selectedSkills must be an array", 400);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const result = analyzeSkillGap(career.trim(), selectedSkills);
  const analysis = await SkillGapAnalysis.create({
    userId: user._id,
    ...result
  });

  user.currentSkills = [
    ...new Set([...user.currentSkills, ...result.selectedSkills])
  ];
  user.analyses.push(analysis._id);
  await user.save();

  response.status(201).json({
    success: true,
    data: analysis
  });
}

export async function getHistory(request, response) {
  const { userId } = request.params;
  const { career, limit = "50" } = request.query;

  if (!mongoose.isValidObjectId(userId)) {
    throw new AppError("A valid userId is required", 400);
  }

  const parsedLimit = Math.min(Math.max(Number.parseInt(limit, 10) || 50, 1), 100);
  const query = { userId };
  if (career) query.targetCareer = career;

  const analyses = await SkillGapAnalysis.find(query)
    .sort({ createdAt: -1 })
    .limit(parsedLimit)
    .lean();

  response.json({
    success: true,
    count: analyses.length,
    data: analyses
  });
}

export async function getAnalysis(request, response) {
  const { analysisId } = request.params;

  if (!mongoose.isValidObjectId(analysisId)) {
    throw new AppError("A valid analysisId is required", 400);
  }

  const analysis = await SkillGapAnalysis.findById(analysisId).lean();
  if (!analysis) {
    throw new AppError("Analysis not found", 404);
  }

  response.json({ success: true, data: analysis });
}
