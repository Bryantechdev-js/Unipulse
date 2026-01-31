import arcjet, { shield, detectBot, fixedWindow } from "@arcjet/next";

export const assignmentProtect = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE" , allow: [] }),
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 10,
    }),
  ],
});
