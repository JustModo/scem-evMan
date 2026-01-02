"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeXml, EyeOff } from "lucide-react";

// Dummy Sample Test Cases
const sampleTestCases = [
  {
    id: 1,
    input: "2 3",
    expected: "5",
    output: "5",
    status: "passed",
  },
  {
    id: 2,
    input: "10 20",
    expected: "30",
    output: "25",
    status: "failed",
  },
];

// Dummy Hidden Test Cases
const hiddenTestCases = [
  { id: 1, status: "passed" },
  { id: 2, status: "failed" },
  { id: 3, status: "pending" },
];

export default function TestCasePanel() {
  const [view, setView] = useState<"initial" | "sample" | "hidden">("initial");

  const failedCount = hiddenTestCases.filter(
    (t) => t.status === "failed"
  ).length;
  const passedCount = hiddenTestCases.filter(
    (t) => t.status === "passed"
  ).length;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 border-b flex items-center justify-between text-sm h-11 bg-muted">
        <Label className="flex items-center gap-2">
          <CodeXml className="h-4 w-4" />
          Test Cases
        </Label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setView("sample")}
          >
            Run
          </Button>
          <Button size="sm" onClick={() => setView("hidden")}>
            Submit
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1 p-4 pr-4 overflow-y-auto">
        {view === "initial" && (
          <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground h-full gap-2">
            <EyeOff className="w-6 h-6" />
            <p>You haven’t run your code yet.</p>
          </div>
        )}

        {view === "sample" && (
          <div className="space-y-4">
            {sampleTestCases.map((tc) => (
              <div
                key={tc.id}
                className="border rounded-md p-3 space-y-2 text-sm"
              >
                <div className="flex justify-between">
                  <Label>Test Case {tc.id}</Label>
                  <Badge
                    variant={tc.status === "passed" ? "default" : "destructive"}
                  >
                    {tc.status}
                  </Badge>
                </div>

                <div>
                  <p className="text-muted-foreground">Input:</p>
                  <pre className="bg-muted px-2 py-1 rounded">{tc.input}</pre>
                </div>

                <div>
                  <p className="text-muted-foreground">Expected Output:</p>
                  <pre className="bg-muted px-2 py-1 rounded">
                    {tc.expected}
                  </pre>
                </div>

                <div>
                  <p className="text-muted-foreground">My Output:</p>
                  <pre
                    className={`px-2 py-1 rounded ${
                      tc.output === tc.expected ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {tc.output}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "hidden" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4 text-center">
                <div className="text-muted-foreground text-xs">Passed</div>
                <div className="text-2xl font-semibold text-primary">
                  {passedCount}
                </div>
              </div>
              <div className="border rounded-md p-4 text-center">
                <div className="text-muted-foreground text-xs">Failed</div>
                <div className="text-2xl font-semibold text-destructive">
                  {failedCount}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {hiddenTestCases.map((tc) => (
                <div
                  key={tc.id}
                  className="flex items-center justify-between border rounded px-4 py-2"
                >
                  <div className="text-sm font-medium text-muted-foreground">
                    Hidden Case {tc.id}
                  </div>
                  <Badge
                    variant={
                      tc.status === "passed"
                        ? "default"
                        : tc.status === "failed"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {tc.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
