import React from "react";
import { useFormikContext } from "formik";
import Spinner from "../Spinner";

const SubmitButton = ({
  title,
  containerClass,
  textClass,
  disabled,
  ...rest
}) => {
  const { handleSubmit } = useFormikContext();
  return (
    <button
      className={`w-full h-[40px] mt-[12px] flex items-center justify-center rounded-md ${
        !disabled ? "bg-[#203a6b]" : "bg-gray-400"
      } ${!disabled && "hover:bg-[#2c5093]"} ${containerClass}`}
      type="submit"
      onClick={() => {
        handleSubmit();
      }}
      {...rest}
    >
      <p className={`text-[17px] text-white font-semibold ${textClass}`}>
        {title}
      </p>
      {disabled && <Spinner />}
    </button>
  );
};

export default SubmitButton;
