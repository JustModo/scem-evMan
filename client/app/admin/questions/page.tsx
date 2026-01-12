import React from "react";
import { db } from "@/lib/db";
import { QuestionsList } from "@/components/admin/question/questions-list";

import { Problem } from "@/types/problem";

export const dynamic = "force-dynamic";

export default async function AdminQuestionsPage() {
  let questions: Problem[] = [];
  try {
    questions = await db.find<Problem>("questions") as Problem[];
  } catch {
    // ignore
  }

  return <QuestionsList initialQuestions={questions} />;
}