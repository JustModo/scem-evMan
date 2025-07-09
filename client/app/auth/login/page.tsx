"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

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
        <div className="bg-white dark:bg-[#121212] text-black dark:text-white flex items-center justify-center px-4 sm:px-10 py-4 relative border-2 border-[#aad3b0] border-opacity-10">
          {/* ✅ Vertically centered form container */}
          <div className="w-full max-w-sm mx-auto flex flex-col justify-center h-full">
            <div className="w-full bg-[#4cafac] rounded-full mb-4 absolute top-0 left-0" />

            {/* Login Title */}
            <h1 className="text-5xl font-bold relative w-fit text-[#000000] dark:text-white">
              LOGIN
              <div className="h-1 w-[120px] bg-[#4cafac] rounded-full mt-1" />
            </h1>

            {/* Form */}
            <form className="w-full mt-4 space-y-2" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="relative">
                <MdEmail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600"
                  size={20}
                />



                
                <Input
                  className="pl-10 pr-4 py-2 bg-[#d0e7c2] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#4cafac]"
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
              <div className="relative">
                <RiLockPasswordFill
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-600"
                  size={20}
                />
                <Input
                  className="pl-10 pr-4 py-2 bg-[#d0e7c2] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#4cafac]"
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
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#4cafac] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full mt-2 bg-[#4cafac] hover:bg-[#3b998f] text-white rounded-full font-semibold"
              >
                Login
              </Button>

              {/* Sign Up */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-600 dark:text-slate-400">
                  New user?{" "}
                </span>
                <Link
                  href="/auth/register"
                  className="text-sm text-[#4cafac] hover:underline"
                >
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
                className={`flex items-center w-full gap-4 bg-white dark:bg-black border-2 border-gray-300 dark:border-white text-black dark:text-white rounded-md`}
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
