"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <footer className="bg-gray-400 text-gray-800 text-center py-4 mt-12">
      <div className="flex justify-center space-x-8">
        <a href="/about" className="hover:text-white">About Us</a>
        <a href="/contact" className="hover:text-white">Contact Support</a>
        <a href="/terms" className="hover:text-white">Terms</a>
        <a href="/version" className="hover:text-white">Version Info</a>
      </div>
      <p className="mt-4 text-sm">© 2025 Your Company. All rights reserved.</p>
    </footer>
  );
}
