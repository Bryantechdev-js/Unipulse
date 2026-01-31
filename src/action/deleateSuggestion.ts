"use server";

import { suggestionProtection } from "@/app/arcjectProtection/getSuggestionsProtection";
import { connectToDatabase } from "@/lib/db";
import { suggestion } from "@/lib/Schemas/suggestionSchema";
import "@/lib/Schemas/register"; // ✅ CRITICAL: registers User model
import { verifyAuth } from "@/lib/verifyAuth";
import { request } from "@arcjet/next";
import { cookies } from "next/headers";
import { success } from "zod";
import { deleateProtection } from "@/app/arcjectProtection/deleateProtection";

export const deleateSuggestionsAction = async (role:string,name:string, suggestionId:string) => {
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
    const decision = await deleateProtection.protect(req, {
      requested: user.role === 'ADMIN' ? 0 : 1,
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
          error: "Too many requests, try to deleate later",
          status: 429,
        };
      }
    }

    //check user role
    const canDeleate = user.role === "ADMIN" || (user.role === role && user.name === name);

    if(!canDeleate){
        return{
            success:false,
            error:"failed ,you aren't the author",
            status:403
        }
    }

    /* ===============================
       DATABASE QUERY
    =============================== */
    await connectToDatabase();

    // deleating the suggestions
    await suggestion.findByIdAndDelete(suggestionId)
   
    return {
      success: true,
      message: "Suggestions deleated",
      status: 200,
    };
  } catch (error) {
    console.error("Deleate SUGGESTIONS ERROR:", error);

    return {
      success: false,
      error: "Something went wrong",
      status: 500,
    };
  }
};
