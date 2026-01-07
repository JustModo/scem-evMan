"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const DATA_DIR = path.join(process.cwd(), "data");
const STATS_FILE = path.join(process.cwd(), "data", "statistics.json");
const QUESTIONS_FILE = path.join(process.cwd(), "data", "questions.json");
const DELETED_MOCK_FILE = path.join(process.cwd(), "data", "deleted_mock_questions.json");

const INITIAL_STATS = {
    activeContests: 2,
    draftedTests: 1,
    completedTests: 2,
    totalQuestions: 12,
    totalParticipants: 102,
    easyQuestions: 6,
    mediumQuestions: 3,
    hardQuestions: 3
};

export async function resetLocalData() {
    try {
        // 1. Reset collections
        await fs.writeFile(QUESTIONS_FILE, "[]");
        await fs.writeFile(DELETED_MOCK_FILE, "[]");

        // 2. Restore initial stats
        await fs.writeFile(STATS_FILE, JSON.stringify(INITIAL_STATS, null, 2));

        revalidatePath("/admin");
        revalidatePath("/admin/questions");
        revalidatePath("/admin/settings");

        return { success: true };
    } catch (error) {
        console.error("Error resetting data:", error);
        return { success: false, error: "Failed to reset data" };
    }
}
