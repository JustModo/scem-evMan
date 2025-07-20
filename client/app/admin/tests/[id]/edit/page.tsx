import { notFound } from "next/navigation";
import { getTestById } from "@/constants/test-data";
import TestForm from "@/components/admin/test/test-form";

interface IdParams {
  id: string;
}

export default async function AdminTestEditPage({
  params,
}: {
  params: Promise<IdParams>;
}) {
  const { id } = await params;
  const testData = getTestById(id);

  if (!testData || testData.status !== "waiting") {
    return notFound();
  }

  return (
    <div className="flex-1 h-full bg-background text-foreground overflow-x-hidden">
      <div className="h-full w-full">
        <TestForm testData={testData} />
      </div>
    </div>
  );
}
