"use server";

export async function saveQuestion(formData: FormData) {
  const type = formData.get("type") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const difficulty = formData.get("difficulty") as string;
  const constraints = formData.get("constraints") as string;
  const boilerplate = formData.get("boilerplate") as string;
  const inputFormat = formData.get("inputFormat") as string;
  const outputFormat = formData.get("outputFormat") as string;
  const points = formData.get("points") as string;
  const options = formData.get("options") as string;
  const correctOptionIds = formData.get("correctOptionIds") as string;

  const base = {
    title,
    description,
    difficulty,
    type,
    points,
  };

  try {
    if (type === "coding") {
      console.log("Saving coding question:", {
        ...base,
        constraints,
        boilerplate,
        inputFormat,
        outputFormat,
      });
    } else if (type === "mcq") {
      console.log("Saving MCQ question:", {
        ...base,
        options,
        correctOptionIds,
      });
    }

    return { success: true, message: "Question saved successfully" };
  } catch (error) {
    return { success: false, message: "Failed to save question" };
  }
}
