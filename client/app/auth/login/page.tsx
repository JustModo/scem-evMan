"use client";

import React, { useEffect, useState } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ssoError, setSsoError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailPasswordLoading, setIsEmailPasswordLoading] = useState(false);

  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "sso_failed") {
      setSsoError("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!email.trim()) {
    toast.error("Email is required.");
    valid = false;
  } else if (!emailRegex.test(email)) {
    toast.error("Invalid input.");
    valid = false;
  }

  if (!password.trim()) {
    toast.error("Password is required.");
    valid = false;
  } else if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    valid = false;
  }


    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !isLoaded) return;

    setIsEmailPasswordLoading(true);

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err: any) {
      console.error("Login error", err);
      const errorCode = err.errors?.[0]?.code;
      const errorMessage = err.errors?.[0]?.message || err.message || "Login failed";

      if (errorCode === "form_identifier_not_found") {
        toast.error("No account found with this email address.");
      } else if (errorCode === "form_password_incorrect") {
        toast.error("Incorrect password.");
      } else if (
        errorCode === "strategy_for_user_invalid" ||
        errorMessage.includes("verification strategy")
      ) {
        toast.error("Email exists but no password set. Use Google or reset password.");
      } else if (errorCode === "session_exists") {
        router.push("/");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsEmailPasswordLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded || isGoogleLoading) return;

    setIsGoogleLoading(true);
    setSsoError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error("Google sign-in failed", err);

      const errorMessage = err.errors?.[0]?.message || err.message || "Failed to initiate Google sign-in";

      if (errorMessage.includes("rate") || errorMessage.includes("limit")) {
        setSsoError("Too many requests. Please wait a moment and try again.");
      } else if (errorMessage.includes("oauth")) {
        setSsoError("OAuth configuration error. Please contact support.");
      } else {
        setSsoError("Failed to initiate Google sign-in. Please try again.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center p-0">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        <div className="bg-primary flex items-center justify-center" />

        <div className="bg-background flex items-center justify-center px-4 sm:px-10 py-8">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">LOGIN</h1>
              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>

            {ssoError && (
              <Alert variant="destructive">
                <AlertDescription>{ssoError}</AlertDescription>
              </Alert>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
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
              </div>

              <div className="space-y-1">
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
              </div>

              <div className="min-h-[50px] flex items-center">
                <div id="clerk-captcha" className="w-full"></div>
              </div>

              <div className="text-right -mt-2">
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isEmailPasswordLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3"
              >
                {isEmailPasswordLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">New user? </span>
                <Link href="/auth/register" className="text-sm text-primary hover:underline">
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
                disabled={isGoogleLoading}
                className="flex items-center justify-center w-full gap-3 bg-background border-2 border-input text-foreground rounded-md py-3 hover:bg-accent"
                variant="outline"
              >
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
            </form>

            <p className="text-xs text-muted-foreground text-center">©2025 All rights reserved</p>
          </div>
        </div>
      </div>
    </main>
  );
}