"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { getAllTests, Test } from "@/constants/test-data";
import { TestCard } from "@/components/admin/test/test-card";
import { EmptyState } from "@/components/admin/empty-placeholder";
import { QuestionHeader } from "@/components/admin/question/header";

export default function AdminQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const tests = getAllTests();
  const filteredTests: Test[] = [];

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="max-w-none w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <QuestionHeader />

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
          <EmptyState
            searchTerm={searchTerm}
            title="No questions found"
            entityName="question"
            createUrl="/admin/questions/new/edit"
            createLabel="Create Your First Question"
          />
        )}
      </div>
    </div>
  );
}
