"use client";

import React, { useEffect, useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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

  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Redirect logged-in users away from login page
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        router.push("/");
      }
    } catch (err: any) {
      const errorMsg = err.errors?.[0]?.message || "Login failed";
      setErrors((prev) => ({ ...prev, password: errorMsg }));
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("Google sign-in failed", err);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center p-0">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        <div className="bg-primary flex items-center justify-center" />

        <div className="bg-background flex items-center justify-center px-4 sm:px-10 py-8">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                LOGIN
              </h1>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="relative">
                  <MdEmail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md"
                    type="email"
                    placeholder="E-Mail ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <RiLockPasswordFill
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={20}
                  />
                  <Input
                    className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div id="clerk-captcha"></div>

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3"
              >
                Login
              </Button>

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

              <div className="flex items-center my-6">
                <hr className="flex-grow border-muted" />
                <span className="px-4 text-sm text-muted-foreground">OR</span>
                <hr className="flex-grow border-muted" />
              </div>

              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full gap-3 bg-background border-2 border-input text-foreground rounded-md py-3 hover:bg-accent"
                variant="outline"
              >
                <FcGoogle size={20} />
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
