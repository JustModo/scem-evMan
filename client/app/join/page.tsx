// Join Contest Page
// Enter a contest code to join a specific contest.
import React from "react";

export default function JoinContestPage() {
  return (
    <div className="min-h-screen bg-[#B8E1B0] flex items-center justify-center">
      <div className="w-screen bg-black py-10 px-4 md:px-20 md:py-20 text-white relative">

        {/* Top-right avatar */}
        <div className="absolute top-5 right-6 w-10 h-10 bg-[#B8E1B0] rounded-full flex items-center justify-center text-black font-bold">
         U
        </div>

       {/* Title */}
        <div className="pl-10 -mt-8 mb-4">
          <h1 className="text-6xl font-extrabold text-left">
            <span className="underline decoration-[#B8E1B0]">JOIN</span> A TEST
          </h1>
        </div>
        {/*Centered content*/}
        <div className="flex flex-col items-center justify-center gap-5">
         {/* Logo/icon box */}
          <div className="w-38 h-27 bg-[#B8E1B0] rounded-xl"> </div>

         {/* Input fields */}
          <input
           type="text"
           placeholder="Enter Test Code"
           className="w-84 h-14 mb-4 px-4 py-2 rounded-2xl bg-[#B8E1B0] text-black placeholder-gray-700"
          />
        

         {/* Join Button */}
          <button className="w-84 h-12 bg-[#3AA89D] text-black font-bold px-6 py-2 rounded-2xl transition duration-200 ease-in-out hover:bg-[#319387] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#319387]">
           Join
          </button>

         {/* Footer Note */}
          <p className="text-xs text-gray-400 mt-4">
           Enter the correct test code shared with you.
          </p>
        </div>  
      </div>
    </div>
  );
}