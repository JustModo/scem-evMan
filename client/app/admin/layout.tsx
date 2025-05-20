import AdminTopbar from "@/components/admin/AdminNavbar";
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
      <AdminTopbar />
      <main className=" ">{children}</main>
    </div>
  );
}
