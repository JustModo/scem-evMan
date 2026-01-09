import AdminSidebar from "@/components/admin/admin-sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-screen pt-12 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 w-full h-full overflow-y-auto pb-16 md:pb-0">
        {children}
      </div>
    </main>
  );
}
