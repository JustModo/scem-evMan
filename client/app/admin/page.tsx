// import React from "react";

// // Admin Analytics Landing Page
// // Overview of contest analytics and navigation to other admin functions.

"use client";

import React, { useState } from "react";
import HeroSectionDemo from "@/components/HeroSection"; 

export default function AdminAnalyticsPage() {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  const stats = {
    totalContests: 120,
    totalParticipants: 3400,
    averageScore: "86%",
    topPerformer: "John Doe",
  };

  const routeContent: { [key: string]: string } = {
    "route1": "Example Content for Route 1",
    "route2": "Example Content for Route 2",
    "route3": "Example Content for Route 3",
    "route4": "Example Content for Route 4",
  };

  const handleRouteChange = (route: string) => {
    setActiveRoute(route);
  };

  return (
    <div className="min-h-screen bg-black py-16 px-4 flex flex-col items-center">
      {/* This section holds the stats and has the border */}
      <div className="bg-black text-white border border-[#A0CC98] rounded-2xl p-10 max-w-5xl w-full text-center shadow-xl">
        <h2 className="text-4xl font-bold text-[#A0CC98] mb-4">Platform Stats</h2>
        <p className="text-lg text-gray-300 mb-10">Overview of contests and performance metrics</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[{
            label: "Total Contests", value: stats.totalContests },
            { label: "Total Participants", value: stats.totalParticipants },
            { label: "Average Score", value: stats.averageScore },
            { label: "Top Performer", value: stats.topPerformer },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#A0CC98] p-6 rounded-xl shadow-md border border-[#A0CC98]"
            >
              <h3 className="text-3xl font-bold text-black">{item.value}</h3>
              <p className="mt-2 text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["Route 1", "Route 2", "Route 3", "Route 4"].map((route, i) => (
          <button
            key={i}
            onClick={() => handleRouteChange(route.toLowerCase().replace(" ", ""))}
            className="bg-[#A0CC98] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#94bb83] transition"
          >
            {route}
          </button>
        ))}
      </div>

      <HeroSectionDemo content={routeContent[activeRoute || ""] || "Select a route to view content"} />
    </div>
  );
}
