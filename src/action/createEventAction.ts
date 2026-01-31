"use server";

import { connectToDatabase } from "@/lib/db";
import Event from "@/lib/Schemas/eventschema";
import { verifyAuth } from "@/lib/verifyAuth";
import { eventValidation } from "@/utils/ZodSchemas";
import { cookies } from "next/headers";
import { request } from "@arcjet/next";
import { registerProtect } from "@/app/arcjectProtection/registerProtection";

export const createEvent = async (data: any) => {
  // 🔐 AUTH
  const token = (await cookies()).get("loginToken")?.value;
  if (!token) {
    return { success: false, error: "Unauthorized", status: 401 };
  }

  const user = await verifyAuth(token);
  if (!user) {
    return { success: false, error: "Unauthorized", status: 401 };
  }

  // ✅ ZOD VALIDATION
  const validation = eventValidation.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0].message,
      status: 400,
    };
  }

  const { title, description, date, time, location, category, image } =
    validation.data;

  // 🕒 COMBINE DATE + TIME (ONCE)
  const [hours, minutes] = time.split(":").map(Number);
  const eventDateTime = new Date(date);
  eventDateTime.setHours(hours, minutes, 0, 0);

  // 🛡 Arcjet Protection
  const req = await request();
  const decision = await registerProtect.protect(req, {
    email: user.email,
  });

  if (decision.isDenied()) {
    if(decision.reason.isBot()){
      return { success: false, error: "Bot detected", status: 403 };
    }
    if(decision.reason.isShield()){
      return { success: false, error: "Bot detected", status: 403 };
    }
      return { success: false, error: "Bot detected", status: 403 };
    if (decision.reason.isRateLimit())
      return { success: false, error: "Too many requests", status: 429 };
  }

  // 💾 SAVE TO DATABASE
  try {
    await connectToDatabase();

    await Event.create({
      title,
      description,
      eventDateTime, // ✅ ONLY THIS GOES TO DB
      location,
      category,
      image,
      createdBy: user.id,
    });

    return {
      success: true,
      message: "Event created successfully",
      status: 201,
    };
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    return {
      success: false,
      error: "Something went wrong",
      status: 500,
    };
  }
};
