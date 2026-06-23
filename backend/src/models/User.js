import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "PathFinder Student",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
      sparse: true,
      unique: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    currentSkills: {
      type: [String],
      default: [],
    },

    analyses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SkillGapAnalysis",
      },
    ],
  },
  { timestamps: true }
);

// Passwordless records remain valid for the existing guest-session flow.
// Whenever a registered account has a password, hashing is centralized here.
userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.set("toJSON", {
  transform: (_document, value) => {
    delete value.password;
    delete value.__v;
    return value;
  }
});

export const User = mongoose.model("User", userSchema);
