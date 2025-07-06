import AdminSidebar from "@/components/admin/admin-sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen bg-black text-white pt-12">
      <AdminSidebar />
      {children}
    </main>
  );
}
