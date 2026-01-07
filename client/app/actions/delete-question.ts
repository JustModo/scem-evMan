"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const QUESTIONS_FILE = path.join(process.cwd(), "data", "questions.json");
const STATS_FILE = path.join(process.cwd(), "data", "statistics.json");
const DELETED_MOCK_FILE = path.join(process.cwd(), "data", "deleted_mock_questions.json");

export async function deleteQuestion(id: string | number) {
    try {
        const isLocal = typeof id === "string" && id.startsWith("local-");
        const cleanId = isLocal ? parseInt(id.replace("local-", ""), 10) : id;

        let difficultyToDelete: string | null = null;

        if (isLocal) {
            // 1. Remove from questions.json
            const questionsData = await fs.readFile(QUESTIONS_FILE, "utf-8");
            const questions = JSON.parse(questionsData);

            const questionIndex = questions.findIndex((q: any) => q.id === cleanId);
            if (questionIndex !== -1) {
                difficultyToDelete = questions[questionIndex].difficulty;
                questions.splice(questionIndex, 1);
                await fs.writeFile(QUESTIONS_FILE, JSON.stringify(questions, null, 2));
            }
        } else {
            // 2. Add to deleted_mock_questions.json
            const deletedData = await fs.readFile(DELETED_MOCK_FILE, "utf-8");
            const deletedIds = JSON.parse(deletedData);

            if (!deletedIds.includes(id)) {
                deletedIds.push(id);
                await fs.writeFile(DELETED_MOCK_FILE, JSON.stringify(deletedIds, null, 2));

                // For mock questions, we need to know the difficulty to update stats
                // This is a bit complex as we have to look in test-data.ts, 
                // but for now we focus on local questions or simply decrement totalQuestions.
            }
        }

        // 3. Update Statistics
        const statsData = await fs.readFile(STATS_FILE, "utf-8");
        const stats = JSON.parse(statsData);

        stats.totalQuestions = Math.max(0, stats.totalQuestions - 1);
        if (difficultyToDelete === "easy") stats.easyQuestions = Math.max(0, stats.easyQuestions - 1);
        else if (difficultyToDelete === "medium") stats.mediumQuestions = Math.max(0, stats.mediumQuestions - 1);
        else if (difficultyToDelete === "hard") stats.hardQuestions = Math.max(0, stats.hardQuestions - 1);

        await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));

        revalidatePath("/admin");
        revalidatePath("/admin/questions");
        revalidatePath("/admin/settings");

        return { success: true };
    } catch (error) {
        console.error("Error deleting question:", error);
        return { success: false, error: "Failed to delete question" };
    }
}
