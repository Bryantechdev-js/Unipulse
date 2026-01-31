import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
// import { Key } from "lucide-react";
// import { ru } from "zod/v4/locales";

export const suggestionProtection = arcjet({
    key:process.env.ARCJET_KEY!,
    rules:[
        detectBot({
            mode:'LIVE',
            allow:[]
        }),
        shield({
            mode:'LIVE'
        }),
            tokenBucket({
                interval:"5m",
                refillRate:5,
                capacity:5,
            })
    ]
})