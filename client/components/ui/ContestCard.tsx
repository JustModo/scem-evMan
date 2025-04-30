"use client";

import React from "react";
import { ContestLandingData } from "@/types/contest";

interface ContestCardProps {
  data: ContestLandingData;
}

const ContestCard: React.FC<ContestCardProps> = ({ data }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500 ease-in-out">
      <div className="w-full max-w-4xl px-8 py-10 rounded-3xl bg-white/30 dark:bg-zinc-800/30 backdrop-blur-lg shadow-2xl border border-white/20 dark:border-zinc-700/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_50px_rgba(0,0,0,0.1)]">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-zinc-900 dark:text-white drop-shadow-md mb-4">
          {data.title}
        </h2>

        {/* Description */}
        <p className="text-lg text-center text-zinc-700 dark:text-zinc-300 mb-6">
          {data.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 text-base text-zinc-800 dark:text-zinc-300 mb-6">
          <div>
            <span className="font-semibold">🕒 Start Time:</span><br />
            {data.duration.start.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">⏰ End Time:</span><br />
            {data.duration.end.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">🧩 Total Problems:</span><br />
            {data.totalProblems}
          </div>
          <div>
            <span className="font-semibold">✍️ Author:</span><br />
            {data.author}
          </div>
        </div>

        {/* Rules Section */}
        <div className="bg-white/20 dark:bg-zinc-700/20 rounded-xl p-4 border border-white/10 dark:border-zinc-600 mb-4 shadow-inner">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
            📜 Contest Rules
          </h3>
          <ul className="list-disc pl-6 space-y-1 text-zinc-700 dark:text-zinc-300">
            {data.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
