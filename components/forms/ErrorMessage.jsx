import React from "react";

const ErrorMessage = ({ error }) => {
  return <>{error && <p className={`text-red-400 bottom-2`}>{error}</p>}</>;
};

export default ErrorMessage;
