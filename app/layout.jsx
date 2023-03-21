"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import Header from "./Header";
import Providers from "@/components/Providers";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, location }) {
  const [innerWidth, setInnerWidth] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.outerWidth);
      if (window.outerWidth > 640) setShowNav(true);
    }
  }, []);

  return (
    <html lang="en">
      {/* <Head>
        <meta name="robots" content="noindex" />
      </Head> */}
      <body>
        <Toaster />
        <Providers>
          <div className="flex h-screen overflow-hidden">
            {pathName !== "/login" && (
              <div className={`${showNav ? "w-[300px]" : "w-[100px]"}`}>
                <Header
                  showNav={showNav}
                  setShowNav={setShowNav}
                  innerWidth={innerWidth}
                />
              </div>
            )}

            <div className="w-screen flex-col justify-center items-center">
              {children}
            </div>
            {/* main content */}
          </div>
        </Providers>
      </body>
    </html>
  );
}