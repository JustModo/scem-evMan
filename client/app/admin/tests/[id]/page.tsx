import { IdParams } from "@/types/params";
import React from "react";

// Admin: Contest Details
// Show detailed information about a specific contest.
export default async function AdminTestDetailPage(props: { params: Promise<IdParams> }) {
  const params = await props.params;
  const { id } = params;
  return <div>AdminTestDetailPage Screen: {id}</div>;
}
