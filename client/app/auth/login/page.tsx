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
    <main className="h-screen flex items-center justify-center p-0 pt-12">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-primary flex items-center justify-center">
          {/* Optional: Add a logo/illustration */}
        </div>

        {/* Right Side */}
        <div className="bg-background flex items-center justify-center px-4 sm:px-10 py-8">
          <div className="w-full max-w-sm space-y-6">
            {/* Login Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                LOGIN
              </h1>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="space-y-2">
                <div className="relative">
                  <MdEmail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    type="email"
                    id="email"
                    placeholder="E-Mail ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="relative">
                  <RiLockPasswordFill
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 cursor-pointer"
              >
                Login
              </Button>

              {/* Sign Up */}
              <div className="text-center">
                <span className="text-sm text-muted-foreground">
                  New user?{" "}
                </span>
                <Link
                  href="/auth/register"
                  className="text-sm text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-muted" />
                <span className="px-4 text-sm text-muted-foreground">OR</span>
                <hr className="flex-grow border-muted" />
              </div>

              {/* Google Button */}
              <Button
                className="flex items-center justify-center w-full gap-3 bg-background border-2 border-input text-foreground rounded-md py-3 hover:bg-accent cursor-pointer"
                variant="outline"
              >
                <FcGoogle size="20" />
                Continue With Google
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center">
              ©2025 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
