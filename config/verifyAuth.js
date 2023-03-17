import { jwtVerify } from "jose";

export const verifyToken = async (token) => {
  if (!token) return null;
  const verify = await jwtVerify(
    token,
    new TextEncoder().encode("super secret hehe")
  );
  return verify?.payload;
};
