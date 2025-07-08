"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  FaChartLine,
  FaQuestionCircle,
  FaClipboardList,
  FaCogs,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

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
      label: "Questions",
    },
    {
      name: "settings",
      link: "/settings",
      icon: <FaCogs />,
      label: "Settings",
    },
  ];

  return (
    <aside className="flex flex-col items-center w-14 py-6 space-y-6 bg-background border-r border-border">
      {routes.map((r) => {
        const isActive = pathname === r.link;

        return (
          <Link
            key={r.name}
            href={r.link}
            className={`group p-3 rounded-lg transition-colors flex items-center justify-center ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-muted-foreground"
            }`}
            aria-label={r.label}
          >
            <div className="relative text-xl">
              {r.icon}
              <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow group-hover:opacity-100 transition-opacity">
                {r.label}
              </span>
            </div>
          </Link>
        );
      })}
    </aside>
  );
}
