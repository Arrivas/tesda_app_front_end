import React from "react";
import Link from "next/link";
import { Bars2Icon } from "@heroicons/react/24/solid";
import Image from "next/image";

const NavMobile = ({ setShowNavMobile, showNavMobile }) => {
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
      <div className="flex flex-row justify-between items-center md:invisible md:h-0 md:p-0">
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
        <button onClick={() => setShowNavMobile(!showNavMobile)}>
          <Bars2Icon className="h-6 w-6" />
        </button>
      </div>
      {showNavMobile && (
        <nav className="py-2">
          {navContents.map((item) => (
            <button
              className="block w-full"
              key={item.id}
              onClick={() => setShowNavMobile(false)}
            >
              <Link href={item.destination}>
                <p className="px-2 py-5  text-start hover:bg-[#22396b]/90 rounded-md hover:text-white">
                  {item.title}
                </p>
              </Link>
            </button>
          ))}
        </nav>
      )}
    </>
  );
};

export default NavMobile;
