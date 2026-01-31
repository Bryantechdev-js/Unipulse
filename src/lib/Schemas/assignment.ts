import mongoose, { Schema, models, model } from "mongoose";
 import "./register";
const AssignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      enum: ["ENGINEERING", "DENTAL THERAPY", "AGRICULTURE", "HEALTH"],
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    instructions: {
      type: String,
      required: true,
    },

    submissionFormat: {
      type: String,
      required: true,
      enum: ["pdf", "doc", "zip", "any"],
    },

    deadline: {
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },

    image: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "PUBLISHED",
    },
  },
  {
    timestamps: true, // ✅ createdAt & updatedAt
  }
);

const Assignment =
  models.Assignment || model("Assignment", AssignmentSchema);

export default Assignment;
