"use client";

import { Test, TestSchema, testSchema } from "@/types/test";
import QuestionAddCard from "./add-question";
import TestBasicCard from "./info-card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useActionState, useTransition } from "react";
import TestQuestions from "../questions-list";
import { saveTest } from "@/app/actions/save-test";

export default function TestForm({ testData }: { testData: Test }) {
  const form = useForm<TestSchema>({
    resolver: zodResolver(testSchema),
    defaultValues: testData,
  });

  const [state, formAction] = useActionState(saveTest, {
    success: false,
    message: "",
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });

  const questions = form.watch("problems") as number[];

  return (
    <div className="max-w-none w-full p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/admin/tests/${testData.id}`}>
            <Button variant="outline" size="icon" className="text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold truncate">
              Edit Test
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Modify test details, questions, and settings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            form="test-form"
            disabled={isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6 lg:gap-8">
        <div className="2xl:col-span-3 space-y-6">
          <Form {...form}>
            <form id="test-form" onSubmit={handleSubmit} className="space-y-6">
              <TestBasicCard />
              <QuestionAddCard />
              <TestQuestions questions={questions} />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
