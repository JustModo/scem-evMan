"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/admin/empty-placeholder";
import { QuestionHeader } from "@/components/admin/question/header";
import QuestionCard from "@/components/admin/question/question-card";
import { problems } from "@/constants/test-data";

export default function AdminQuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProblems = problems.filter(
    (problem) =>
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="max-w-none w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <QuestionHeader />

        <div className="max-w-full sm:max-w-lg">
          <Input
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border"
          />
        </div>
        {filteredProblems.length > 0 ? (
          <div className="space-y-3">
            {filteredProblems.map((problem) => (
              <QuestionCard key={problem.id} problem={problem} />
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
