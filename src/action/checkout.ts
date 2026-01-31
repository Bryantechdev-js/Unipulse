// action/checkOutAction.ts
"use server";

import { cookies } from "next/headers";
import { request } from "@arcjet/next";
import { verifyAuth } from "@/lib/verifyAuth";
import { connectToDatabase } from "@/lib/db";
import { checkOutValidation } from "@/utils/ZodSchemas";
import Attendance from "@/lib/attendance";
// import Attendance from "@/lib/Schemas/attendance";
// import { attendanceProtect } from "@/app/arcjectProtection/attendanceProtection";
// import { checkOutValidation } from "@/utils/ZodSchemas/attendance";

export const checkOutAction = async (formData: unknown) => {
  const token = (await cookies()).get("loginToken")?.value;
  const user = await verifyAuth(token as string);

  if (!user) {
    return { success: false, status: 401 };
  }

  const parsed = checkOutValidation.safeParse(formData);
  if (!parsed.success) {
    return { success: false, status: 400 };
  }


  await connectToDatabase();

  const now = new Date();
  const time = now.toTimeString().slice(0, 5);

  const attendance = await Attendance.findById(parsed.data.attendanceId);
  if (!attendance || attendance.checkOut) {
    return { success: false, status: 400 };
  }

  // Early leave logic
  const status =
    now.getHours() < 16 ? "Early Leave" : attendance.status;

  attendance.checkOut = time;
  attendance.status = status;
  await attendance.save();

  return { success: true, status: 200 };
};
