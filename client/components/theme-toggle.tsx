"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const manuallyToggled = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsDark(resolvedTheme === "dark");
    }
  }, [resolvedTheme, mounted]);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    setIsDark(!isDark);
    manuallyToggled.current = true;
  };

  if (!mounted) {
    return <Skeleton className="w-14 h-7 rounded-full bg-muted" />;
  }

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`w-14 h-7 flex items-center p-1 rounded-full bg-muted`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-5 h-5 bg-card rounded-full shadow-md flex items-center justify-center"
          animate={{
            x: isDark ? 28 : 0,
          }}
        >
          {isDark ? (
            <BsMoonFill className="text-foreground text-xs" />
          ) : (
            <BsSunFill className="text-yellow-500 text-xs" />
          )}
        </motion.div>
      </button>
    </div>
  );
}
