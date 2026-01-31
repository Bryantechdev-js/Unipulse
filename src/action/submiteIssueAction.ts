"use server"

import { issueProtection } from "@/app/arcjectProtection/issueProtection"
import { connectToDatabase } from "@/lib/db"
import { Issue } from "@/lib/Schemas/issueSchema"
// import Issue from "@/lib/Schemas/issueSchema"
import { verifyAuth } from "@/lib/verifyAuth"
import { issueSchemaValidation } from "@/utils/ZodSchemas"
import { request } from "@arcjet/next"
import { error } from "console"
import { cookies } from "next/headers"
// import { success } from "zod"

export const submiteIssueAction =async(data:any)=>{
    //authenticating user
    const token = (await cookies()).get("loginToken")?.value as string
    const user = await verifyAuth(token)

    if(!user){
        return{
            success:false,
            error:'not authorised',
            status:401
        }
    }

    const validate = await issueSchemaValidation.safeParse(data)
    if(!validate.success){
        return{
            success:false,
            error:'invalid data',
            status:400
        }
    }

    const {category,description,anonymous,image} = validate.data ;

    const req = await request()
    const decision = await issueProtection.protect(req,{requested:1})

    if(decision.isDenied()){
        const reason = decision.reason
        if(reason.isBot()){

            return{
                success:false,
                error:'bot activity detected',
                status:400
            }
        }

        if(reason.isShield()){
            return{
                success:false,
                error:'sheild detected',
                status:400
            }
        }

        if(reason.isRateLimit()){
            return{
                success:false,
                error:'too many request, try again later',
                status:400
            }
        }
    }

       // connecting to db

        try{
            await connectToDatabase()
            await Issue.create({
                category,
                description,
                anonymous,
                image,
                status:'open',
                author: anonymous ? null : user.id
            })

            return{
                success:true,
                message:'Issue created successfully',
                status:200
            }

        }catch(error){
            return{
                success:false,
                error:'something went wrong',
                status:500
            }
        }

    //controle engineering
}