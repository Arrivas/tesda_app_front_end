// @ts-nocheck
import React from "react";
import { Field, useFormikContext } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const AppFormField = ({
  name,
  value,
  customError,
  placeholder,
  showPassword = false,
  onShowPassword,
  type = "text",
  ...rest
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <div className="w-full relative flex-1 flex items-center justify-center text-center border border-gray-200 rounded-md">
        <Field
          autoComplete="off"
          className={`p-[12px] w-full bg-[#f5f6f7] ${
            type === "password" ? "pr-10" : ""
          }`}
          name={name}
          placeholder={placeholder}
          type={type === "password" && !showPassword ? "password" : "text"}
          {...rest}
        />
        {type === "password" && (
          <button
            className="flex items-center justify-center text-center"
            title="show password"
            onClick={() => onShowPassword(!showPassword)}
            type="button"
          >
            {!showPassword ? (
              <EyeSlashIcon
                height={20}
                width={20}
                className="text-gray-400 absolute right-2"
              />
            ) : (
              <EyeIcon
                height={20}
                width={20}
                className="text-gray-400 absolute right-2"
              />
            )}
          </button>
        )}
      </div>
      {errors[name] && touched[name] && (
        <p className={`text-red-400 bottom-2`}>{errors[name]}</p>
      )}
    </>
  );
};

export default AppFormField;
