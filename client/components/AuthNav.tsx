"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function AuthNav() {
  return (
    <>
      <SignedOut>
        <li>
          <Link href="/auth/register">
            <span className="flex items-center gap-1 px-3 py-2 rounded-md text-foreground text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer">
              <LogIn size={16} />
              <span>Sign In</span>
            </span>
          </Link>
        </li>
      </SignedOut>

      <SignedIn>
        <li>
          <UserButton afterSignOutUrl="/" />
        </li>
      </SignedIn>
    </>
  );
}
