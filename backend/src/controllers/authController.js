import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  currentSkills: user.currentSkills,
  analyses: user.analyses,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const assertJwtConfigured = () => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new AppError(
      "Authentication is not configured. Set a secure JWT_SECRET.",
      500
    );
  }
};

const createToken = (userId) => {
  assertJwtConfigured();
  return jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: "7d",
    issuer: "pathfinder-api",
    audience: "pathfinder-client"
  });
};

export async function register(request, response) {
  const name = request.body.name?.trim();
  const email = request.body.email?.trim().toLowerCase();
  const password = request.body.password;

  if (!name) throw new AppError("Name is required", 400);
  if (!email) throw new AppError("Email is required", 400);
  if (!EMAIL_PATTERN.test(email)) {
    throw new AppError("Enter a valid email address", 400);
  }
  if (typeof password !== "string" || !password) {
    throw new AppError("Password is required", 400);
  }
  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters", 400);
  }

  assertJwtConfigured();
  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const user = await User.create({ name, email, password });
  const token = createToken(user._id);

  response.status(201).json({
    success: true,
    token,
    user: publicUser(user)
  });
}

export async function login(request, response) {
  const email = request.body.email?.trim().toLowerCase();
  const password = request.body.password;

  if (!email || typeof password !== "string" || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.password) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await user.comparePassword(password);
  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  response.json({
    success: true,
    token: createToken(user._id),
    user: publicUser(user)
  });
}

export async function getCurrentUser(request, response) {
  const user = await User.findById(request.user.id);
  if (!user) throw new AppError("User not found", 404);

  response.json({ success: true, user: publicUser(user) });
}

export function logout(_request, response) {
  response.json({
    success: true,
    message: "Logged out successfully"
  });
}
