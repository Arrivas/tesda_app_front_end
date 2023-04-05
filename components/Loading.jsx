import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Image
        alt="logo"
        src="/tesda_alt.svg"
        className="object-cover animate-pulse"
        height={300}
        width={300}
        priority
      />
    </div>
  );
};

export default Loading;
