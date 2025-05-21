"use client";

import React from "react";
import { ContestLandingData } from "@/types/contest";

interface ContestCardProps {
  data: ContestLandingData;
}

const ContestCard: React.FC<ContestCardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white/60 dark:bg-zinc-800/50 backdrop-blur-md border border-white/30 dark:border-zinc-700 rounded-2xl shadow-lg p-6 md:p-10 transition hover:shadow-xl hover:scale-[1.01]">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-zinc-900 dark:text-white mb-3">
          {data.title}
        </h2>

        {/* Description */}
        <p className="text-center text-zinc-700 dark:text-zinc-300 mb-6">
          {data.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-800 dark:text-zinc-300 mb-6">
          <InfoItem icon="🕒" label="Start Time" value={data.duration.start.toLocaleString()} />
          <InfoItem icon="⏰" label="End Time" value={data.duration.end.toLocaleString()} />
          <InfoItem icon="🧩" label="Total Problems" value={data.totalProblems.toString()} />
          <InfoItem icon="✍️" label="Author" value={data.author} />
        </div>

        {/* Rules */}
        <div className="bg-white/30 dark:bg-zinc-700/30 rounded-lg p-4 border border-white/20 dark:border-zinc-600 mb-6">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
            📜 Contest Rules
          </h3>
          <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300 space-y-1">
            {data.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform shadow-md dark:shadow-zinc-900">
            View Contest
          </button>
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div>
    <p className="font-semibold flex items-center gap-2">
      <span>{icon}</span> {label}:
    </p>
    <p className="ml-6">{value}</p>
  </div>
);

export default ContestCard;
