"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchMessage, setMatchMessage] = useState("");

  return (
    <div className="relative h-screen w-full bg-white dark:bg-black overflow-hidden pt-12">
      {/* green top */}
      <div className="absolute sm:-top-4 left-0 w-full h-1/3">
        <svg viewBox="0 1.5 20 10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0 0 L 24 0 L 24 4 C 18 8 11 4 0 2"
            fill="#aad3b0"
            stroke="#aad3b0"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* form */}
      <div className="flex items-center justify-center h-full w-full md:w-1/2">
        <div className="w-full max-w-md p-6 space-y-4 relative">
          <div className="w-max space-y-2">
            {/* heading */}
            <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-1.5">
              SIGN UP
            </h1>
            <hr className="bg-[#579e86] h-1.5 rounded-2xl" />
          </div>

          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (password === confirmPassword) {
                setMatchMessage("Passwords match");
              } else {
                setMatchMessage("Passwords do not match");
              }
            }}
          >
            
            {/* Already a User */}
            <p className="text-sm text-right text-gray-600 dark:text-slate-400">
              Already a User?{" "}
              <Link
                href="/auth/login"
                className="text-sm text-[#4cafac] hover:underline"
              >
                Sign In
              </Link>
            </p>

            {/* E-Mail */}
            <div className="relative">
              <MdEmail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600"
                size={20}
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-Mail ID"
                className="pl-10 pr-4 py-2 bg-[#d0e7c2] text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4cafac]0"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <RiLockPasswordFill
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600"
                size={20}
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="pl-10 pr-4 py-2 bg-[#d0e7c2] text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#4cafac]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaCheckCircle
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600"
                size={18}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="pl-10 pr-4 py-2 bg-[#d0e7c2] text-black rounded-md dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4cafac]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/*Password Match Message */}
            <p
              className={`text-right font-medium h-5 ${
                matchMessage.includes("not")
                  ? "text-red-600"
                  : matchMessage
                  ? "text-green-600"
                  : ""
              }`}
            >
              {matchMessage || ""}
            </p>

            <div className="flex flex-col gap-4">
              {/* Continue */}
              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#4cafac] hover:bg-[#3b998f] text-white dark:text-white  rounded-full"
              >
                Continue
              </Button>

              {/* Divider */}
              <div className="flex items-center">
                <hr className="flex-grow border-gray-600" />
                <span className="px-2 text-sm text-gray-400">OR</span>
                <hr className="flex-grow border-gray-600" />
              </div>

              {/* Google icon */}
              <Button
                className={`cursor-pointer flex items-center w-full gap-4 bg-white dark:bg-black border-2 border-gray-300 dark:border-white text-black dark:text-white rounded-md`}
                variant="outline"
              >
                <FcGoogle size="25" />
                Continue With Google
              </Button>
            </div>
          </form>

          <p className="mt-4 text-xs text-slate-400 text-center">
            ©2025 All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
