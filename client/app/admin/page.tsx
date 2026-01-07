import React from "react";
import HeroSection, { DashboardStats } from "@/components/admin/hero-section";
import { testsData, problems } from "@/constants/test-data";
import fs from "fs/promises";
import path from "path";

const STATS_FILE = path.join(process.cwd(), "data", "statistics.json");
const QUESTIONS_FILE = path.join(process.cwd(), "data", "questions.json");

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const data = await fs.readFile(STATS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

async function getQuestions() {
  try {
    const data = await fs.readFile(QUESTIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export default async function AdminAnalyticsPage() {
  const statsData = await getStats();

  // Fallback default stats from mock data
  const defaultStats: DashboardStats = {
    activeContests: testsData.filter((t) => t.status === "ongoing").length,
    draftedTests: testsData.filter((t) => t.status === "waiting").length,
    completedTests: testsData.filter((t) => t.status === "completed").length,
    totalQuestions: problems.length,
    totalParticipants: testsData.reduce(
      (acc, curr) => acc + (curr.participantsInProgress || 0) + (curr.participantsCompleted || 0),
      0
    ),
    easyQuestions: problems.filter((p) => p.difficulty === "Easy").length,
    mediumQuestions: problems.filter((p) => p.difficulty === "Medium").length,
    hardQuestions: problems.filter((p) => p.difficulty === "Hard").length,
  };

  const stats = { ...defaultStats, ...statsData };

  const recentTests = [...testsData]
    .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime())
    .slice(0, 4);

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="max-w-none w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        <HeroSection stats={stats} recentTests={recentTests} />
      </div>
    </div>
  );
}
