import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodingProblem } from "@/types/test";
import { CodeXml } from "lucide-react";
import React from "react";

export default function DescriptionPanel({
  problem,
}: {
  problem: CodingProblem;
}) {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="px-4 py-2 border-b bg-muted flex items-center justify-between text-sm h-11">
        <Label className="flex items-center gap-2">
          <CodeXml className="h-4 w-4" />
          Description
        </Label>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-4 p-4 pb-18 text-sm">
          <div>
            <h2 className="text-2xl font-semibold pb-4">{problem.title}</h2>
            <p className="text-muted-foreground">{problem.description}</p>
          </div>

          <Separator />

          <div className="flex gap-8">
            <div>
              <Label className="text-muted-foreground upper">Difficulty</Label>
              <div className="text-sm capitalize">{problem.difficulty}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Points</Label>
              <div className="text-sm">{problem.points}</div>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-muted-foreground">Input Format</Label>
            <p>{problem.inputFormat}</p>
          </div>

          <div>
            <Label className="text-muted-foreground">Output Format</Label>
            <p>{problem.outputFormat}</p>
          </div>

          {problem.constraints?.length > 0 && (
            <div>
              <Label className="text-muted-foreground">Constraints</Label>
              <ul className="list-disc list-inside">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
