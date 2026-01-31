"use server"

import { cookies } from "next/headers"
import { success } from "zod"
import { verifyAuth } from "./verifyAuth";

export const logout=async()=>{
    //checking if user is logged in
    const token = (await cookies()).get("loginToken")?.value as string;
    const user = await verifyAuth(token);
    if(!user){
        return{
            success:false,
            error:"logout already done",
            status:401
        }
    }
    (await cookies()).delete("loginToken")
    return{
        success:true,
        message:"Logged out successfully",
        status:200
    }
}