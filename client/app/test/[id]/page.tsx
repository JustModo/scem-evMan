import { IdParams } from "@/types/params";
import React from "react";

export default function TestDetails({ params }: { params: IdParams }) {
  const { id } = params;
  return <div>Test Details : {id}</div>;
}
