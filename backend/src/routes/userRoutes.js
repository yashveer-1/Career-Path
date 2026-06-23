import { Router } from "express";
import { createGuestSession } from "../controllers/userController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const userRouter = Router();

userRouter.post("/guest-session", asyncHandler(createGuestSession));
