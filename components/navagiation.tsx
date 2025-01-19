"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import {
  FaHome,
  FaPenAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
  LuCirclePlus,
  FaUser,
} from "@/utils/icons";
import SignIn from "./sign-in";
import Image from "next/image";
import { Button } from "./ui/button";

const Navigation = () => {
  const { status, data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    if (!isPopupVisible) {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupVisible]);

  const authorInitial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : "";

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const toggleSignIn = () => {
    setSignIn((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center justify-between my-6 md:my-16 px-4 ">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center bg-white text-darkBlue text-lg rounded-full p-2 hover:shadow-2xl hover:text-lightBlue font-semibold">
          <FaHome className="mr-2" size={20} />
          BlogMan
        </Link>
        {/* desktop */}
        <div className="hidden md:flex space-x-7  px-6 relative">
          <Link
            href="/post"
            className="hover:text-lightBlue flex items-center justify-center">
            <div className="flex items-center">
              <FaPenAlt className="mr-1" size={20} />
            </div>
            Post
          </Link>
          <Link
            href="/create-post"
            className="hover:text-lightBlue flex items-center justify-center">
            <LuCirclePlus className="mr-1" size={20} />
            Create Post
          </Link>
          {status === "authenticated" ? (
            <>
              <div
                ref={popupRef}
                className={`absolute z-30 right-0 top-20 bg-white text-darkBlue p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${
                  isPopupVisible ? "flex" : "hidden"
                }`}>
                <div className="font-bold">{session?.user?.name}</div>
                <div>{session?.user?.email}</div>
                <Link
                  onClick={() => setIsPopupVisible(false)}
                  className="hover:underline"
                  href={"/dashboard"}>
                  Dashboard
                </Link>
                <Link
                  onClick={() => setIsPopupVisible(false)}
                  className="hover:underline"
                  href={"/account"}>
                  Account
                </Link>
                <Button
                  onClick={() => signOut()}
                  className=" bg-darkBlue text-white">
                  Sign Out
                </Button>
              </div>

              <div className="flex gap-2 items-center">
                <Image
                  src={session?.user?.image || <FaUser />}
                  width={36}
                  height={36}
                  alt={`${authorInitial}`}
                  className="rounded-full cursor-pointer bg-white text-darkBlue font-bold text-center text-2xl"
                  onClick={() => setIsPopupVisible((prev) => !prev)}
                />
              </div>
            </>
          ) : (
            <div
              // href="/sign-in"
              onClick={toggleSignIn}
              className="hover:text-lightBlue flex items-center justify-center cursor-pointer">
              <FaSignInAlt className="mr-1" size={20} />
              Login
            </div>
          )}
        </div>

        {/* menu br */}
        <div className="md:hidden cursor-pointer flex items-center gap-2">
          {status === "authenticated" ? (
            <>
              <div
                ref={popupRef}
                className={`absolute z-30 right-10 top-20 bg-white text-darkBlue p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${
                  isPopupVisible ? "flex" : "hidden"
                }`}>
                <div className="font-bold">{session?.user?.name}</div>
                <div>{session?.user?.email}</div>
                <Link
                  onClick={() => setIsPopupVisible(false)}
                  className="hover:underline"
                  href={"/dashboard"}>
                  Dashboard
                </Link>
                <Link
                  onClick={() => setIsPopupVisible(false)}
                  className="hover:underline"
                  href={"/account"}>
                  Account
                </Link>
                <Button
                  onClick={() => signOut()}
                  className=" bg-darkBlue text-white">
                  Sign Out
                </Button>
              </div>

              <div className="flex gap-2 items-center">
                <Image
                  src={session?.user?.image || <FaUser />}
                  width={36}
                  height={36}
                  alt={`${authorInitial}`}
                  className="rounded-full cursor-pointer bg-white text-darkBlue font-bold text-center text-2xl"
                  onClick={() => setIsPopupVisible((prev) => !prev)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {menuOpen ? (
            <FaTimes size={30} onClick={toggleMenu} />
          ) : (
            <FaBars size={30} onClick={toggleMenu} />
          )}
        </div>
      </div>
      {/* mobile */}
      <div
        className={`md:hidden w-full h-full bg-white text-darkBlue  flex flex-col items-c justify-center text-start transition-transform duration-300 absolute z-50 p-6  ${
          menuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}>
        <Link
          href="/post"
          className="hover:text-lightBlue flex items-center justify-center mb-8 text-2xl"
          onClick={() => setMenuOpen(false)}>
          <FaPenAlt className="mr-1" size={20} />
          Post
        </Link>
        <Link
          href="/create-post"
          className="hover:text-lightBlue flex items-center justify-center mb-8 text-2xl"
          onClick={() => setMenuOpen(false)}>
          <LuCirclePlus className="mr-1" size={20} />
          Create post
        </Link>
        <div
          className="hover:text-lightBlue flex items-center justify-center mb-8 text-2xl cursor-pointer"
          onClick={() => {
            toggleSignIn();
            setMenuOpen(false);
          }}>
          <FaSignInAlt className="mr-1" size={20} />
          {status === "authenticated" ? (
            <div onClick={() => signOut()}>Sign Out</div>
          ) : (
            <>Login</>
          )}
        </div>
      </div>
      {signIn && (
        <div className=" absolute left-0 top-30 right-0 w-full h-full z-30">
          <SignIn toggleSignIn={toggleSignIn} />
        </div>
      )}
    </>
  );
};

export default Navigation;
