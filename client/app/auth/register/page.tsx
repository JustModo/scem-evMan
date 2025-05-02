import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="relative h-screen w-full bg-white">
      {/* green dabba */}
      <div className="absolute top-0 left-0 w-full h-1/2">
        <svg viewBox="0 1 20 10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 0 0 L 24 0 L 24 4 C 18 8 11 4 0 2"
            fill="#b1d6a9"
            stroke="#b1d6a9"
            stroke-width="1"
          />
        </svg>
      </div>

      {/* form */}
      <div className="absolute w-full max-w-lg top-50 left-20 p-6 space-y-4 text-black">
        <h1 className="text-6xl font-bold text-black mb-1.5">SIGN UP</h1>
        <hr className="bg-[#579e86] h-1.5 w-[35%] rounded-2xl" />
        <p className="text-right">
          Already a User?<a className="underline" href="https://www.google.com/">Login</a>
        </p>
        <form className="space-y-6">
          <div className="flex flex-col space-y-2">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="E-Mail ID"
            className="bg-[#b1d6a9] text-black placeholder:text-black"
            required
          />
          </div>

          <div className="flex flex-col space-y-2">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              className="bg-[#b1d6a9] text-black placeholder:text-black"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="bg-[#b1d6a9] text-black placeholder:text-black"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-5 bg-[#579e86] text-black"
          >
            CONTINUE
          </Button>
        </form>
      </div>
    </div>
  );
}

