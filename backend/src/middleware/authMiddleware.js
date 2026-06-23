import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export function protect(request, _response, next) {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return next(new AppError("Authentication token is required", 401));
  }

  const token = authorization.slice(7).trim();
  if (!token) {
    return next(new AppError("Authentication token is required", 401));
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new AppError("Authentication is not configured", 500);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "pathfinder-api",
      audience: "pathfinder-client"
    });
    request.user = { id: decoded.id };
    return next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
    return next(new AppError("Invalid or expired authentication token", 401));
  }
}
