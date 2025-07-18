"use server";

export async function saveQuestion(_prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const difficulty = formData.get("difficulty") as string;
  const constraints = formData.get("constraints") as string;
  const boilerplate = formData.get("boilerplate") as string;
  const inputFormat = formData.get("inputFormat") as string;
  const outputFormat = formData.get("outputFormat") as string;

  try {
    // Simulate saving the question
    console.log("Saving question:", {
      title,
      description,
      difficulty,
      constraints,
      boilerplate,
      inputFormat,
      outputFormat,
    });

    return { success: true, message: "Question saved successfully" };
  } catch (error) {
    return { success: false, message: "Failed to save question" };
  }
}
