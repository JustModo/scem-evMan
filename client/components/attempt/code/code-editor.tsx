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

type Language = "c" | "cpp" | "python" | "java";

const languageOptions: { label: string; value: Language }[] = [
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
];

const defaultCode: Record<Language, string> = {
  c: `#include <stdio.h>\nint main() {\n  printf("Hello, C!\\n");\n  return 0;\n}`,
  cpp: `#include <iostream>\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}`,
  python: `print("Hello, Python!")`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`,
};

export default function CodeEditorPanel() {
  const [language, setLanguage] = useState<Language>("python");

  return (
    <div className="flex flex-col h-full w-full">
      {/* Language Selector - fixed height */}
      <div className="px-2 py-1 border-b flex items-center justify-between text-sm h-11">
        <Label className="flex items-center gap-1">
          <CodeXml className="h-4 w-4" /> Code
        </Label>
        <Select
          onValueChange={(val: Language) => setLanguage(val)}
          defaultValue="python"
        >
          <SelectTrigger className="h-8 w-32 text-sm">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Code Editor - takes remaining space */}
      <div className="flex-1 min-h-0">
        <Editor
          language={language}
          theme="vs-light"
          value={defaultCode[language]}
          options={{
            minimap: { enabled: false },
            glyphMargin: false,
            folding: false,
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            renderLineHighlight: "none", // disables current line highlight
            renderLineHighlightOnlyWhenFocus: false, // optional for clarity
          }}
        />
      </div>
    </div>
  );
}
