import React from "react";

export default function JoinContestPage() {
  return (
    <div className="h-screen bg-background flex items-center pt-12">
      {/* Main Content */}
      <main className="flex flex-col items-center px-4 bg-card py-6 relative w-full h-8/12">
        {/* Top-right avatar */}
        <div className="absolute right-8 flex items-center gap-1 text-sm text-foreground cursor-default rounded-full w-10 h-10 bg-primary/10 justify-center font-bold">
          U
        </div>

        {/* Title */}
        <h1 className="self-start text-5xl font-extrabold text-foreground relative inline-block">
          JOIN A TEST
          <div className="mt-1 w-36 h-1 rounded-sm bg-primary" />
        </h1>

        {/* Centered Content */}
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md h-full">

          {/* Input field */}
          <input
            type="text"
            placeholder="Enter Test Code"
            className="w-full h-14 px-4 py-2 rounded-2xl bg-primary/10 text-foreground placeholder-muted-foreground"
          />

          {/* Join Button */}
          <button className="w-full h-12 bg-primary text-primary-foreground font-bold px-6 py-2 rounded-2xl transition duration-200 ease-in-out hover:bg-primary/80 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary">
            Join
          </button>
        </div>
      </main>
    </div>
  );
}
