import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    free: {
      title: { type: String, required: true },
      url: { type: String, required: true }
    },
    paid: {
      title: { type: String, required: true },
      url: { type: String, required: true }
    }
  },
  { _id: false }
);

const roadmapItemSchema = new mongoose.Schema(
  {
    month: { type: Number, required: true, min: 1 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["learning", "project", "career"],
      default: "learning"
    }
  },
  { _id: false }
);

const skillGapAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    targetCareer: { type: String, required: true, trim: true },
    selectedSkills: { type: [String], default: [] },
    matchedSkills: { type: [String], default: [] },
    missingSkills: { type: [String], default: [] },
    readinessScore: { type: Number, required: true, min: 0, max: 100 },
    roadmap: { type: [roadmapItemSchema], default: [] },
    recommendations: { type: [String], default: [] },
    readinessCategory: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    },
    resources: { type: [courseSchema], default: [] }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: (_document, value) => {
        delete value.__v;
        return value;
      }
    }
  }
);

skillGapAnalysisSchema.index({ userId: 1, createdAt: -1 });

export const SkillGapAnalysis = mongoose.model(
  "SkillGapAnalysis",
  skillGapAnalysisSchema
);
