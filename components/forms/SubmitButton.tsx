import React, { MouseEvent } from "react";
import { useFormikContext } from "formik";

interface SubmitButtonProps {
  title: string;
  containerClass?: string;
}

interface useFormikContextType {
  handleSubmit: (e: MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  containerClass,
}) => {
  const { handleSubmit } = useFormikContext<useFormikContextType>();
  return (
    <div className={`${containerClass}`}>
      <button
        type="submit"
        onClick={() => {
          handleSubmit();
        }}
      >
        <p>{title}</p>
      </button>
    </div>
  );
};

export default SubmitButton;
