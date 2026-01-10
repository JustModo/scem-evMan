import { db } from "@/lib/db";
import { CodeScreen } from "@/components/attempt/code";
import React from "react";
import { CodingProblem, MCQProblem } from "@/types/problem";
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
  const problem = await db.findOne("questions", { _id: qid });

  if (!problem) {
    return notFound();
  }

  // Fetch all problems for this test to enable navigation (Passing full details is safer)
  const contest = await db.findOne("contests", { _id: testid });
  const questionIds = contest?.questions || [];
  const allProblems = await Promise.all(
    questionIds.map((id: string) => db.findOne("questions", { _id: id }))
  );

  const normalizedProblems = allProblems
    .filter(p => p !== null)
    .map(p => ({
      ...p,
      id: p._id, // Map _id to id for component compatibility
    }));

  return (
    <div className="w-full h-full">
      {problem.questionType === "Coding" ? (
        <CodeScreen problem={{ ...problem, id: problem._id } as any} />
      ) : (
        <MCQScreen
          problem={{ ...problem, id: problem._id } as any}
          problems={normalizedProblems}
        />
      )}
    </div>
  );
}
