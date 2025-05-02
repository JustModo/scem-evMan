import { IdParams } from "@/types/params";
import React from "react";
import ContestCard from "@/components/contest-card";
import { ContestLandingData } from "@/types/contest";

export default async function TestDetails(props: { params: Promise<IdParams> }) {
  const params = await props.params;
  const { id } = params;

  // Dummy contest data - can be dynamic later
  const contestData: ContestLandingData = {
    title: `CodeMania 2025 - Round ${id}`,
    description: "A 3-hour online coding contest to test your skills.",
    duration: {
      start: "2025-05-01T10:00:00",
      end: "2025-05-01T13:00:00",
    },
    totalProblems: 5,
    author: "SCEM Coding Club",
    rules: [
      "No plagiarism",
      "Individual participation only",
      "Submit all answers before the end time",
    ],
  };

  return (
    <>
      {/* Render ContestCard */}
      <ContestCard data={contestData} />
    </>
  );
}
