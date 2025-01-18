"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaPenAlt,
  FaSignInAlt,
  FaBars,
  FaTimes,
  LuCirclePlus,
} from "@/utils/icons";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between my-6 md:my-16 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center bg-white text-darkBlue text-lg rounded-full p-2 hover:shadow-2xl hover:text-lightBlue font-semibold">
          <FaHome className="mr-2" size={20} />
          BlogMan
        </Link>
        {/* desktop */}
        <div className="hidden md:flex space-x-7  px-6">
          <Link
            href="/post"
            className="hover:text-primary flex items-center justify-center">
            <div className="flex items-center">
              <FaPenAlt className="mr-1" size={20} />
            </div>
            Post
          </Link>
          <Link
            href="/create-post"
            className="hover:text-primary flex items-center justify-center">
            <LuCirclePlus className="mr-1" size={20} />
            Create Post
          </Link>
          <Link
            href="login"
            className="hover:text-primary flex items-center justify-center">
            <FaSignInAlt className="mr-1" size={20} />
            Login
          </Link>
        </div>
        {/* menu br */}
        <div className="md:hidden cursor-pointer flex items-center gap-2">
          {menuOpen ? (
            <FaTimes size={30} onClick={toggleMenu} />
          ) : (
            <FaBars size={30} onClick={toggleMenu} />
          )}
        </div>
      </div>
      {/* mobile */}
      <div
        className={`md:hidden w-full h-auto bg-white text-darkBlue  flex flex-col items-c justify-center text-start transition-transform duration-300 absolute z-50 p-6  ${
          menuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}>
        <Link
          href="/post"
          className="hover:text-primary flex items-center justify-center mb-8 text-2xl"
          onClick={() => setMenuOpen(false)}>
          <FaPenAlt className="mr-1" size={20} />
          Post
        </Link>
        <Link
          href="/create-post"
          className="hover:text-primary flex items-center justify-center mb-8 text-2xl"
          onClick={() => setMenuOpen(false)}>
          <LuCirclePlus className="mr-1" size={20} />
          Create post
        </Link>
        <Link
          href="/login"
          className="hover:text-primary flex items-center justify-center mb-8 text-2xl"
          onClick={() => setMenuOpen(false)}>
          <FaSignInAlt className="mr-1" size={20} />
          Login
        </Link>
      </div>
    </>
  );
};

export default Navigation;
