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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUser = async () => {
    let jwt = localStorage.getItem("jwt");
    let hasUser = localStorage.getItem("hasUser");

    const verifiedToken = await verifyToken(jwt);
    if (verifiedToken) {
      await axios
        .get(`${links.default}/user/get/${verifiedToken.id}`)
        .then((res) => {
          store.dispatch(setUser(res.data));
          if (!jwt || !hasUser) return router.replace("/");
        })
        .catch((err) => console.log(err));
    } else {
      router.replace("/login");
    }
  };

  useEffect(() => {
    let ready = true;
    if (ready) {
      setLoading(true);
      getUser();
      setLoading(false);
    }
    return () => {
      ready = false;
    };
  }, []);
  return <Provider store={store}>{loading ? <>loading</> : children}</Provider>;
};

export default Providers;
