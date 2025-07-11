"use client";

import React, { useState, useRef } from "react";

export default function JoinContestPage() {
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newDigits = [...digits];
      newDigits[index] = val;
      setDigits(newDigits);
      if (val && index < 5) inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const allFilled = digits.every((d) => d.length === 1);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl shadow-2xl p-10 flex flex-col items-center space-y-10 border border-gray-300 dark:border-gray-700">
        {/* Heading with underline */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide relative inline-block">
            JOIN A TEST
            <span className="block w-16 h-1 mt-2 mx-auto bg-emerald-400 rounded-full"></span>
          </h1>
        </div>

        {/* 6-digit OTP input */}
        <div className="flex justify-center gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-2xl font-semibold border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              autoComplete="off"
            />
          ))}
        </div>

        {/* Join Button */}
        <button
          disabled={!allFilled}
          className={`w-full h-11 text-lg font-semibold rounded-full shadow-md transition duration-200 ease-in-out
            ${
              allFilled
                ? "bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Join
        </button>
      </div>
    </main>
  );
}
