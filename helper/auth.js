import { verifyToken } from "@/config/verifyAuth";
import links from "@/config/links";
import axios from "axios";

const login = async () => {
  const jwt = localStorage.getItem("jwt");
  const verifiedToken = await verifyToken(jwt);
  if (!verifiedToken) return;
  let currentUser = {};
  await axios
    .get(`${links.default}/user/get/${verifiedToken.id}`)
    .then((res) => {
      currentUser = res.data;
    })
    .catch((err) => console.log(err));
  return currentUser;
};

const checkToken = async () => {
  const jwt = localStorage.getItem("jwt");
  const verifiedToken = await verifyToken(jwt);
  if (verifiedToken) return true;
  return false;
};

export { login, checkToken };
