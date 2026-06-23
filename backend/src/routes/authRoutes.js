import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  getCurrentUser,
  login,
  logout,
  register
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authRouter = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again shortly."
  }
});

authRouter.post("/register", authLimiter, asyncHandler(register));
authRouter.post("/login", authLimiter, asyncHandler(login));
authRouter.get("/me", protect, asyncHandler(getCurrentUser));
authRouter.post("/logout", logout);
