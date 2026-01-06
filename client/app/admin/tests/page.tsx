import React from "react";
import { db } from "@/lib/db";
import { TestsList } from "@/components/admin/test/tests-list";

export const dynamic = "force-dynamic";

export default async function AdminTestsPage() {
  let tests = [];
  try {
      tests = await db.find("contests");
  } catch(e) {
      console.error(e);
  }

  return <TestsList initialTests={tests} />;
}
