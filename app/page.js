"use client";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const cookie = localStorage.getItem("jwt");
    console.log(cookie);
  }, []);
  return <div>Home</div>;
};

export default Home;
