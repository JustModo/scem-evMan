"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function RegisterPage() {
  const [isDark, setIsDark] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchMessage, setMatchMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.toggle("dark", isDark);
    }
  }, [isDark]);

  return (
    // main div
    <div className="relative h-screen w-full bg-white dark:bg-black">
      {/* toggle dark mode */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-14 h-7 flex items-center p-1 rounded-full transition-colors duration-300 ${
            isDark ? "bg-[#4cafac]" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${
              isDark ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <BsMoonFill className="text-[#121212] text-xs" />
            ) : (
              <BsSunFill className="text-yellow-500 text-xs" />
            )}
          </div>
        </button>
      </div>

      {/* green top */}
      <div className="absolute top-0 left-0 w-full h-1/2">
        <svg viewBox="0 1.5 20 10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0 0 L 24 0 L 24 4 C 18 8 11 4 0 2"
            fill="#aad3b0"
            stroke="#aad3b0"
            stroke-width="1"
          />
        </svg>
      </div>

      {/* form */}
      <div className="flex justify-items-center md:justify-items-start h-screen items-end p-8 lg:px-40">
        <div className="w-full max-w-md p-6 space-y-4">
          <h1 className="text-6xl font-bold text-black dark:text-white mb-1.5">
            SIGN UP
          </h1>
          <hr className="bg-[#579e86] h-1.5 w-[35%] rounded-2xl" />
          <form
            className="space-y-6 scale-z-100"
            onSubmit={(e) => {
              e.preventDefault();
              if (password === confirmPassword) {
                setMatchMessage("Passwords match");
              } else {
                setMatchMessage("Passwords do not match");
              }
            }}
          >
            <p className="text-right text-black dark:text-white mb-2">
              Already a User?{" "}
              <a
                className="hover:underline text-[#4cafac]"
                href="https://www.google.com"
              >
                Login
              </a>
            </p>
            <div className="relative">
              <MdEmail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-black"
                size={20}
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-Mail ID"
                className="pl-12 pr-4 bg-[#d0e7c2] dark:bg-[#d0e7c2] dark:text-black placeholder:text-gray-700"
                required
              />
            </div>

            <div className="relative">
              <RiLockPasswordFill
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-black"
                size={20}
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="pl-12 pr-4 bg-[#d0e7c2] dark:bg-[#d0e7c2] dark:text-black placeholder:text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="relative mb-1">
              <FaCheckCircle
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black dark:text-black"
                size={18}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="pl-12 pr-4 bg-[#d0e7c2] dark:bg-[#d0e7c2] dark:text-black placeholder:text-gray-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <p
              className={`text-right font-medium ${
                matchMessage.includes("not")
                  ? "text-red-600"
                  : matchMessage
                  ? "text-green-600"
                  : "text-black dark:text-white"
              }`}
            >
              {matchMessage || "Matches"}
            </p>

            <div className="flex flex-col lg:gap-12 items-center lg:flex-row gap-3">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#4cafac] hover:bg-[#3b998f] text-white dark:text-white font-bold text-md rounded-full"
              >
                CONTINUE
              </Button>
              <p>or</p>
              <Button
                className={`flex items-center w-full gap-4 cursor-pointer ${
                  isDark
                    ? "bg-black border-white text-white"
                    : "bg-white border-lightgray text-black"
                } border-2 rounded-md`}
                variant="outline"
              >
                <FcGoogle size="25" />
                Continue With Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
