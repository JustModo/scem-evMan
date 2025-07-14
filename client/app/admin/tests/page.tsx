"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { getAllTests } from "@/constants/test-data";
import { AdminHeader } from "@/components/admin/test/header";
import { TestCard } from "@/components/admin/test/test-card";
import { EmptyState } from "@/components/admin/test/empty-placeholder";

export default function AdminTestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const tests = getAllTests();
  const filteredTests = tests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="max-w-none w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <AdminHeader />

        <div className="max-w-full sm:max-w-lg">
          <Input
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border"
          />
        </div>

        {filteredTests.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <EmptyState searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
}
