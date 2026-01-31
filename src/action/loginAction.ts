"use server"

import { loginProtect } from "@/app/arcjectProtection/loginProtection"
import { connectToDatabase } from "@/lib/db"
import User from "@/lib/Schemas/register"
import { loginValidation } from "@/utils/ZodSchemas"
import { request } from "@arcjet/next"
import bcrypt from "bcryptjs"
// import { revalidatePath } from "next/cache"
// import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"
// import { success } from "zod"
import {SignJWT} from "jose"



export const loginAction =async(data:any)=>{
    //validate user input

    const validate =  await loginValidation.safeParse(data)

    //checking if the data is not valid

    if(!validate.success){
        return{
            success:false,
            error:'invalid data was passed',
            status:400
        }
    }

    // check passed  extract our data

    const {email,password,role} = validate.data

    const req = await request()
    const decision = await loginProtect.protect(req,{email})

    // checking if denied decisions

    if(decision.isDenied()){
        const reason = decision.reason
        let message = ""
        if(reason.isBot()){
            message = "bot activity detected"
        }
        if(reason.isEmail()){
            message = "invalid email"
        }
        if(reason.isShield()){
            message = "shield activity detected"
        }
        if(reason.isRateLimit()){
            message = "too many request try again later"
        }

        return{
            success:false,
            error:message,
            status:400
        }
    }

    try{
           // getting the user with the email from the db and comparing the password
    await connectToDatabase()
    const user  = await User.findOne({email}).select("+password").select("+name").select("+department").select("+matricle").select("+role").lean()
    //checking if the user exist
    if(!user){
        return{
            success:false,
            error:"user with this email doesn't exist",
            status:400
        }
    }

    const isPasswordMatch = await bcrypt.compare(email,user.password)
    const isRoleMatch = await user.role === role;

    if(!isPasswordMatch && !isRoleMatch){
        return{
            success:false,
            error:"invalid password or role,try again",
            status:400
        }
    }

    const payload ={
        id:user._id.toString(),
        name:user.name,
        email,
        role,
        department:user.department,
        matricle:user.matricle
    }

    // creating a login token

     // -------------------------
  // 2️⃣ Create Secret Key
  // -------------------------
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  // -------------------------
  // 3️⃣ Generate Token (1 hour)
  // -------------------------
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h") // 1 hour
    .sign(secret);

  // -------------------------
  // 4️⃣ Save token to cookie
  // -------------------------
  const cookiestore = await cookies()
  cookiestore.set({
    name: "loginToken",
    value: token,
    httpOnly: true,
    secure: true, // important in production
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });  
  return { success: true, message: "Login successful",status:200,role:role};

    }catch(error){
        return {
            success:false,
            error:"some thing went wrong try later",
            status:500
        }
    }
 
}