"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import QuestionCard from "./question-card";
import { EmptyState } from "@/components/admin/empty-placeholder";
import { Problem } from "@/types/problem";

interface QuestionsFilterableListProps {
    initialProblems: Problem[];
}

export default function QuestionsFilterableList({ initialProblems }: QuestionsFilterableListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProblems = initialProblems.filter(
        (problem) =>
            (problem.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (problem.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
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
                        <QuestionCard key={String(problem.id)} problem={problem} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    searchTerm={searchTerm}
                    title="No questions found"
                    entityName="question"
                    createUrl="/admin/questions"
                    createLabel="Create Your First Question"
                />
            )}
        </div>
    );
}
