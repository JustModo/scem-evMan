"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, Fragment, useActionState, useTransition } from "react";
import { QuestionSchema, questionSchema } from "@/types/problem";
import { saveQuestion } from "@/app/actions/save-question";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import BasicInfoCard from "./shared/info-card";
import MCQCard from "./mcq/mcq-card";
import CodingCard from "./coding";

interface Props {
  type: "coding" | "mcq";
  isCreating: boolean;
  initialData?: Partial<QuestionSchema> | null;
}

export default function QuestionForm({ type, isCreating, initialData }: Props) {
  const getDefaultValues = (): QuestionSchema => {
    if (type === "coding") {
      return {
        type: "coding",
        title: "",
        description: "",
        points: 0,
        difficulty: "easy",
        inputFormat: "",
        outputFormat: "",
        constraints: [""],
        boilerplate: { c: "", cpp: "", java: "", python: "", javascript: "" },
      };
    } else {
      return {
        type: "mcq",
        title: "",
        description: "",
        points: 0,
        difficulty: "easy",
        questionType: "single",
        options: [
          { id: "1", text: "" },
          { id: "2", text: "" },
          { id: "3", text: "" },
          { id: "4", text: "" },
        ],
        correctOptionIds: [],
      };
    }
  };

  const form = useForm<QuestionSchema>({
    resolver: zodResolver(questionSchema),
    defaultValues: initialData || getDefaultValues(),
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset(getDefaultValues());
    }
  }, [initialData, type]);

  const [state, formAction] = useActionState(saveQuestion, {
    success: false,
    message: "",
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={"/admin/questions"}>
            <Button variant="outline" size="icon" className="text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold truncate">
              {isCreating ? "Create Question" : "Edit Question"}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {type.charAt(0).toUpperCase() + type.slice(1)} type
            </p>
          </div>
        </div>
        <Button
          type="submit"
          form="question-form"
          disabled={isPending}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>

      <Form {...form}>
        <form id="question-form" onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoCard />

          <input type="hidden" {...form.register("type")} value={type} />

          {type === "coding" && <CodingCard />}

          {type === "mcq" && <MCQCard />}
        </form>
      </Form>
    </Fragment>
  );
}
