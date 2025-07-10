"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"; // fixed import path

const dummyProblem = {
  id: 2,
  title: "What is the output of 2 + 2?",
  type: "mcq",
  difficulty: "easy",
  questionType: "single",
  points: 10,
  options: [
    {
      id: "a",
      text: "2",
    },
    { id: "b", text: "4" },
    { id: "c", text: "5" },
    { id: "d", text: "22" },
  ],
};

export default function MCQScreen() {
  const problem = dummyProblem;
  const [selected, setSelected] = useState<string[]>([]);

  const handleSingleSelect = (value: string) => {
    setSelected([value]);
  };

  const handleMultipleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="h-full bg-background p-4 flex justify-center items-center overflow-hidden">
      <Card className="border-border bg-card shadow-lg w-full max-w-3xl h-[90vh]">
        <div className="flex items-center gap-3 px-6">
          <Badge variant="secondary" className="capitalize px-3 py-1">
            {problem.difficulty}
          </Badge>
          <span className="text-sm font-medium text-muted-foreground">
            {problem.points} Points
          </span>
        </div>
        <ScrollArea className="min-h-0 px-6 flex-1">
          {/* Header */}
          <div className="border-b border-border mb-2">
            <h1 className="text-xl font-semibold text-foreground text-start">
              Q. {problem.title}
            </h1>
          </div>

          {/* Question Type */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-muted-foreground">
              {problem.questionType === "single"
                ? "Single Choice"
                : "Multiple Choice"}
            </span>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {problem.questionType === "single" ? (
              <RadioGroup
                value={selected[0]}
                onValueChange={handleSingleSelect}
                className="contents"
              >
                {problem.options.map((opt, index) => (
                  <div key={opt.id} className="h-full">
                    <label
                      htmlFor={opt.id}
                      className={`
                        group block w-full h-full border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
                        ${
                          selected.includes(opt.id)
                            ? "border-primary"
                            : "border-border hover:border-muted"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 h-full">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <RadioGroupItem
                          value={opt.id}
                          id={opt.id}
                          className="flex-shrink-0"
                        />
                        <span className="text-base font-medium flex-1 min-w-0 text-foreground">
                          {opt.text}
                        </span>
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <>
                {problem.options.map((opt, index) => (
                  <div key={opt.id} className="h-full">
                    <label
                      htmlFor={opt.id}
                      className={`
                        group block w-full h-full border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
                        ${
                          selected.includes(opt.id)
                            ? "border-primary"
                            : "border-border hover:border-muted"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 h-full">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <Checkbox
                          id={opt.id}
                          checked={selected.includes(opt.id)}
                          onCheckedChange={() => handleMultipleSelect(opt.id)}
                          className="flex-shrink-0"
                        />
                        <span className="text-base font-medium flex-1 min-w-0 text-foreground">
                          {opt.text}
                        </span>
                      </div>
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Submit Button */}
        <div className="py-4 border-t border-border flex justify-between px-6">
          <Button
            className="px-6 py-2 font-medium"
            onClick={() => alert("Submitted: " + selected.join(", "))}
          >
            Prev
          </Button>
          <Button
            className="px-6 py-2 font-medium"
            onClick={() => alert("Submitted: " + selected.join(", "))}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
