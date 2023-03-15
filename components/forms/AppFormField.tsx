// @ts-nocheck
import React from "react";
import { Field } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export interface AppFormFieldProps {
  name: string;
  value: any;
  customError: string;
  placeholder?: string;
  showPassword?: boolean;
  type?: string;
  onShowPassword?: Dispatch<SetStateAction<boolean>>;
}

const AppFormField: React.FC<AppFormFieldProps> = ({
  name,
  value,
  customError,
  placeholder,
  showPassword,
  onShowPassword,
  type = "text",
  ...rest
}) => {
  // const { setFieldTouched, handleChange, errors, touched, values, setValues } =
  //   useFormikContext<AppFormFieldProps>();
  console.log(type === "password", showPassword);
  return (
    <>
      <div className="w-full relative flex-1 flex items-center justify-center text-center border border-gray-200 rounded-md">
        <Field
          autoComplete="off"
          className="p-[12px] w-full bg-[#f5f6f7]"
          name={name}
          placeholder={placeholder}
          type={type === "password" || showPassword ? "password" : "text"}
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
    </>
  );
};

export default AppFormField;
