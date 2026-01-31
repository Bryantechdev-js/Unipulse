// action/checkInAction.ts
"use server";

import { cookies } from "next/headers";
import { request } from "@arcjet/next";
import { verifyAuth } from "@/lib/verifyAuth";
import { connectToDatabase } from "@/lib/db";
import { checkInValidation } from "@/utils/ZodSchemas";
import Attendance from "@/lib/attendance";
// import Attendance from "@/lib/Schemas/attendance";
// import { attendanceProtect } from "@/app/arcjectProtection/attendanceProtection";
// import { checkInValidation } from "@/utils/ZodSchemas/attendance";

export const checkInAction = async (formData: unknown) => {
  // 1️⃣ Auth
  const token = (await cookies()).get("loginToken")?.value;
  const user = await verifyAuth(token as string);

  if (!user) {
    return { success: false, status: 401, error: "Unauthorized" };
  }

  // 2️⃣ Validation
  const parsed = checkInValidation.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      status: 400,
      error: parsed.error.flatten().fieldErrors,
    };
  }



  // 4️⃣ Logic
  await connectToDatabase();

  const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const time = now.toTimeString().slice(0, 5);

  const status = now.getHours() >= 9 ? "Late" : "Present";

  try {
    await Attendance.create({
      staff: user.id,
      staffName: parsed.data.staffName,
      role: parsed.data.role,
      staffType: parsed.data.staffType,
      department: parsed.data.department,
      date: today,
      checkIn: time,
      status,
    });

    return { success: true, status: 201 };
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        success: false,
        status: 409,
        error: "Already checked in today",
      };
    }

    return { success: false, status: 500, error: "Server error" };
  }
};
