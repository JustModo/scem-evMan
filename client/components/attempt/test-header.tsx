"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useParams } from "next/navigation";

type ProblemMeta = {
  id: string;
  type: string;
};

interface TestHeaderProps {
  problems: ProblemMeta[];
}

export default function TestHeader({ problems }: TestHeaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentId = pathname.split("/").pop();

  const scroll = (distance: number) => {
    scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  const mcqProblems = problems.filter((p) => p.type !== "Coding");
  const codingProblems = problems.filter((p) => p.type === "Coding");

  return (
    <div className="flex items-center justify-center p-2 select-none h-12 absolute top-0 w-screen bg-primary">
      <Button
        variant="secondary"
        size="icon"
        className="bg-muted rounded-none rounded-l-lg"
        onClick={() => scroll(-300)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div ref={scrollRef} className="overflow-x-auto no-scrollbar">
        <div className="flex w-max bg-background h-9">
          {mcqProblems.length > 0 && (
            <div className="flex items-center rounded-md px-2 py-1">
              <div className="px-2 flex items-center text-xs font-bold text-muted-foreground bg-muted rounded-sm mr-2 py-1">
                MCQ
              </div>
              <div className="flex gap-1">
                {mcqProblems.map((problem, i) => {
                  const isActive = String(problem.id) === currentId;
                  return (
                    <Button
                      key={problem.id}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-sm data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      data-state={isActive ? "active" : undefined}
                      onClick={() =>
                        router.push(`/attempt/test/${params.testid}/question/${problem.id}`)
                      }
                    >
                      {i + 1}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
          {codingProblems.length > 0 && (
            <div className="flex items-center rounded-md px-2 py-1">
              <div className="px-2 flex items-center text-xs font-bold text-muted-foreground bg-muted rounded-sm mr-2 py-1">
                CODE
              </div>
              <div className="flex gap-1">
                {codingProblems.map((problem, i) => {
                  const isActive = String(problem.id) === currentId;
                  return (
                    <Button
                      key={problem.id}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-sm data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      data-state={isActive ? "active" : undefined}
                      onClick={() =>
                        router.push(`/attempt/test/${params.testid}/question/${problem.id}`)
                      }
                    >
                      {i + 1}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        variant="secondary"
        size="icon"
        className="bg-muted rounded-none rounded-r-lg"
        onClick={() => scroll(300)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        variant={"secondary"}
        className="text-sm mx-4"
      >
        Submit
        <BadgeCheck className="h-4 w-4" />
      </Button>
    </div>
  );
}
