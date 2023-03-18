"use client";
import * as jose from "jose";

export const verifyToken = async (token) => {
  if (!token) return null;
  if (window.CryptoKey) {
    try {
      const verify = await jose.jwtVerify(
        token,
        new TextEncoder().encode("super secret hehe")
      );
      return verify?.payload;
    } catch (error) {
      alert(error);
    }
  } else alert("haha");
};
