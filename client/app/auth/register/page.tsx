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
    <div className="relative h-screen w-full bg-card overflow-hidden pt-12">
      {/* toggle dark mode */}
      <div className="absolute top-20 right-4 z-10">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`w-14 h-7 flex items-center p-1 rounded-full transition-colors duration-300 ${
            isDark ? "bg-primary-400" : "bg-muted"
          }`}
        >
          <div
            className={`w-5 h-5 bg-card rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${
              isDark ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <BsMoonFill className="text-foreground text-xs" />
            ) : (
              <BsSunFill className="text-yellow-500 text-xs" />
            )}
          </div>
        </button>
      </div>

      {/* green top */}
      <div className="absolute sm:-top-4 left-0 w-full h-1/3">
        <svg viewBox="0 1.5 20 10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0 0 L 24 0 L 24 4 C 18 8 11 4 0 2"
            fill="var(--color-primary-200)"
            stroke="var(--color-primary-200)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* form */}
      <div className="flex items-center justify-center h-full w-full md:w-1/2">
        <div className="w-full max-w-md p-6 space-y-4 relative">
          <div className="w-max space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-card-foreground mb-1.5">
              SIGN UP
            </h1>
            <hr className="bg-primary-400 h-1.5 rounded-2xl" />
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
            <p className="text-right text-card-foreground">
              Already a User?{" "}
              <a className="hover:underline text-primary-400" href="/auth/login">
                Login
              </a>
            </p>

            {/* E-Mail */}
            <div className="relative">
              <MdEmail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-card-foreground"
                size={20}
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-Mail ID"
                className="pl-12 pr-4 bg-muted text-card-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <RiLockPasswordFill
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-card-foreground"
                size={20}
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="pl-12 pr-4 bg-muted text-card-foreground placeholder:text-muted-foreground"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaCheckCircle

                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-card-foreground"
                size={18}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="pl-12 pr-4 bg-muted text-card-foreground placeholder:text-muted-foreground"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/*Password Match Message */}
            <p
              className={`text-right font-medium h-5 ${
                matchMessage.includes("not")
                  ? "text-destructive"
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
                className="w-full cursor-pointer bg-primary-400 hover:bg-primary-600 text-primary-foreground rounded-full"
              >
                Continue
              </Button>

              {/* Divider */}
              <div className="flex items-center">
                <div className="h-px bg-muted w-full"></div>
                <span className="px-2 text-sm text-muted-foreground whitespace-nowrap">OR</span>
                <div className="h-px bg-muted w-full"></div>
              </div>

              {/* Google icon */}
              <Button
                className={`cursor-pointer flex items-center w-full gap-4 bg-white dark:bg-black border-2 border-gray-300 dark:border-white text-black dark:text-white rounded-md`}

                /*className={`flex items-center justify-center w-full gap-4 cursor-pointer ${
                  isDark
                    ? "bg-card border-card-foreground text-card-foreground"
                    : "bg-card border-muted text-card-foreground"
                } border-2 rounded-md`}*/

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
