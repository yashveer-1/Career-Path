import mongoose from "mongoose";
import { User } from "../models/User.js";

export async function createGuestSession(request, response) {
  const { userId, name } = request.body;

  if (userId && mongoose.isValidObjectId(userId)) {
    const existingUser = await User.findById(userId).lean();
    if (existingUser) {
      return response.json({ success: true, data: existingUser });
    }
  }

  const guest = await User.create({
    name: typeof name === "string" && name.trim() ? name.trim() : "PathFinder Student"
  });

  return response.status(201).json({ success: true, data: guest });
}
