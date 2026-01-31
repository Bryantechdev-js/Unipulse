import arcjet, { detectBot , shield, tokenBucket } from "@arcjet/next";
// import botDetection from "@arcjet/next/botDetection";

export const getEventProtection = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // 🔐 Rate limit: 5 requests per hour
    tokenBucket({
      mode: "LIVE",
      interval: "1m",
      capacity: 5,     // ✅ NOT max
      refillRate: 5,
    }),
    shield({
      mode: "LIVE",
    }),

    // 🤖 Bot protection
    detectBot({
      mode: "LIVE",
      allow: [], // allow no bots
    }),
  ],
});
