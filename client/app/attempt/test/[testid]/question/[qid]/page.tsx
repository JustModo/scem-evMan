import { db } from "@/lib/db";
import { CodeScreen } from "@/components/attempt/code";
import React from "react";
import { CodingProblem, MCQProblem, Problem } from "@/types/problem";
import MCQScreen from "@/components/attempt/mcq";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    testid: string;
    qid: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function TestContentPage(props: Props) {
  const params = await props.params;
  const { testid, qid } = params;

  // Fetch real question data
  const problem = await db.findOne<Record<string, unknown>>("questions", { _id: qid });

  if (!problem) {
    return notFound();
  }

  // Fetch all problems for this test to enable navigation (Passing full details is safer)
  const contest = await db.findOne<Record<string, unknown>>("contests", { _id: testid });
  const questionIds = (contest?.questions as string[]) || [];
  const allProblems = await Promise.all(
    questionIds.map((id: string) => db.findOne<Record<string, unknown>>("questions", { _id: id }))
  );

  const normalizedProblems = allProblems
    .filter((p): p is Record<string, unknown> => p !== null)
    .map(p => ({
      ...p,
      id: p._id as string, // Map _id to id for component compatibility
    })) as Problem[];

  const currentProblem = { ...problem, id: problem._id as string } as Problem;

  return (
    <div className="w-full h-full">
      {currentProblem.questionType === "Coding" ? (
        <CodeScreen problem={currentProblem as CodingProblem} />
      ) : (
        <MCQScreen
          problem={currentProblem as MCQProblem}
          problems={normalizedProblems}
        />
      )}
    </div>
  );
}
