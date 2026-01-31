"use server";

import { suggestionProtection } from "@/app/arcjectProtection/getSuggestionsProtection";
import { connectToDatabase } from "@/lib/db";
import { suggestion } from "@/lib/Schemas/suggestionSchema";
import "@/lib/Schemas/register"; // ✅ CRITICAL: registers User model
import { verifyAuth } from "@/lib/verifyAuth";
import { request } from "@arcjet/next";
import { cookies } from "next/headers";

export const getSuggestionsAction = async () => {
  try {
    /* ===============================
       AUTHENTICATION
    =============================== */
    const token = (await cookies()).get("loginToken")?.value;
    const user = token ? await verifyAuth(token) : null;

    if (!user) {
      return {
        success: false,
        error: "Not authorized",
        status: 401,
      };
    }

    /* ===============================
       ARCJET PROTECTION
    =============================== */
    const req = await request();
    const decision = await suggestionProtection.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      const reason = decision.reason;

      if (reason.isBot()) {
        return { success: false, error: "Bot detected", status: 403 };
      }
      if (reason.isShield()) {
        return { success: false, error: "Shield detected", status: 403 };
      }
      if (reason.isRateLimit()) {
        return {
          success: false,
          error: "Too many requests",
          status: 429,
        };
      }
    }

    /* ===============================
       DATABASE QUERY
    =============================== */
    await connectToDatabase();

    const suggestions = await suggestion
      .find()
      .sort({ createdAt: -1 })
      .populate("author", "name email role")
      .lean();

    /* ===============================
       DATA SANITIZATION (VERY IMPORTANT)
    =============================== */
    const data = suggestions.map((sug: any) => ({
      id: sug._id.toString(),
      title: sug.title,
      description: sug.description,
      category: sug.categories,
      status: sug.status,
      image: sug.image ?? null,
      anonymous: sug.anonymous,
      author: sug.author
        ? {
            name: sug.author.name,
            email: sug.author.email,
            role: sug.author.role,
          }
        : null,
      createdAt: sug.createdAt,
      updatedAt: sug.updatedAt,
    }));

    return {
      success: true,
      message: "Suggestions fetched successfully",
      data,
      status: 200,
    };
  } catch (error) {
    console.error("GET SUGGESTIONS ERROR:", error);

    return {
      success: false,
      error: "Something went wrong",
      status: 500,
    };
  }
};
