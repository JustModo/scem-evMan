import AdminSidebar from "@/components/admin/admin-sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full pt-12">
      <AdminSidebar />
      <div className="flex-1 w-full pb-16 md:pb-0">
        {children}
      </div>
    </main>
  );
}
