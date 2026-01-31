import arcjet, {
  detectBot,
  tokenBucket,
} from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/verifyAuth";

/* ---------------------------------------------
   Arcjet Configuration
---------------------------------------------- */
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // ✅ FIXED typo
  rules: [
    /* 🧠 Bot Detection */
    detectBot({
      allow: ["CATEGORY:SEARCH_ENGINE"],
      mode: "LIVE",
    }),

    /* 🚦 Token Bucket Rate Limiting */
    tokenBucket({
      capacity: 30,      // max requests
      refillRate: 10,    // per minute
      interval: "1m",     // rate limit per IP
    }),
  ],
});

/*************  ✨ Windsurf Command 🌟  *************/
/**
 * Arcjet middleware logic
 *
 * This middleware function will be executed on every page request.
 * It checks for Arcjet protection, verifies the authentication token,
 * and redirects users accordingly.
 *
 * @param {NextRequest} req - Next request object
 * @returns {NextResponse} - Next response object
 */
/* ---------------------------------------------
   Middleware Logic
---------------------------------------------- */
export async function middleware(req: NextRequest) {
  /**
  /* 1️⃣ Arcjet protection */
  const decision = await aj.protect(req,{requested:3});

  if (decision.isDenied()) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  /* 2️⃣ Auth Token Check */
  const token = req.cookies.get("auth_token")?.value;

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");
 if (!isAuthPage) {
    const token = req.cookies.get("loginToken")?.value;
    const user = token && await verifyAuth(token); 

    if (!user) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}
/*******  3fcb0a50-abeb-41ff-b973-a1a287107a18  *******/

/* ---------------------------------------------
   Middleware Matcher
---------------------------------------------- */
export const config = {
  matcher: [
    /*
      Run middleware on all pages except:
      - API routes
      - Next static files
      - Images
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
