import React from "react";
import { useFormikContext } from "formik";

const SubmitButton = ({ title, containerClass, textClass }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <button
      className={`w-full h-[40px] mt-[12px] flex items-center justify-center rounded-md bg-[#203a6b] hover:bg-[#2c5093] ${containerClass}`}
      type="submit"
      onClick={() => {
        handleSubmit();
      }}
    >
      <p
        className={`text-[17px] text-white font-semibold shadow-md ${textClass}`}
      >
        {title}
      </p>
    </button>
  );
};

export default SubmitButton;
