import { cookies } from "next/headers"

export const TestToken =async()=>{
    const payload ={
        id:0,
        name:"bryantech",
        email:'bryantech.dev@gmail.com'
    }

    const cookiesstor = await cookies()
    cookiesstor.set("auth_key",JSON.stringify(payload))
}

