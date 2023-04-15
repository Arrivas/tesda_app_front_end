"use client";
import React, { useState } from "react";
import FormikField from "@/components/forms/FormikField";
import AppFormField from "@/components/forms/AppFormField";
import Image from "next/image";
import SubmitButton from "@/components/forms/SubmitButton";
import axios from "axios";
import links from "@/config/links";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { login } from "@/helper/auth";
import * as Yup from "yup";
import ErrorMessage from "@/components/forms/ErrorMessage";
import { toast } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required().max(32).min(6),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    await axios
      .post(`${links.default}/auth/login`, {
        username: values.username.trim(),
        password: values.password.trim(),
      })
      .then(async (res) => {
        localStorage.setItem("jwt", res.data?.token);
        localStorage.setItem("hasUser", true);
        const user = await login();
        dispatch(setUser(user));
        router.replace("/");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "something went wrong, server is not available",
          {
            position: "top-center",
          }
        );
        // setAuthError(
        //   error.response?.data?.message ||
        //     "something went wrong, server is not available"
        // );
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div className="px-[16px] relative">
      <div className="w-[50%] h-[250px] fixed bottom-0 left-0 -z-10">
        <Image
          alt="logo"
          src="/banner.png"
          fill
          className="object-contain opacity-60"
          priority
        />
      </div>
      <div className="flex w-full justify-center pt-[20px]">
        <div className="relative w-32 h-32">
          <Image
            alt="logo"
            src="/tesda_alt.svg"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative w-28 h-28">
          <Image
            alt="logo"
            src="/tesda.svg"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="max-w-[416px] mx-auto pt-[8px]">
        <FormikField
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="username"
            value={undefined}
            placeholder="username"
            customError={""}
          />
          <div className="p-[4px]" />
          <AppFormField
            name="password"
            value={undefined}
            placeholder="password"
            customError={""}
            type="password"
            onShowPassword={setShowPassword}
            showPassword={showPassword}
          />
          {/* <ErrorMessage error={authError} /> */}
          <SubmitButton disabled={loading} title="Log in" />
        </FormikField>
        {/* or */}

        {/* <div className="w-full relative flex flex-row items-center justify-between mt-[12px] mb-[4px]">
          <span className="w-[999px] h-[1px] bg-gray-300"></span>
          <p className="px-4">or</p>
          <span className="w-[999px] h-[1px] bg-gray-300"></span>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
