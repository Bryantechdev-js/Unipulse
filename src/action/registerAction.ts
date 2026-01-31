"use server";

import bcrypt from "bcryptjs";
import { registerProtect } from "@/app/arcjectProtection/registerProtection";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/Schemas/register";
import { registerValidation } from "@/utils/ZodSchemas";
import { request } from "@arcjet/next";

export const registerAction = async (formData: unknown) => {
  /* 1️⃣ Zod Validation */
  const parsed = registerValidation.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
      status: 400,
    };
  }

  const { name, email, password, matricle, department, level, role } =
    parsed.data;

  /* 2️⃣ Arcjet Protection */
  const req = await request();
  const decision = await registerProtect.protect(req, { email });

  if (decision.isDenied()) {
    const reason = decision.reason;

    if (reason.isBot())
      return { success: false, error: "Bot detected", status: 403 };

    if (reason.isEmail())
      return { success: false, error: "Email not allowed", status: 400 };

    if (reason.isRateLimit())
      return { success: false, error: "Too many requests", status: 429 };

    return { success: false, error: "Access denied", status: 403 };
  }

  try {
    /* 3️⃣ Connect to DB */
    await connectToDatabase();

    /* 4️⃣ Admin constraint */
    if (role === "ADMIN") {
      const adminExists = await User.findOne({ role: "ADMIN" });
      if (adminExists) {
        return {
          success: false,
          error: "Admin already exists",
          status: 400,
        };
      }
    }

    /* 5️⃣ Email uniqueness */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists",
        status: 400,
      };
    }

    /* 6️⃣ Hash password */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* 7️⃣ Create user */
    await User.create({
      name,
      email,
      password: hashedPassword,
      matricle,
      department,
      level,
      role,
    });

    return {
      success: true,
      message: "User registered successfully",
      status: 201,
    };
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return {
      success: false,
      error: "Database connection failed",
      status: 500,
    };
  }
};
