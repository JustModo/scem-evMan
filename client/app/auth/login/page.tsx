import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { FcGoogle } from "react-icons/fc";

// Login Page
// Allow existing users to login to the platform.
export default function LoginPage() {
  return (
    <main className="bg-[#d0e7c2] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-[#aad3b0] text-white flex items-center justify-center flex-col">
          {/* You can add your pattern or logo here */}
        </div>

        {/* Right Side (Form) */}
        <div className="bg-[#121212] text-white flex items-center justify-center flex-col px-10 py-8">
          <div className="my-4 w-full max-w-sm">
            <h1 className="text-5xl font-semibold">LOGIN</h1>
            <p className="mt-2 text-xs text-slate-400">
              {/* Add a tagline if needed */}
            </p>
          </div>

          <form className="w-full max-w-sm">
            <Button
              className="flex items-center w-full gap-4 px-12 mb-4 bg-[#aad3b0] text-black rounded-full"
              variant="outline"
            >
              <FcGoogle size="25" />
              Sign In With Google
            </Button>

            <Label htmlFor="email">Email*</Label>
            <Input
              className="mt-2 mb-4 bg-[#d0e7c2] text-black rounded-full"
              type="email"
              id="email"
              placeholder="Email"
            />

            <Label htmlFor="password">Password*</Label>
            <Input
              className="mt-2 bg-[#d0e7c2] text-black rounded-full"
              type="password"
              id="password"
              placeholder="Password"
            />

            <Button
              type="submit"
              className="w-full mt-6 bg-[#4cafac] hover:bg-[#3b998f] text-white rounded-full"
            >
              Login
            </Button>
          </form>

          <p className="mt-4 text-xs text-slate-400">
            @2025 All rights reserved
          </p>
        </div>
      </div>
    </main>
  );
}
