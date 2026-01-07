import React from "react";
import { QuestionHeader } from "@/components/admin/question/header";
import QuestionsFilterableList from "@/components/admin/question/questions-filterable-list";
import { problems as mockProblems } from "@/constants/test-data";
import fs from "fs/promises";
import path from "path";

const QUESTIONS_FILE = path.join(process.cwd(), "data", "questions.json");

export const dynamic = "force-dynamic";

async function getLocalQuestions() {
  try {
    const data = await fs.readFile(QUESTIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Could not read local questions:", error);
    return [];
  }
}

export default async function AdminQuestionsPage() {
  const localQuestions = await getLocalQuestions();

  // Ensure localQuestions is an array and reverse it safely
  const localArr = Array.isArray(localQuestions) ? [...localQuestions].reverse() : [];

  // Merge mock problems with locally added questions
  // Prefix local IDs to avoid duplicates with mock data
  const allProblems = [
    ...localArr.map((p) => ({ ...p, id: `local-${p.id}` })),
    ...mockProblems,
  ];

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="max-w-none w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <QuestionHeader />
        <QuestionsFilterableList initialProblems={allProblems} />
      </div>
    </div>
  );
}
