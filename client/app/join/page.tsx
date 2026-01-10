"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function JoinContestPage() {
  const [otp, setOtp] = useState("");
  const allFilled = otp.length === 6;

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card text-foreground rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col items-center space-y-10 border border-border">
        {/* Heading with underline */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide relative inline-block">
            JOIN A TEST
            <span className="block w-16 h-1 mt-2 mx-auto bg-primary rounded-full"></span>
          </h1>
        </div>

        {/* 6-digit OTP input */}
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup className="space-x-1 md:space-x-2">
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="bg-muted rounded-xl border border-border shadow-none font-semibold text-xl md:text-2xl w-10 h-12 md:w-12 md:h-14 text-center text-foreground"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {/* Join Button */}
        <button
          disabled={!allFilled}
          className={`w-full h-11 text-lg font-semibold rounded-full shadow-md transition duration-200 ease-in-out
            ${allFilled
              ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
        >
          Join
        </button>
      </div>
    </main>
  );
}
