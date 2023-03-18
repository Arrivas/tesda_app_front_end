"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("jwt");
    dispatch(setUser(null));
    router.replace("/login");
  };
  useEffect(() => {
    logout();
  }, []);
  return null;
};

export default Logout;
