"use server";

import { assignmentProtect } from "@/app/arcjectProtection/assignmentProtection";
import { connectToDatabase } from "@/lib/db";
import Assignment from "@/lib/Schemas/assignment";
import { verifyAuth } from "@/lib/verifyAuth";
import { request } from "@arcjet/next";
import { cookies } from "next/headers";

export const getAssignmentAction = async () => {
  /* 1️⃣ AUTHENTICATION */
  const token = (await cookies()).get("loginToken")?.value as string;
  const user = await verifyAuth(token);

  if (!user) {
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };
  }

  /* 2️⃣ ARCJET PROTECTION */
  const req = await request();
  const decision = await assignmentProtect.protect(req);

  if (decision.isDenied()) {
    const reason = decision.reason;

    if (reason.isBot()) {
      return { success: false, error: "Bot detected", status: 403 };
    }

    if (reason.isShield()) {
      return { success: false, error: "Shield triggered", status: 403 };
    }

    if (reason.isRateLimit()) {
      return { success: false, error: "Too many requests", status: 429 };
    }
  }

  /* 3️⃣ DATABASE */
  try {
    await connectToDatabase();

    const assignments = await Assignment.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email role")
      .lean();

    const serializedAssignments = assignments.map((ass) => ({
      id: ass._id.toString(),
      title: ass.title,
      department: ass.department,
      course: ass.course,
      instructions: ass.instructions,
      submissionFormat: ass.submissionFormat,
      image: ass.image,

      deadline: {
        date: new Date(ass.deadline.date).toISOString().split("T")[0],
        time: ass.deadline.time,
      },

      author: ass.createdBy
        ? {
            id: ass.createdBy._id.toString(),
            name: ass.createdBy.name,
            email: ass.createdBy.email,
            role: ass.createdBy.role,
          }
        : null,

      status: ass.status,
      createdAt: ass.createdAt.toISOString(),
      updatedAt: ass.updatedAt.toISOString(),
    }));

    return {
      success: true,
      data: serializedAssignments,
      status: 200,
    };
  } catch (error) {
    console.error("GET ASSIGNMENTS ERROR:", error);

    return {
      success: false,
      error: "Internal server error",
      status: 500,
    };
  }
};
