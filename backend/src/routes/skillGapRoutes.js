import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  analyze,
  getAnalysis,
  getHistory,
  getSkillGapOptions
} from "../controllers/skillGapController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const skillGapRouter = Router();
const analysisLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many analyses requested. Please try again shortly."
  }
});

skillGapRouter.get("/options", getSkillGapOptions);
skillGapRouter.post("/analyze", analysisLimiter, asyncHandler(analyze));
skillGapRouter.get("/history/:userId", asyncHandler(getHistory));
skillGapRouter.get("/analysis/:analysisId", asyncHandler(getAnalysis));
