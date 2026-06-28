import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/authRoutes.js";
import { careerPathRouter } from "./routes/careerPathRoutes.js";
import { skillGapRouter } from "./routes/skillGapRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

export const app = express();

const defaultClientOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://career-path-frontend-jade.vercel.app"
];

const configuredClientOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([
  ...defaultClientOrigins,
  ...configuredClientOrigins
]);

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      // Allow all Vercel deployments for this project
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (_request, response) => {
  response.json({ success: true, message: "PathFinder API is healthy" });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/skill-gap", skillGapRouter);
app.use("/api/career-path", careerPathRouter);

// In production Express serves the compiled React app as well as the API.


  app.use(notFound);


app.use(errorHandler);
