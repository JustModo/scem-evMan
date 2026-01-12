import React from "react";
import { db } from "@/lib/db";
import { TestsList, MongoTestContent } from "@/components/admin/test/tests-list";

export const dynamic = "force-dynamic";

export default async function AdminTestsPage() {
  let tests: MongoTestContent[] = [];
  try {
    tests = await db.find<MongoTestContent>("contests") as MongoTestContent[];
  } catch {
    // ignore
  }

  return <TestsList initialTests={tests} />;
}
