import { IdParams } from "@/types/params";
import React from "react";

// Admin: Question Details
// See details of a specific question.
export default async function AdminQuestionDetailPage(
  props: {
    params: Promise<IdParams>;
  }
) {
  const params = await props.params;
  const { id } = params;
  return <div>AdminQuestionDetailPage Screen : {id}</div>;
}
