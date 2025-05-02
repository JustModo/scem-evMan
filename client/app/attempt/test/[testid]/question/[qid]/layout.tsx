import TestHeader from "@/components/attempt/test-header";
import { problems } from "@/constants/test-data";
import React from "react";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const problemMeta = problems.map(({ id, type }) => ({ id, type }));

  return (
    <main className="w-screen h-screen flex flex-col">
      <TestHeader problems={problemMeta} />
      {children}
    </main>
  );
}
