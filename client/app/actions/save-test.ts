"use server";

import { testSchema, TestSchema } from "@/types/test";

export async function saveTest(_prevState: any, data: TestSchema) {
  try {
    const validatedData = testSchema.parse(data);

    console.log("Validated test data:", validatedData);

    return {
      success: true,
      message: "Test saved successfully",
    };
  } catch (error) {
    console.error("Error saving test:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to save test",
    };
  }
}
