import arcjet, { detectBot, shield } from "@arcjet/next";

const AssigmentProtection = arcjet({
    key:process.env.ARCJET_KEY!,
    rules:[
        detectBot({
            mode:'LIVE',
            allow:[]
        }),
        shield({
            mode:'LIVE'
        })
    ]
})