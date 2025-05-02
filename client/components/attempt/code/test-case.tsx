import { Label } from "@/components/ui/label";
import { CodeXml } from "lucide-react";
import React from "react";

export default function TestCasePanel() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Language Selector - fixed height */}
      <div className="px-2 py-1 border-b flex items-center justify-between text-sm h-11">
        <Label className="flex items-center gap-1">
          <CodeXml className="h-4 w-4" /> TestCases
        </Label>
      </div>
      {/* Code Editor - takes remaining space */}
      <div className="flex-1 min-h-0">Content</div>
    </div>
  );
}
