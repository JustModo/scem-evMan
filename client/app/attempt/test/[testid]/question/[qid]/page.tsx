import { problems } from "@/constants/test-data";
import { CodeScreen } from "@/components/attempt/code";
import React from "react";

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
    <div className="flex-1 w-full h-full">
      {problem.type === "coding" ? (
        <CodeScreen />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-xl text-muted-foreground">
          TODO: MCQ Screen
        </div>
      )}
    </div>
  );
}
