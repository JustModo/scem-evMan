"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaChartLine,
  FaQuestionCircle,
  FaClipboardList,
  FaCogs,
} from "react-icons/fa";

export default function AdminSidebar() {
  const [activeRoute, setActiveRoute] = useState("route1");

  const routes = [
    {
      name: "home",
      link: "/admin",
      icon: <FaChartLine />,
      label: "Home",
    },
    {
      name: "tests",
      link: "/admin/tests",
      icon: <FaQuestionCircle />,
      label: "Tests",
    },
    {
      name: "questions",
      link: "/admin/questions",
      icon: <FaClipboardList />,
      label: "questions",
    },
    {
      name: "settings",
      link: "/settings",
      icon: <FaCogs />,
      label: "Settings",
    },
  ];

  return (
    <aside className="flex flex-col items-center bg-[#A0CC98] w-15 py-6 space-y-8">
      {routes.map((r) => (
        <Link
          key={r.name}
          href={r.link}
          onClick={() => setActiveRoute(r.name)}
          className={`group p-3 rounded transition-colors ${
            activeRoute === r.name
              ? "bg-green-700 text-white"
              : "hover:bg-green-600 text-black"
          }`}
          aria-label={r.label}
        >
          <div className="relative text-xl">
            {r.icon}
            <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {r.label}
            </span>
          </div>
        </Link>
      ))}
    </aside>
  );
}
