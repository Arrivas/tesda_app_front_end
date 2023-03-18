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

const Header = ({ showNav, setShowNav, innerWidth }) => {
  const [showNavMobile, setShowNavMobile] = useState(false);

  const user = useSelector((state) => state.user);
  const navContents = [
    {
      id: 1,
      title: "Home",
      destination: "/",
      icon: (
        <HomeIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
      ),
    },
    {
      id: 2,
      title: "Register Borrower",
      destination: "/rborrower",
      icon: (
        <UserPlusIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
      ),
    },
    {
      id: 3,
      title: "Records/Lists",
      destination: "/",
      icon: (
        <ListBulletIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
      ),
    },
    {
      id: 4,
      title: "Inventory",
      destination: "/",
      icon: (
        <ArchiveBoxIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
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
          {/* <NavMobile
            setShowNavMobile={setShowNavMobile}
            showNavMobile={showNavMobile}
          /> */}
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
                    <p className="font-bold text-[#0035a9]">Tesda Webb App</p>
                    <p className="text-xs">Binmaley, Pangasinan</p>
                  </div>
                )}
              </div>

              {showNav && (
                <button
                  className="block px-2"
                  onClick={() => setShowNav(!showNav)}
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
                  <button
                    key={item.id}
                    className="block w-full"
                    onClick={() => setShowNavMobile(false)}
                  >
                    <Link href={item.destination}>
                      <div className="flex p-5 items-center group flex-row pl-7 hover:bg-[#0035a9] rounded-md">
                        {item.icon}
                        {showNav && (
                          <p className="px-2 text-start text-gray-400 group-hover:text-white">
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
                    onClick={() => setShowNav(!showNav)}
                  >
                    <div className="flex p-5 items-center group flex-row pl-7 hover:bg-[#0035a9] rounded-md">
                      <ArrowsPointingOutIcon className="h-6 w-6 text-gray-400 group-hover:text-white" />
                    </div>
                  </button>
                </nav>
              )}
            </div>
          </div>
        </header>
      )}
      {showNavMobile && (
        <button onClick={() => setShowNavMobile(false)}>
          <div className="absolute bg-black/30 left-0 top-0 h-screen w-screen -z-50" />
        </button>
      )}
    </>
  );
};

export default Header;
