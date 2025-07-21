"use client";

import React, { useState, useEffect } from "react";
import { useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ssoError, setSsoError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { signUp, isLoaded } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isSignedIn) router.replace("/");
  }, [isSignedIn, router]);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "sso_failed") {
      setSsoError("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (email === password) {
       toast.error("Email and password should not be the same");
       return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address (e.g., user@example.com)");
      return;
    }

    if (!isLoaded || isSignedIn) return;

    try {
      setLoading(true);

      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push("/auth/verify-email");
    } catch (err: any) {
  const errorCode = err?.errors?.[0]?.code;
  const errorMessage = err?.errors?.[0]?.message || err?.message || "Registration failed";

  if (errorCode === "form_identifier_exists" || errorMessage.includes("already exists")) {
    toast.error("An account with this email already exists. Try logging in.");
  } else {
    toast.error(errorMessage);
  }
}
 finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded || isSignedIn || isGoogleLoading) return;

    setIsGoogleLoading(true);
    setSsoError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso-callback?from=register",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error("Google sign-up failed", err);
      const errorMessage = err.errors?.[0]?.message || err.message || "Failed to initiate Google sign-up";

      if (errorMessage.includes("rate") || errorMessage.includes("limit")) {
        setSsoError("Too many requests. Please wait a moment and try again.");
      } else if (errorMessage.includes("oauth")) {
        setSsoError("OAuth configuration error. Please contact support.");
      } else {
        setSsoError("Failed to initiate Google sign-up. Please try again.");
      }

      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center p-0">
      <div className="absolute top-0 left-0 w-full h-1/3 z-15">
        <svg viewBox="0 0 24 10" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M 0 0 L 24 0 L 24 4 C 18 8 11 4 0 2 Z" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="1" />
        </svg>
      </div>

      <div className="z-30 grid w-full h-full grid-cols-1 md:grid-cols-2 relative">
        <div className="flex items-center justify-center px-4 sm:px-10 py-8 order-2 md:order-1">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground z-40">SIGN UP</h1>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>

            {ssoError && (
              <Alert variant="destructive">
                <AlertDescription>{ssoError}</AlertDescription>
              </Alert>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <p className="text-right text-foreground text-sm">
                Already a User? <Link className="hover:underline text-primary" href="/auth/login">Login</Link>
              </p>

              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md"
                  type="text"
                  placeholder="E-Mail ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              <div className="relative">
                <RiLockPasswordFill className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                 <Input
                  className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="relative">
                <FaCheckCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  className="pl-12 pr-4 py-3 bg-muted text-foreground rounded-md"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div id="clerk-captcha"></div>

              <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 cursor-pointer" disabled={loading}>
                  {loading ? "Loading..." : "Continue"}
                </Button>

                <div className="flex items-center my-2">
                  <hr className="flex-grow border-muted" />
                  <span className="px-4 text-sm text-muted-foreground">OR</span>
                  <hr className="flex-grow border-muted" />
                </div>

                <Button type="button" onClick={handleGoogleSignIn} disabled={isGoogleLoading} className="flex items-center justify-center w-full gap-3 bg-background border-2 border-input text-foreground rounded-md py-3 hover:bg-accent cursor-pointer z-40 disabled:opacity-50" variant="outline">
                  {isGoogleLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <FcGoogle size={20} />
                      Continue With Google
                    </>
                  )}
                </Button>
              </div>
            </form>

            <p className="text-xs text-muted-foreground text-center">©2025 All rights reserved</p>
          </div>
        </div>

        <div className="flex items-center justify-center order-1 md:order-2"></div>
      </div>
    </main>
  );
}