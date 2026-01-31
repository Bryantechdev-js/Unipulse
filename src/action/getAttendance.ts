// action/getTodayAttendance.ts
"use server";

import Attendance from "@/lib/attendance";
import { connectToDatabase } from "@/lib/db";
// import Attendance from "@/lib/Schemas/attendance";

export const getTodayAttendance = async () => {
  await connectToDatabase();
  const today = new Date().toISOString().split("T")[0];

  const records = await Attendance.find({ date: today })
    .sort({ createdAt: -1 })
    .lean();

  return {
    success: true,
    data: records.map((a) => ({
      id: a._id.toString(),
      staffName: a.staffName,
      role: a.role,
      staffType: a.staffType,
      department: a.department,
      date: a.date,
      checkIn: a.checkIn,
      checkOut: a.checkOut,
      status: a.status,
    })),
  };
};
