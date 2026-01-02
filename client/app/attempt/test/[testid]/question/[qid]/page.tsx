import { problems } from "@/constants/test-data";
import { CodeScreen } from "@/components/attempt/code";
import React from "react";
import { CodingProblem } from "@/types/problem";
import MCQScreen from "@/components/attempt/mcq";

interface Props {
  params: Promise<{
    testid: string;
    qid: string;
  }>;
}

export default async function TestContentPage(props: Props) {
  const params = await props.params;
  const qid = Number(params.qid);
  const problem = problems.find((p) => p.id === qid);

  if (!problem) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Problem not found.
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {problem.type === "coding" ? (
        <CodeScreen problem={problem as CodingProblem} />
      ) : (
        <MCQScreen />
      )}
    </div>
  );
}
