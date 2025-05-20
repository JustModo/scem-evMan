"use client";

import React, { useState } from "react";
import { FaChartLine, FaQuestionCircle, FaClipboardList, FaCogs } from "react-icons/fa";

const routes = [
  { name: "route1", icon: <FaChartLine />, label: "Route 1", content: "Example Content for Route 1 " },
  { name: "route2", icon: <FaQuestionCircle />, label: "Route 2", content: "Example Content for Route 2" },
  { name: "route3", icon: <FaClipboardList />, label: "Route 3", content: "Example Content for Route 3" },
  { name: "route4", icon: <FaCogs />, label: "Route 4", content: "Example Content for Route 4" },
];

const HeroSection: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState("route1");

  const stats = {
    totalContests: 120,
    totalParticipants: 3400,
    averageScore: "86%",
    topPerformer: "John Doe",
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="flex flex-col items-center bg-[#A0CC98] w-15 py-6 space-y-8">
        {routes.map((r) => (
          <button
            key={r.name}
            onClick={() => setActiveRoute(r.name)}
            className={`group p-3 rounded transition-colors ${
              activeRoute === r.name ? "bg-green-700 text-white" : "hover:bg-green-600 text-black"
            }`}
            aria-label={r.label}
          >
            <div className="relative text-xl">
              {r.icon}
              <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {r.label}
              </span>
            </div>
          </button>
        ))}
      </aside>

      <main className="flex-1 px-8 py-10 flex flex-col items-center space-y-8">
        <section className="w-full max-w-5xl rounded-2xl border border-[#A0CC98] p-10 text-center shadow-xl">
          <h2 className="mb-4 text-4xl font-bold text-[#A0CC98]">Platform Stats</h2>
          <p className="mb-10 text-lg text-gray-300">Overview of contests and performance metrics</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { label: "Total Contests", value: stats.totalContests },
              { label: "Total Participants", value: stats.totalParticipants },
              { label: "Average Score", value: stats.averageScore },
              { label: "Top Performer", value: stats.topPerformer },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#A0CC98] bg-[#A0CC98] p-6 shadow-md"
              >
                <h3 className="text-3xl font-bold text-black">{item.value}</h3>
                <p className="mt-2 text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full text-center">
          <div className="rounded-xl bg-[#A0CC98] p-6">
            <h2 className="text-2xl font-bold text-black">
              {routes.find((r) => r.name === activeRoute)?.content}
            </h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HeroSection;
