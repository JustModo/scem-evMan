import TestHeader from "@/components/attempt/test-header";
import { auth } from "@/auth";
import React from "react";

export default async function TestLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ testid: string; qid: string }>;
}) {
  const { testid } = await params;
  const session = await auth();

  // Fetch real contest data via student-facing API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contest/${testid}/data`, {
    headers: {
      "Authorization": `Bearer ${session?.backendToken}`,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  const result = await res.json();
  const problems = result.data?.problems || [];

  const problemMeta = problems.map((q: any) => ({
    id: q.id,
    type: q.questionType
  }));

  return (
    <main className="w-screen h-screen pt-12">
      <TestHeader problems={problemMeta} />
      {children}
    </main>
  );
}
