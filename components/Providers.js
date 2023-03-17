"use client";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/config/verifyAuth";
import { setUser } from "@/store/userSlice";
import axios from "axios";
import links from "@/config/links";

const Providers = ({ children }) => {
  const router = useRouter();
  const getUser = async () => {
    const jwt = localStorage.getItem("jwt");
    const verifiedToken = await verifyToken(jwt);
    if (verifiedToken) {
      await axios
        .get(`${links.default}/user/get/${verifiedToken.id}`)
        .then((res) => {
          store.dispatch(setUser(res.data));
          router.replace("/");
        })
        .catch((err) => console.log(err));
    } else {
      router.replace("/login");
    }
  };

  useEffect(() => {
    let ready = true;
    if (ready) {
      getUser();
    }
    return () => {
      ready = false;
    };
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
