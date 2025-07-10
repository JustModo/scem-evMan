"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <footer className="bg-muted text-muted-foreground text-center py-4 w-screen">
      <div className="flex justify-center space-x-8">
        <a href="#" className="hover:text-foreground">
          About Us
        </a>
        <a href="#" className="hover:text-foreground">
          Contact Support
        </a>
        <a href="#" className="hover:text-foreground">
          Terms
        </a>
        <a href="#" className="hover:text-foreground">
          Version Info
        </a>
      </div>
      <p className="mt-4 text-sm">© 2025 Your Company. All rights reserved.</p>
    </footer>
  );
}
