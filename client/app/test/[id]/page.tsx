// import { IdParams } from "@/types/params";
// import React from "react";
// import ContestCard from "@/components/contest-card";
// import { ContestLandingData } from "@/types/contest";

// export default async function TestDetails(props: { params: Promise<IdParams> }) {
//   const params = await props.params;
//   const { id } = params;

//   // Dummy contest data - can be dynamic later
//   const contestData: ContestLandingData = {
//     title: `CodeMania 2025 - Round ${id}`,
//     description: "A 3-hour online coding contest to test your skills.",
//     duration: {
//       start: "2025-05-01T10:00:00",
//       end: "2025-05-01T13:00:00",
//     },
//     totalProblems: 5,
//     author: "SCEM Coding Club",
//     rules: [
//       "No plagiarism",
//       "Individual participation only",
//       "Submit all answers before the end time",
//     ],
//   };

//   return (
//     <>
//       {/* Render ContestCard */}
//       <ContestCard data={contestData} />
//     </>
//   );
// }
"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function AdminTestsPage() {
  const [selected, setSelected] = useState<Contest | null>(null);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-[72px] p-4 gap-4 bg-background text-foreground">
      {/* Left Panel */}
      <div className="md:w-[35%] w-full rounded-2xl border border-primary bg-secondary text-foreground p-4 shadow-xl h-[calc(100vh-100px)] overflow-auto">
        <h2 className="text-2xl font-bold mb-5 tracking-tight text-primary">
          All Tests
        </h2>
        <ScrollArea className="h-[80%] pr-2">
          <div className="space-y-4">
            {contests.map((contest) => (
              <Card
                key={contest.id}
                className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 shadow-md ${
                  selected?.id === contest.id
                    ? "bg-primary/20 border-primary ring-2 ring-primary scale-[1.02] text-foreground"
                    : "bg-card hover:bg-secondary hover:scale-[1.01] text-foreground"
                }`}
                onClick={() => setSelected(contest)}
              >
                <h3 className="text-lg font-semibold">{contest.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(contest.duration.start).toLocaleString()}
                </p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel */}
      <div className="md:w-[65%] w-full rounded-2xl border border-primary bg-card p-6 shadow-xl text-foreground h-[calc(100vh-100px)] overflow-auto">
        {selected ? (
          <div className="space-y-5">
            <h2 className="text-3xl font-bold tracking-tight">
              {selected.title}
            </h2>
            <p className="text-base text-primary/80">{selected.description}</p>

            <div className="grid grid-cols-2 gap-4 text-base">
              <div>
                <span className="block font-semibold text-primary">
                  Start
                </span>
                <p>{new Date(selected.duration.start).toLocaleString()}</p>
              </div>
              <div>
                <span className="block font-semibold text-primary">
                  End
                </span>
                <p>{new Date(selected.duration.end).toLocaleString()}</p>
              </div>
              <div>
                <span className="block font-semibold text-primary">
                  Problems
                </span>
                <p>{selected.totalProblems}</p>
              </div>
              <div>
                <span className="block font-semibold text-primary">
                  Author
                </span>
                <p>{selected.author}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-primary text-lg mb-2">
                Rules
              </h3>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                {selected.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground text-center pt-10 text-lg">
            Select a test from the left to view its details.
          </div>
        )}
      </div>
    </div>
  );
}

