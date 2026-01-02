"use server";

import { questionSchema, type QuestionSchema } from "@/types/problem";

export async function saveQuestion(_prevState: any, data: QuestionSchema) {
  try {
    const validatedData = questionSchema.parse(data);

    console.log("Validated question data:", validatedData);

    return {
      success: true,
      message: "Question saved successfully",
    };
  } catch (error) {
    console.error("Error saving question:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to save question",
    };
  }
}
