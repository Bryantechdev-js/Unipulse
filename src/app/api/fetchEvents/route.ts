import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export const POST=async(req:NextRequest)=>{
    const {id} = await  req.json()

    return NextResponse.json({
        success:true,
        message:"route working"
    })

}