"use client";
import React, { useState } from "react";
import FormikField from "@/components/forms/FormikField";
import AppFormField from "@/components/forms/AppFormField";
import Image from "next/image";
import SubmitButton from "@/components/forms/SubmitButton";

interface ValuesType {
  username: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: ValuesType = {
    username: "",
    password: "",
  };
  const onSubmit = (values: any) => {
    console.log(values);
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
          <SubmitButton title="Log in" />
        </FormikField>
      </div>
    </div>
  );
};

export default Login;
