"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { questionSchema, type QuestionSchema } from "@/types/problem";

const QUESTIONS_FILE = path.join(process.cwd(), "data", "questions.json");
const STATS_FILE = path.join(process.cwd(), "data", "statistics.json");

export async function saveQuestion(_prevState: any, data: QuestionSchema) {
  try {
    const validatedData = questionSchema.parse(data);

    // 1. Save the full Question to questions.json
    const questionsContent = await fs.readFile(QUESTIONS_FILE, "utf-8");
    const questions = JSON.parse(questionsContent);
    const newId = questions.length > 0 ? Math.max(...questions.map((q: any) => q.id)) + 1 : 1;
    const newQuestion = { id: newId, ...validatedData };
    questions.push(newQuestion);
    await fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions, null, 2));

    // 2. Update Statistics JSON locally
    const statsContent = await fs.readFile(STATS_FILE, "utf-8");
    const stats = JSON.parse(statsContent);

    stats.totalQuestions += 1;
    if (validatedData.difficulty === "easy") stats.easyQuestions += 1;
    else if (validatedData.difficulty === "medium") stats.mediumQuestions += 1;
    else if (validatedData.difficulty === "hard") stats.hardQuestions += 1;

    await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));

    // 3. Revalidate Dashboard
    revalidatePath("/admin");

    return {
      success: true,
      message: "Question added! Full data saved to data/questions.json and stats updated.",
    };
  } catch (error) {
    console.error("Error saving question:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to save question",
    };
  }
}
