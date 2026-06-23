import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  generate,
  getCareerPath,
  updateTaskCompletion
} from "../controllers/careerPathController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const careerPathRouter = Router();
const generationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many career path requests. Please try again shortly."
  }
});

careerPathRouter.post("/generate", generationLimiter, asyncHandler(generate));
careerPathRouter.get("/", asyncHandler(getCareerPath));
careerPathRouter.patch("/task-complete", asyncHandler(updateTaskCompletion));
