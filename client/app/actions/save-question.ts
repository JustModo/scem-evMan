"use server";

import { formSchema, type FormSchema } from "@/types/problem";

export async function saveQuestion(_prevState: any, data: FormSchema) {
  try {
    const validatedData = formSchema.parse(data);

    console.log("Validated question data:", validatedData);

    if (validatedData.type === "coding") {
      console.log("Saving coding question:", {
        title: validatedData.title,
        constraints: validatedData.constraints,
        boilerplate: validatedData.boilerplate,
      });
    } else if (validatedData.type === "mcq") {
      console.log("Saving MCQ question:", {
        title: validatedData.title,
        options: validatedData.options,
        correctOptionIds: validatedData.correctOptionIds,
      });
    }

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
