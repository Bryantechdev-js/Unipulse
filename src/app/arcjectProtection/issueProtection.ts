import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

export const issueProtection = arcjet({
    key:process.env.ARCJET_KEY!,
    rules:[
        tokenBucket({
            interval:"24h",
            refillRate:5,
            capacity:5,
        }),
        detectBot({
            mode:'LIVE',
            allow:[]
        }),
        shield({
            mode:'LIVE'
        })
    ]
})