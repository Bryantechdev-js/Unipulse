// lib/Schemas/attendance.ts
import mongoose, { Schema, models, model } from "mongoose";

const AttendanceSchema = new Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    staffName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    staffType: {
      type: String,
      required: true, // FULL_TIME | PART_TIME | CONTRACT
    },

    department: {
      type: String,
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD (important for uniqueness)
      required: true,
    },

    checkIn: {
      type: String,
      default: null,
    },

    checkOut: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Present", "Late", "Early Leave", "Absent"],
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Prevent multiple check-ins same day
AttendanceSchema.index({ staff: 1, date: 1 }, { unique: true });

const Attendance =
  models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;
