import AdminNavbar from "@/components/AdminNavbar";
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
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}
