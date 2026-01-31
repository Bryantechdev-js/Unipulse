import arcjet,{ detectBot , shield, tokenBucket} from "@arcjet/next";

export const eventProtection = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    detectBot({
      mode: "LIVE",
      allow: [], // allow no bots
    }),
    shield({
      mode: "LIVE",
    }),
     tokenBucket({
         mode: "LIVE",
         interval: "1m",
         capacity: 5,     // ✅ NOT max
         refillRate: 5,
       }),
  ],
});
