import React, { MouseEvent } from "react";
import { useFormikContext } from "formik";

interface SubmitButtonProps {
  title: string;
  containerClass?: string;
  textClass?: string;
}

interface useFormikContextType {
  handleSubmit: (e: MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  containerClass,
  textClass,
}) => {
  const { handleSubmit } = useFormikContext<useFormikContextType>();
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
