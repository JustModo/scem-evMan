import React from "react";
import { notFound } from "next/navigation";
import { getTestById } from "@/constants/test-data";
import { TestDetailHeader } from "@/components/admin/test/test-detail/header";
import { TestInformationCard } from "@/components/admin/test/test-detail/test-card";
import { ParticipationStatisticsCard } from "@/components/admin/test/test-detail/participation-card";
import { QuickActionsCard } from "@/components/admin/test/test-detail/actions-card";

interface IdParams {
  id: string;
}

export default async function AdminTestDetailPage({
  params,
}: {
  params: Promise<IdParams>;
}) {
  const { id } = await params;
  const test = getTestById(id);

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

            <QuickActionsCard test={test} />
          </div>
        </div>
      </div>
    </div>
  );
}
