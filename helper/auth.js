import axios from "axios";
import links from "@/config/links";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import Cookies from "js-cookie";

const useLogin = () => {
  const cookie = Cookies.get("jwt");
  if (cookie) console.log(cookie);
};

export { useLogin };
