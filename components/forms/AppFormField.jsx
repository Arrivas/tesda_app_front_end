import React from "react";
import { Field, useFormikContext } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const AppFormField = ({
  name,
  value,
  customError,
  placeholder = "",
  showPassword = false,
  onShowPassword,
  type = "text",
  fieldClass = "",
  label = "",
  ...rest
}) => {
  const { errors, touched } = useFormikContext();

  return (
    <div className="w-full bg-white ">
      {label && (
        <span className="px-3 font-semibold bg-white text-xs w-full break-words">
          {label}
        </span>
      )}

      <div
        className={`${
          label ? "flex-col" : null
        } w-full relative flex-1 flex items-center p-[1px] justify-center text-start border border-gray-400 rounded-md`}
      >
        <Field
          autoComplete="off"
          className={`p-[12px] ${
            label && "pt-2"
          } w-full bg-white ${fieldClass} ${
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
      {errors[name] && (
        <p className={`text-red-400 bottom-2 h-[24px]`}>{errors[name]}</p>
      )}
    </div>
  );
};

export default AppFormField;
