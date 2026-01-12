import TestHeader from "@/components/attempt/test-header";
import { db } from "@/lib/db";
import React from "react";

interface MongoContest {
  _id: string;
  questions?: string[];
}

interface MongoQuestion {
  _id: string;
  questionType: string;
}

export default async function TestLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ testid: string; qid: string }>;
}) {
  const { testid } = await params;

  // Fetch real contest to get the list of questions
  const contest = await db.findOne<MongoContest>("contests", { _id: testid });
  const questionIds = contest?.questions || [];

  // Fetch types for all questions in this test to pass to Header
  const questions = await Promise.all(
    questionIds.map((id: string) => db.findOne<MongoQuestion>("questions", { _id: id }))
  );

  const problemMeta = questions
    .filter((q): q is MongoQuestion => q !== null)
    .map((q) => ({
      id: q._id,
      type: q.questionType // Using questionType from DB ("Coding", "Single Correct", etc)
    }));

  return (
    <main className="w-screen h-screen pt-12">
      <TestHeader problems={problemMeta} />
      {children}
    </main>
  );
}
