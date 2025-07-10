"use client";

import React from "react";
import { ContestLandingData } from "@/types/contest";

interface ContestCardProps {
  data: ContestLandingData;
}

const ContestCard: React.FC<ContestCardProps> = ({ data }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary-200">
      <div className="w-full max-w-2xl px-6 py-8 rounded-2xl bg-card border-2 border-primary-700 shadow-lg transition-transform duration-200 hover:scale-[1.02]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-primary-200 mb-3">
          {data.title}
        </h2>

        {/* Description */}
        <p className="text-base text-center text-muted-foreground mb-4">
          {data.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
          <div>
            <span className="font-semibold text-primary-200"> Start:</span><br />
            {data.duration.start.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-primary-200"> 3f0 End:</span><br />
            {data.duration.end.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-primary-200"> e9 Problems:</span><br />
            {data.totalProblems}
          </div>
          <div>
            <span className="font-semibold text-primary-200"> 70d Author:</span><br />
            {data.author}
          </div>
        </div>

        {/* Rules */}
        <div className="bg-card/80 rounded-lg p-3 border border-primary-700 mb-2">
          <h3 className="text-lg font-semibold text-primary-200 mb-2">
             dcdc Rules
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
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
