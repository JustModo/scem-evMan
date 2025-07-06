import React from "react";
import Link from "next/link";
import { User, LogIn } from "lucide-react";
import { ModeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <header className="absolute top-0 z-10 w-full">
      <nav className="bg-[#00b88f] h-12 flex items-center justify-between px-6 shadow-md">
        {/* Logo/Brand section */}
        <div className="flex items-center">
          <Link href="/">
            <span className="font-semibold text-white text-lg cursor-pointer">
              SOSC
            </span>
          </Link>
        </div>

        {/* Navigation links */}
        <ul className="flex items-center space-x-1">
          <li>
            <Link href="/auth/login">
              <span className="flex items-center gap-1 px-3 py-2 rounded-md text-white text-sm font-medium hover:bg-white/10 transition-colors">
                <LogIn size={16} />
                <span>Sign In</span>
              </span>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <span className="flex items-center gap-1 px-3 py-2 rounded-md text-white text-sm font-medium hover:bg-white/10 transition-colors">
                <User size={16} />
                <span>Profile</span>
              </span>
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
