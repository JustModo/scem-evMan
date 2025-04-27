import { IdParams } from "@/types/params";
import React from "react";

// Admin: Question Details
// See details of a specific question.
export default function AdminQuestionDetailPage({
  params,
}: {
  params: IdParams;
}) {
  const { id } = params;
  return <div>AdminQuestionDetailPage Screen : {id}</div>;
}
