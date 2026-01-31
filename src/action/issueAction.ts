"use server";

import "@/lib/Schemas/register"; // ✅ FORCE USER MODEL REGISTRATION
import { getEventProtection } from "@/app/arcjectProtection/getEventProtection";
import { connectToDatabase } from "@/lib/db";
// import Event from "@/lib/Schemas/eventschema";
import { verifyAuth } from "@/lib/verifyAuth";
import { request } from "@arcjet/next";
import { cookies } from "next/headers";
import { Issue } from "@/lib/Schemas/issueSchema";

export const getIssues = async () => {
  const token = (await cookies()).get("loginToken")?.value;
  if (!token) return { success: false, error: "Unauthorized", status: 401 };

  const user = await verifyAuth(token);
  if (!user) return { success: false, error: "Unauthorized", status: 401 };

  const req = await request();
  const decision = await getEventProtection.protect(req, {requested:1});

  if (decision.isDenied()) {
    if (decision.reason.isShield())
      return { success: false, error: "Shield detected", status: 403 };
    if (decision.reason.isBot())
      return { success: false, error: "Bot detected", status: 403 };
    if (decision.reason.isRateLimit())
      return {
        success: false,
        error: "Too many requests",
        status: 429,
      };
  }

  try {
    await connectToDatabase();

    const issues = await Issue.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email role")
      .lean();

    //serilize post
    const newIssue = issues.map((post) => {
      const dateObj = new Date(post.createdAt);

      return {
        id: post._id.toString(),
        title: post.title,
        description: post.description,

        date: dateObj.toISOString().split("T")[0], // YYYY-MM-DD
        time: dateObj.toTimeString().slice(0, 5), // HH:mm
        status: post.status,
        location: post.location,
        category: post.category,
        image: post.image,
      };
    });

    return {
      success: true,
      status: 200,
      message: "issues fetched successfully",
      issues:newIssue,
    };
  } catch (error) {
    console.error("GET ISSUES ERROR:", error);
    return { success: false, error: "Something went wrong", status: 500 };
  }
};
