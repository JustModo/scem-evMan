"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings } from "lucide-react";
import { problems } from "@/constants/test-data";
import QuestionCard from "../question/question-card";

export default function TestQuestions({ questions }: { questions: number[] }) {
  const filteredProblems = questions
    .map((id) => problems.find((problem) => problem.id === id))
    .filter((problem): problem is NonNullable<typeof problem> => !!problem);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Questions ({filteredProblems.length})
            </CardTitle>
            <CardDescription>View test questions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredProblems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No questions yet</p>
            <p className="text-sm">Get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <QuestionCard key={problem.id} problem={problem} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
