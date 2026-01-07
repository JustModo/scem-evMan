import React from "react";
import { notFound } from "next/navigation";
import { TestDetailHeader } from "@/components/admin/test/test-detail/header";
import { TestInformationCard } from "@/components/admin/test/test-detail/test-card";
import { ParticipationStatisticsCard } from "@/components/admin/test/test-detail/participation-card";
import { QuickActionsCard } from "@/components/admin/test/test-detail/actions-card";
import TestEditQuestions from "@/components/admin/test/questions-list";
import { db } from "@/lib/db";

interface IdParams {
  id: string;
}

export default async function AdminTestDetailPage({
  params,
}: {
  params: Promise<IdParams>;
}) {
  const { id } = await params;
  let test = null;

  try {
    const data = await db.findOne("contests", { _id: id });
    if (data) {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      const diffMs = end.getTime() - start.getTime();
      const totalSeconds = Math.floor(diffMs / 1000);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      test = {
        id: data._id,
        title: data.title,
        description: data.description,
        duration: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
        startsAt: data.startTime,
        problems: (data.questions || []).map((q: any) => ({
          ...q,
          id: q?._id ?? q?.id,
        })),
        status: data.status,
        participantsInProgress: 0,
        participantsCompleted: 0,
        totalQuestions: data.questions?.length || 0,
        createdAt: data.createdAt,
      };
    }
  } catch (error) {
    console.error("Error fetching test detail:", error);
  }

  if (!test) {
    notFound();
  }

  return (
    <div className="flex-1 h-full bg-background text-foreground overflow-x-hidden">
      <div className="h-full w-full">
        <div className="max-w-none w-full p-4 sm:p-6 lg:p-8">
          <div className="space-y-6 sm:space-y-8">
            <TestDetailHeader test={test} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              <TestInformationCard test={test} />

              <ParticipationStatisticsCard test={test} />
            </div>

            <TestEditQuestions questions={test.problems} />
            <QuickActionsCard test={test} />
          </div>
        </div>
      </div>
    </div>
  );
}
