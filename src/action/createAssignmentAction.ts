"use server";

import { connectToDatabase } from "@/lib/db";
import Assignment from "@/lib/Schemas/assignment";
import { createAssignmentValidation } from "@/utils/ZodSchemas";
// import { assignmentProtect } from "@/app/arcjectProtection/assignmentProtection";
import { request } from "@arcjet/next";
import { cookies } from "next/headers";
import { verifyAuth } from "@/lib/verifyAuth";
import { assignmentProtect } from "@/app/arcjectProtection/assignmentProtection";
import { log } from "util";
// import { auth } from "@/auth"; // next-auth / custom auth

export const createAssignmentAction = async (formData: unknown) => {
  /* 1️⃣ AUTHENTICATION */
  const token = (await cookies()).get("loginToken")?.value as string;
  const user = await verifyAuth(token);

  if (!user || !user?.id) {
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };
  }

  /* 2️⃣ ZOD VALIDATION */
  const parsed = createAssignmentValidation.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
      status: 400,
    };
  }

  const {
    title,
    department,
    course,
    date,
    time,
    instructions,
    submissionFormat,
    image,
  } = parsed.data;

  /* 3️⃣ ARCJET SECURITY */
  const req = await request();
  const decision = await assignmentProtect.protect(req);

  if (decision.isDenied()) {
    return {
      success: false,
      error: "Request blocked",
      status: 403,
    };
  }

  /* 4️⃣ CONNECT TO DATABASE */
  await connectToDatabase();

  /* 5️⃣ SAVE ASSIGNMENT */
  try {
    await Assignment.create({
      title,
      department,
      course,
      instructions,
      submissionFormat,
      image,
      deadline: {
        date: new Date(date),
        time,
      },
      createdBy: user.id,
      status: "PUBLISHED",
    });

    return {
      success: true,
      message: "Assignment created successfully",
      status: 201,
    };
  } catch (error) {
    console.error("CREATE ASSIGNMENT ERROR:", error);

    return {
      success: false,
      error: "Internal server error",
      status: 500,
    };
  }
};

