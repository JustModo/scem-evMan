"use client";

import React, { useState } from "react";
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
    <div className="relative h-screen w-full bg-background overflow-hidden pt-12">
      {/* Green Top Background SVG */}
      <div className="absolute top-12 left-0 w-full h-1/3">
        <svg
          viewBox="0 0 24 10"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 24 0 L 24 4 C 18 8 11 4 0 2 Z"
            className="fill-primary"
          />
        </svg>
      </div>

      {/* Form Container */}
      <div className="flex items-center justify-center h-full w-full md:w-1/2 relative z-10">
        <div className="w-full max-w-md p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              SIGN UP
            </h1>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setMatchMessage(
                password === confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"
              );
            }}
          >
            {/* Login Link */}
            <p className="text-right text-foreground text-sm">
              Already a User?{" "}
              <Link className="hover:underline text-primary " href="/auth/login">
                Login
              </Link>
            </p>

            {/* E-Mail */}
            <div className="relative">
              <MdEmail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="E-Mail ID"
                className="pl-12 pr-4 py-3 bg-muted text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <RiLockPasswordFill
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="pl-12 pr-4 py-3 bg-muted text-foreground placeholder:text-muted-foreground"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaCheckCircle
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="pl-12 pr-4 py-3 bg-muted text-foreground placeholder:text-muted-foreground"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Password Match Message */}
            <p
              className={`text-right font-medium text-sm h-5 ${
                matchMessage.includes("not")
                  ? "text-destructive"
                  : matchMessage
                  ? "text-green-600"
                  : ""
              }`}
            >
              {matchMessage || ""}
            </p>

            <div className="flex flex-col gap-4 pt-2">
              {/* Continue */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 cursor-pointer"
              >
                Continue
              </Button>

              {/* Divider */}
              <div className="flex items-center">
                <div className="h-px bg-muted-foreground/20 w-full"></div>
                <span className="px-4 text-sm text-muted-foreground whitespace-nowrap">
                  OR
                </span>
                <div className="h-px bg-muted-foreground/20 w-full"></div>
              </div>

              {/* Google Sign Up */}
              <Button
                className="flex items-center justify-center w-full gap-3 bg-background border-2 border-input text-foreground rounded-md py-3 hover:bg-accent cursor-pointer"
                variant="outline"
              >
                <FcGoogle size="20" />
                Continue With Google
              </Button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            ©2025 All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
