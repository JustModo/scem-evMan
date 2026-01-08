"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Problem, MCQProblem } from "@/types/problem";
import { useRouter, useParams } from "next/navigation";

interface MCQScreenProps {
  problem: MCQProblem;
  problems: Problem[];
}

export default function MCQScreen({ problem, problems }: MCQScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const params = useParams();

  // Create sorting logic matching TestHeader: MCQs first, then Coding
  const mcqProblems = problems.filter((p) => p.type === "mcq");
  const codingProblems = problems.filter((p) => p.type === "coding");
  const sortedProblems = [...mcqProblems, ...codingProblems];

  const currentIndex = sortedProblems.findIndex((p) => p.id === problem.id);
  const prevProblem = sortedProblems[currentIndex - 1];
  const nextProblem = sortedProblems[currentIndex + 1];

  const handleSingleSelect = (value: string) => {
    setSelected([value]);
  };

  const handleMultipleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlePrev = () => {
    if (prevProblem) {
      router.push(`/attempt/test/${params.testid}/question/${prevProblem.id}`);
    }
  };

  const handleNext = () => {
    if (nextProblem) {
      router.push(`/attempt/test/${params.testid}/question/${nextProblem.id}`);
    }
  };

  return (
    <div className="h-full bg-background p-4 flex justify-center items-center overflow-hidden">
      <Card className="border-border bg-card shadow-lg w-full max-w-3xl h-[90vh]">
        <div className="flex items-center gap-3 px-6 h-14 border-b border-border">
          <Badge variant="secondary" className="capitalize px-3 py-1">
            {problem.difficulty}
          </Badge>
          <span className="text-sm font-medium text-muted-foreground">
            {problem.points} Points
          </span>
        </div>
        <ScrollArea className="min-h-0 px-6 h-[calc(90vh-7rem)] flex-1">
          <div className="py-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-xl font-semibold text-foreground text-start">
                Q. {problem.title}
              </h1>
              {/* Question Type */}
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-muted-foreground">
                  {problem.questionType === "single"
                    ? "Single Choice"
                    : "Multiple Choice"}
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        ${selected.includes(opt.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                          }
                      `}
                      >
                        <div className="flex items-center gap-3 h-full">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium flex-shrink-0 group-hover:bg-primary/10 transition-colors">
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
                        ${selected.includes(opt.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                          }
                      `}
                      >
                        <div className="flex items-center gap-3 h-full">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium flex-shrink-0 group-hover:bg-primary/10 transition-colors">
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
          </div>
        </ScrollArea>

        {/* Navigation Buttons */}
        <div className="h-14 border-t border-border flex items-center justify-between px-6 bg-muted/20">
          <Button
            variant="outline"
            className="px-6 font-medium"
            onClick={handlePrev}
            disabled={!prevProblem}
          >
            Prev
          </Button>
          <Button
            className="px-6 font-medium"
            onClick={handleNext}
            disabled={!nextProblem}
          >
            {nextProblem ? "Next" : "Finish"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
