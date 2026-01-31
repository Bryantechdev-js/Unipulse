"use server";

import { eventProtection } from "@/app/arcjectProtection/eventsProtection";
import { connectToDatabase } from "@/lib/db";
import Event from "@/lib/Schemas/eventschema";
import { verifyAuth } from "@/lib/verifyAuth";
import { request } from "@arcjet/next";
import { cookies } from "next/headers";

export const getEventsDetails = async (id: string) => {
  const token = (await cookies()).get("loginToken")?.value as string;
  const user = await verifyAuth(token);
  if (!user) {
    return { success: false, error: "Unauthorized", status: 401 };
  }

  const req = await request();
  const decision = await eventProtection.protect(req, { requested: 1 });
  if (decision.isDenied()) {
    if (decision.reason.isShield()) return { success: false, error: "shield detected", status: 403 };
    if (decision.reason.isBot()) return { success: false, error: "bot detected", status: 403 };
    if (decision.reason.isRateLimit()) return { success: false, error: "too many requests, try later", status: 429 };
  }

  try {
    await connectToDatabase();
    const event = await Event.findById(id)
      .populate("createdBy", "name email role")
      .lean();

    if (!event) {
      return { success: false, error: "Event not found", status: 404 };
    }

    const dateObj = new Date(event.eventDateTime);

    const newPost = {
      id: event._id.toString(),
      title: event.title,
      description: event.description,
      date: dateObj.toISOString().split("T")[0],
      time: dateObj.toTimeString().slice(0, 5),
      location: event.location,
      category: event.category,
      image: event.image,
      author: {
        id: event.createdBy._id.toString(),
        name: event.createdBy.name,
        email: event.createdBy.email,
        role: event.createdBy.role,
      },
    };

    return {
      success: true,
      message: "Event details fetched successfully",
      status: 200,
      events: newPost,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong", status: 500 };
  }
};
