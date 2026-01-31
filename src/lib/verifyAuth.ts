import { jwtVerify } from "jose";

export async function verifyAuth(token: string) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role:payload.role,
      department:payload.department,
      matricle:payload.matricle
    };
  } catch (err) {
    console.error("verifyAuth error:", err);
    return null;
  }
}



