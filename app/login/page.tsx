"use client";
import React, { useState } from "react";
import FormikField from "@/components/forms/FormikField";
import AppFormField from "@/components/forms/AppFormField";
import Image from "next/image";
import SubmitButton from "@/components/forms/SubmitButton";
import { useGlobalContext } from "@/context/store";
import axios from "axios";
import links from "@/config/links";

interface ValuesType {
  username: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userData, setUserData } = useGlobalContext();

  const initialValues: ValuesType = {
    username: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    await axios
      .post(
        `${links.default}/auth/login`,
        {
          username: values.username.trim(),
          password: values.password.trim(),
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUserData({ user: res.data?.user, token: res.data?.token });
        console.log(userData);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div className="px-[16px]">
      <div className="flex w-full justify-center pt-[8px]">
        <div className="relative w-28 h-28">
          <Image
            alt="logo"
            src="tesda.svg"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="max-w-[416px] mx-auto pt-[8px]">
        <FormikField initialValues={initialValues} onSubmit={onSubmit}>
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
          <SubmitButton containerClass="" title="Log in" />
        </FormikField>
        {/* or */}

        <div className="w-full relative flex flex-row items-center justify-between mt-[12px] mb-[4px]">
          <span className="w-[999px] h-[1px] bg-gray-300"></span>
          <p className="px-4">or</p>
          <span className="w-[999px] h-[1px] bg-gray-300"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
