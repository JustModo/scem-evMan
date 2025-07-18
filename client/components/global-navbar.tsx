"use client";

import React from "react";
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import AuthNav with SSR disabled to avoid hydration errors
const AuthNav = dynamic(() => import("./AuthNav"), { ssr: false });

export default function Navbar() {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/attempt");

  if (!showNavbar) return null;

  return (
    <header className="absolute top-0 z-10 w-full">
      <nav className="bg-background-navbar h-12 flex items-center justify-between px-6 shadow-md">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/">
            <span className="font-semibold text-foreground text-lg cursor-pointer">
              SOSC
            </span>
          </Link>
        </div>

        {/* Right side */}
        <ul className="flex items-center space-x-2">
          <AuthNav />
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
