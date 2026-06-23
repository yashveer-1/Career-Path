import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";

const port = Number.parseInt(process.env.PORT, 10) || 5000;

async function startServer() {
  await connectDatabase(process.env.MONGODB_URI);

  const server = app.listen(port, () => {
    console.log(`PathFinder API listening on port ${port}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Closing gracefully.`);
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((error) => {
  console.error("Failed to start API:", error);
  process.exit(1);
});
