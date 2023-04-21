"use client";
import React, { useState } from "react";
import {
  ChevronLeftIcon,
  HomeIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
  ListBulletIcon,
  ArchiveBoxIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const Header = ({ showNav, setShowNav, innerWidth }) => {
  const [isHovering, setIsHovering] = useState(false);
  const user = useSelector((state) => state.user);
  const pathName = usePathname();

  const navContents = [
    {
      id: 1,
      title: "Home",
      destination: "/",
      icon: (
        <HomeIcon
          className={`h-6 w-6 ${
            pathName === "/" && !isHovering ? "text-white" : "text-gray-400"
          } group-hover:text-white  transition-colors duration-300`}
        />
      ),
    },
    {
      id: 2,
      title: "Borrow",
      destination: "/borrow",
      icon: (
        <UserPlusIcon
          className={`h-6 w-6 ${
            pathName === "/borrow" && !isHovering
              ? "text-white"
              : "text-gray-400"
          } group-hover:text-white  transition-colors duration-300`}
        />
      ),
    },
    // {
    //   id: 3,
    //   title: "Records/Lists",
    //   destination: "/",
    //   icon: (
    //     <ListBulletIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
    //   ),
    // },
    {
      id: 4,
      title: "Inventory",
      destination: "/inventory",
      icon: (
        <ArchiveBoxIcon
          className={`h-6 w-6 group-hover:text-white ${
            pathName === "/inventory" && !isHovering
              ? "text-white"
              : "text-gray-400  transition-colors duration-300"
          }`}
        />
      ),
    },
    {
      id: 5,
      title: "Logout",
      destination: "/logout",
      icon: (
        <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
      ),
    },
  ];

  return (
    <>
      {user?.user && (
        //  flex-col items-center justify-center
        <header className={` bg-white md:p-0`}>
          <div
            className={`bg-[#fafafa] p-2 h-screen rounded-r-md relative left-0 top-0`}
          >
            {/* logo */}
            <div
              className={`${
                showNav && "flex"
              } flex-row items-center justify-between`}
            >
              <div className="flex flex-row">
                <Link className="flex-1" href={"/"}>
                  <div className="relative h-12 w-12 cursor-pointer mx-auto">
                    <Image
                      alt="logo"
                      src="/tesda_alt.svg"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </Link>
                {showNav && (
                  <div className="hidden md:block pl-1">
                    <p className="font-bold text-[#0035a9]">TESDA-PTI</p>
                    <p className="text-xs">Binmaley, Pangasinan</p>
                  </div>
                )}
              </div>

              {showNav && (
                <button
                  className="block px-2"
                  onClick={() => {
                    setShowNav(!showNav);
                    localStorage.setItem("mobile", !showNav);
                  }}
                >
                  <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
            {/* line */}
            <hr className="w-full bg-gray-200 h-[1px] my-3" />
            {/* nav 1 */}
            <div className="flex justify-between flex-col h-[70%] md:h-[90%]">
              <nav className="py-2">
                {navContents.map((item) => (
                  <button key={item.id} className="block w-full">
                    <Link href={item.destination}>
                      <div
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`flex p-3 mt-2 items-center group flex-row pl-7 ${
                          item.destination === pathName && !isHovering
                            ? "bg-[#0035a9]"
                            : ""
                        } rounded-md hover:bg-[#0035a9] transition-colors duration-300 `}
                      >
                        {item.icon}
                        {showNav && (
                          <p
                            className={`px-2 text-start ${
                              item.destination === pathName && !isHovering
                                ? "text-white"
                                : "text-gray-400"
                            } font-semibold group-hover:text-white transition-colors duration-300`}
                          >
                            {item.title}
                          </p>
                        )}
                      </div>
                    </Link>
                  </button>
                ))}
              </nav>
              {!showNav && innerWidth >= 640 && (
                <nav className="py-2">
                  <button
                    className="block w-full"
                    onClick={() => {
                      setShowNav(!showNav);
                      localStorage.setItem("mobile", !showNav);
                    }}
                  >
                    <div className="flex p-3 items-center group flex-row pl-7 hover:bg-[#0035a9] rounded-md">
                      <ArrowsPointingOutIcon
                        className={`h-6 w-6 text-gray-400 group-hover:text-white`}
                      />
                    </div>
                  </button>
                </nav>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
