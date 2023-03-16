import { jwtVerify } from "jose";

export const verifyAuth = async (token) => {
  try {
    const verify = await jwtVerify(
      token,
      new TextEncoder().encode("super secret hehe")
    );
    return verify.payload;
  } catch (error) {
    throw new Error("invalid token/expired");
  }
};
