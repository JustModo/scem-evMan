import { notFound } from "next/navigation";
import TestEditHeader from "@/components/admin/test/test-form/header";
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
        <div className="max-w-none w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          <TestEditHeader testData={testData} />
          <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6 lg:gap-8">
            <div className="2xl:col-span-3 space-y-6">
              <TestForm testData={testData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
