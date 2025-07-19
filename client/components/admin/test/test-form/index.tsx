import React, { Fragment } from "react";
import TestEditForm from "./edit-form";
import QuestionAddForm from "./add-question";
import TestQuestions from "../questions-list";
import { Test } from "@/types/test";

export default function TestForm({ testData }: { testData: Test }) {
  return (
    <Fragment>
      <TestEditForm testData={testData} />
      <QuestionAddForm />
      <TestQuestions questions={testData.problems} />
    </Fragment>
  );
}
