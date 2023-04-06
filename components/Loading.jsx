import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Image
        alt="logo"
        src="/tesda_alt.svg"
        className="object-cover animate-pulse"
        width="0"
        height="0"
        sizes="100vw"
        style={{ width: "300px", height: "auto" }}
        priority
      />
    </div>
  );
};

export default Loading;
