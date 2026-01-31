import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  anonymous: { type: Boolean, default: false },
  image: { type: String },
  status: {
    type: String,
    enum: ["open", "pending", "resolved", "closed"],
    default: "open",
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });



export const Issue =
  mongoose.models.Issue || mongoose.model("Issue", IssueSchema);
