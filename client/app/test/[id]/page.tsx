// app/admin/tests/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

interface Contest {
  id: number;
  title: string;
  description: string;
  duration: {
    start: string;
    end: string;
  };
  totalProblems: number;
  author: string;
  rules: string[];
}

// Mock data - replace with real fetching logic
const contests: Contest[] = [
  {
    id: 1,
    title: "CodeMania 2025 - Round 1",
    description: "A 3-hour online coding contest.",
    duration: {
      start: "2025-08-01T10:00:00",
      end: "2025-08-01T13:00:00",
    },
    totalProblems: 5,
    author: "SCEM Coding Club",
    rules: [
      "No plagiarism",
      "Individual participation only",
      "Submit before deadline",
    ],
  },
  {
    id: 2,
    title: "CodeSprint 2025 - Round 2",
    description: "A 2-hour sprint for coding enthusiasts.",
    duration: {
      start: "2025-09-01T15:00:00",
      end: "2025-09-01T17:00:00",
    },
    totalProblems: 4,
    author: "SCEM Coding Club",
    rules: ["No cheating", "Solo only", "Submit on time"],
  },
];

export default async function TestPage({
  params,
}: {
  params: { id: string };
}) {
  const contest = contests.find((c) => String(c.id) === params.id);
  if (!contest) return notFound();

  return (
    <div className="h-screen pt-12 bg-primary text-foreground">
      <div className="flex flex-col md:flex-row h-full">
        {/* Main Detail Section */}
        <div className="flex-1 p-6 bg-primary"></div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-card border shadow-md flex flex-col">
          <ScrollArea className="flex-1 min-h-0  p-6">
            <div className="space-y-6 ">
              {/* Title and Description */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {contest.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {contest.description}
                </p>
              </div>

              {/* Test Details Grid */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Test Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 text-sm">
                  <div>
                    <span className="block font-semibold text-primary">
                      Start
                    </span>
                    <p>{new Date(contest.duration.start).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-primary">
                      End
                    </span>
                    <p>{new Date(contest.duration.end).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-primary">
                      Problems
                    </span>
                    <p>{contest.totalProblems}</p>
                  </div>
                  <div>
                    <span className="block font-semibold text-primary">
                      Author
                    </span>
                    <p>{contest.author}</p>
                  </div>
                </div>
              </div>

              {/* Rules (cleaned up repeated sections) */}
              <div>
                <h4 className="text-lg font-semibold text-primary mb-2">
                  Rules
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {contest.rules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>
              </div>

              {/* Summary */}
              <div className="text-sm space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start</span>
                  <span>
                    {new Date(contest.duration.start).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End</span>
                  <span>{new Date(contest.duration.end).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Problems</span>
                  <span>{contest.totalProblems}</span>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Take Test Button */}
          <div className="pt-0 p-6">
            <Link href={`/test/${contest.id}`}>
              <Button className="w-full gap-2">
                <Play className="w-4 h-4" />
                Take Test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
