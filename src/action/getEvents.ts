"use server";

import "@/lib/Schemas/register"; // ✅ FORCE USER MODEL REGISTRATION
import { getEventProtection } from "@/app/arcjectProtection/getEventProtection";
import { connectToDatabase } from "@/lib/db";
import Event from "@/lib/Schemas/eventschema";
import { verifyAuth } from "@/lib/verifyAuth";
import { request } from "@arcjet/next";
import { cookies } from "next/headers";

export const getEvents = async () => {
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

    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email role")
      .lean();

    //serilize post
    const newPost = events.map((post) => {
      const dateObj = new Date(post.eventDateTime);

      return {
        id: post._id.toString(),
        title: post.title,
        description: post.description,

        date: dateObj.toISOString().split("T")[0], // YYYY-MM-DD
        time: dateObj.toTimeString().slice(0, 5), // HH:mm

        location: post.location,
        category: post.category,
        image: post.image,
      };
    });

    return {
      success: true,
      status: 200,
      events:newPost,
    };
  } catch (error) {
    console.error("GET EVENTS ERROR:", error);
    return { success: false, error: "Something went wrong", status: 500 };
  }
};
