"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const manuallyToggled = useRef(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
    manuallyToggled.current = true;
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`w-14 h-7 flex items-center p-1 rounded-full transition-colors duration-300 ease-in-out ${
          isDark ? "bg-primary-400" : "bg-muted"
        }`}
      >
        <div
          className={`w-5 h-5 bg-card rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ease-in-out ${
            isDark ? "translate-x-7" : "translate-x-0"
          }`}
        >
          {isDark ? (
            <BsMoonFill className="text-foreground text-xs" />
          ) : (
            <BsSunFill className="text-yellow-500 text-xs" />
          )}
        </div>
      </button>
    </div>
  );
}
