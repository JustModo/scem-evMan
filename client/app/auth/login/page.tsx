"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import Link from "next/link";

export default function LoginPage() {
  const [isDark, setIsDark] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.toggle("dark", isDark);
    }
  }, [isDark]);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol.";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (email !== "test@example.com" || password !== "Test@123") {
      setErrors((prev) => ({
        ...prev,
        password: "Invalid email or password.",
      }));
      return;
    }

    setErrors({ email: "", password: "" });
    alert("Login successful!");
  };

  return (
    <main className="h-screen flex items-center justify-center p-0">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[#aad3b0] text-white flex items-center justify-center flex-col">
          {/* You can add logo or illustration here */}
        </div>

        {/* Right Side */}
        <div className="bg-white dark:bg-[#121212] text-black dark:text-white flex items-center justify-center flex-col px-4 sm:px-10 py-4 transition-colors duration-300 relative border-2 border-[#aad3b0] border-opacity-10">
          <div className="w-full max-w-sm mx-auto">
            <div className="w-full h-1 bg-[#4cafac] rounded-full mb-4 absolute top-0 left-0" />

            {/* Toggle */}
            <div className="absolute top-4 right-4">
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

            {/* Login Title */}
            <h1 className="text-5xl font-bold relative w-fit">
              LOGIN
              <div className="h-1 w-[120px] bg-[#4cafac] rounded-full mt-1" />
            </h1>

            {/* Form */}
            <form className="w-full mt-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="relative mb-1">
                <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600" size={20} />
                <Input
                  className="pl-10 pr-4 py-2 bg-[#d0e7c2] text-black dark:bg-[#d0e7c2] dark:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#4cafac]"
                  type="email"  
                  id="email"
                  placeholder="E-Mail ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mb-2">{errors.email}</p>
              )}

              {/* Password */}
              <div className="relative mb-1">
                <RiLockPasswordFill className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600" size={20} />
                <Input
                  className="pl-10 pr-4 py-2 bg-[#d0e7c2] text-black dark:bg-[#d0e7c2] dark:text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#4cafac]"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mb-2">{errors.password}</p>
              )}

              {/* Forgot Password */}
              <div className="text-right mt-1 mb-4">
                <Link href="/forgot-password" className="text-xs text-[#4cafac] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full mt-2 bg-[#4cafac] hover:bg-[#3b998f] text-white rounded-full"
              >
                Login
              </Button>

              {/* Sign Up */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-600 dark:text-slate-400">New user? </span>
                <Link href="/auth/register" className="text-sm text-[#4cafac] hover:underline">
                  Sign Up
                </Link>
              </div>

              {/* Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-600" />
                <span className="px-2 text-sm text-gray-400">OR</span>
                <hr className="flex-grow border-gray-600" />
              </div>

              {/* Google Button */}
              <Button
                className={`flex items-center w-full gap-4 ${
                  isDark
                    ? "bg-black border-white text-white"
                    : "bg-white border-lightgray text-black"
                } border-2 rounded-md`}
                variant="outline"
              >
                <FcGoogle size="25" />
                Continue With Google
              </Button>
            </form>

            <p className="mt-4 text-xs text-slate-400 text-center">
              ©2025 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
