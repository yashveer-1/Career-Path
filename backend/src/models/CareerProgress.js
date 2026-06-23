import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: "" },
  skill: { type: String, trim: true, default: "" },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }
});

const weeklyGoalSchema = new mongoose.Schema({
  week: { type: Number, required: true, min: 1 },
  title: { type: String, required: true, trim: true },
  tasks: { type: [String], default: [] },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }
});

const monthlyMilestoneSchema = new mongoose.Schema({
  month: { type: Number, required: true, min: 1 },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }
});

const storySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    background: { type: String, required: true },
    started: { type: String, required: true },
    outcome: { type: String, required: true }
  },
  { _id: false }
);

const careerProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    sourceAnalysisId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillGapAnalysis",
      required: true,
      unique: true
    },
    career: { type: String, required: true, trim: true },
    readinessScore: { type: Number, required: true, min: 0, max: 100 },
    currentSkills: { type: [String], default: [] },
    missingSkills: { type: [String], default: [] },
    dailyTasks: { type: [taskSchema], default: [] },
    weeklyGoals: { type: [weeklyGoalSchema], default: [] },
    monthlyMilestones: { type: [monthlyMilestoneSchema], default: [] },
    reasoning: { type: [String], default: [] },
    motivationalMessage: { type: String, required: true },
    successStories: { type: [storySchema], default: [] },
    contextUsed: { type: [String], default: [] },
    completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
    lastUpdated: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_document, value) => {
        delete value.__v;
        return value;
      }
    }
  }
);

careerProgressSchema.index({ userId: 1, career: 1, lastUpdated: -1 });

export const CareerProgress = mongoose.model(
  "CareerProgress",
  careerProgressSchema
);
