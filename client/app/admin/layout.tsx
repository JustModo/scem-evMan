import AdminSidebar from "@/components/AdminNavbar";
import React from "react";

// Admin Layout
// Provides sidebar or admin navigation. Wraps all /admin/* routes.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminSidebar /> 
      <main className="p-4 pl-64 w-full ">{children}</main>

    </div>
  );
}