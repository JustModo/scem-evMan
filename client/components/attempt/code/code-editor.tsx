import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CodeXml } from "lucide-react";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";
import { CodingProblem } from "@/types/problem";

type Language = keyof CodingProblem["boilerplate"];

export default function CodeEditorPanel({
  problem,
}: {
  problem: CodingProblem;
}) {
  const availableLanguages = Object.keys(problem.boilerplate) as Language[];
  const [language, setLanguage] = useState<Language>(availableLanguages[0]);
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col h-full w-full">
      {/* Language Selector */}
      <div className="px-2 py-1 border-b flex items-center justify-between text-sm h-11 bg-muted">
        <Label className="flex items-center gap-1">
          <CodeXml className="h-4 w-4" /> Code
        </Label>
        <Select
          onValueChange={(val: Language) => setLanguage(val)}
          defaultValue={availableLanguages[0]}
        >
          <SelectTrigger className="h-8 w-32 text-sm">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Code Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          language={language}
          theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
          value={problem.boilerplate[language]}
          options={{
            minimap: { enabled: false },
            glyphMargin: false,
            folding: false,
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: "none",
            renderLineHighlightOnlyWhenFocus: false,
          }}
          loading={<Skeleton className="w-full h-full bg-muted" />}
        />
      </div>
    </div>
  );
}
