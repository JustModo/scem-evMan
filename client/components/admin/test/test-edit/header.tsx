"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestEditHeader({
  testData,
}: {
  testData: { id: string; status: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    router.push(`/admin/tests/${testData.id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link href={`/admin/tests/${testData.id}`}>
          <Button variant="outline" size="icon" className="text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold truncate">Edit Test</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Modify test details, questions, and settings
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            testData.status === "completed"
              ? "bg-green-600 text-white"
              : testData.status === "ongoing"
              ? "bg-blue-600 text-white"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {testData.status.charAt(0).toUpperCase() + testData.status.slice(1)}
        </span>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span>Saving...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
