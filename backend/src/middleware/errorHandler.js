import mongoose from "mongoose";

export function notFound(request, response) {
  response.status(404).json({
    success: false,
    message: `Route ${request.method} ${request.originalUrl} was not found`
  });
}

export function errorHandler(error, _request, response, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";

  if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "A record with that value already exists";
  }

  const payload = {
    success: false,
    message
  };

  if (error.details) payload.details = error.details;
  if (process.env.NODE_ENV !== "production") payload.stack = error.stack;

  response.status(statusCode).json(payload);
}
