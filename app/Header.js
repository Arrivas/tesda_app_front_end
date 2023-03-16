"use client";
import React, { useState } from "react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const user = useSelector((state) => state.user);

  const navContents = [
    {
      id: 1,
      title: "Home",
      destination: "/",
    },
    {
      id: 2,
      title: "Register Borrower",
      destination: "/rborrower",
    },
    {
      id: 3,
      title: "Records/Lists",
      destination: "/",
    },
    {
      id: 4,
      title: "Inventory",
      destination: "/",
    },
    {
      id: 5,
      title: "Logout",
      destination: "/",
    },
  ];

  return (
    <>
      {user?.userData && (
        <header className={`p-5 bg-white flex-col items-center justify-center`}>
          <nav className="flex flex-row justify-between items-center">
            <Link href={"/"}>
              <div className="relative h-14 w-14 cursor-pointer">
                <Image
                  alt="logo"
                  src="tesda.svg"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <button onClick={() => setShowNav(!showNav)}>
              <Bars2Icon className="h-6 w-6" />
            </button>
          </nav>
          {showNav && (
            <nav className="py-2">
              {navContents.map((item) => (
                <Link href={item.destination} key={item.id}>
                  <p className="px-2 py-5 hover:bg-[#22396b] rounded-md hover:text-white">
                    {item.title}
                  </p>
                </Link>
              ))}
            </nav>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
