import Link from "next/link";
import { LogOut } from "lucide-react";

export default function HomePage() {
  return (
    <div className="h-screen bg-[#aad3b0] flex items-center pt-12">
      {/* Main Content */}
      <main className="flex flex-col items-center px-4 bg-black py-6 relative w-full h-8/12">
        <div className="absolute right-8 flex items-center gap-1 text-sm text-white cursor-pointer">
          <LogOut size={20} />
          Logout
        </div>
        <h1 className="self-start text-5xl font-extrabold text-white relative inline-b
        
        lock">
          LET'S GET STARTED
          <div className="mt-1 w-36 h-1 rounded-sm bg-green-900" />
        </h1>

        {/* Buttons */}
        <div className="flex gap-40 mt-24">
          <Link
            href="/admin"
            className="w-60 h-40 border-4 rounded-2xl flex flex-col items-center justify-start border-green-900 shadow-[0_8px_16px_rgba(255,255,255,0.24)] bg-green-200/90"
          >
            <div
              className="w-16 h-16 bg-contain bg-no-repeat bg-center mb-2"
              style={{ backgroundImage: "url('/your-icon-path.svg')" }}
            />
            <span className="mt-[-0.75rem] text-white font-bold text-2xl">
              HOST
            </span>
          </Link>

          <Link
            href="/join"
            className="w-60 h-40 border-4 rounded-2xl flex flex-col items-center justify-start border-green-900 shadow-[0_8px_16px_rgba(255,255,255,0.25)] bg-green-200/90"
          >
            <div
              className="w-16 h-16 bg-contain bg-no-repeat bg-center mb-2"
              style={{ backgroundImage: "url('/your-icon-path.svg')" }}
            />
            <span className="mt-[-0.75rem] text-white font-bold text-2xl text-center">
              JOIN A TEST
            </span>
          </Link>
        </div>

        {/* Bottom Center Footer */}
        <div className="mt-12 flex flex-col items-center text-gray-700 text-sm">
          <div className="w-32 h-1 rounded-full bg-green-900 mb-8" />
          <span className="text-white">
            Made with <span className="text-red-500">❤️</span> by <b>SOSC</b>
          </span>
        </div>
      </main>
    </div>
  );
}
