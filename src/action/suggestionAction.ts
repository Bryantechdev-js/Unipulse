"use server";

import { suggestionProtection } from "@/app/arcjectProtection/suggestionProtection";
import { connectToDatabase } from "@/lib/db";
import { suggestion } from "@/lib/Schemas/suggestionSchema";
import { verifyAuth } from "@/lib/verifyAuth";
import { suggestionSchemaValidation } from "@/utils/ZodSchemas";
import { categories, request } from "@arcjet/next";
import { cookies } from "next/headers";

export const suggestionActiion = async (data: any) => {
  const token = (await cookies()).get("loginToken")?.value as string;
  const user = await verifyAuth(token);

  if (!user) {
    return { success: false, error: "not authorised", status: 401 };
  }

  const validate = suggestionSchemaValidation.safeParse(data);
  if (!validate.success) {
    return {
      success: false,
      error: "invalid inputs",
      status: 400,
    };
  }

  const { title, category, description, anonymous, image } = validate.data;

  // ackjet protection

  const req = await request();
  const decision = await suggestionProtection.protect(req, { requested: 1 });
  if( decision.isDenied()) {
    if (decision.reason.isShield())
      return { success: false, error: "shield detected", status: 403 };
    if (decision.reason.isBot())
      return { success: false, error: "bot detected", status: 403 };
    if (decision.reason.isRateLimit())
      return { success: false, error: "too many requests, try later", status: 429 };
  }

  //connect to db and save suggestion

  try {
    await connectToDatabase();

    await suggestion.create({
      title,
      description,
      categories:category,                 // ✅ matches schema
      anonymous,
      image,
      author: anonymous ? null : user.id, // ✅ safe
    });

    return {
      success: true,
      message: "suggestion submitted",
      status: 200,
    };
  } catch (err) {
    console.error("Suggestion save error:", err); // 🔥 ADD THIS
    return {
      success: false,
      error: "something went wrong",
      status: 500,
    };
  }
};
