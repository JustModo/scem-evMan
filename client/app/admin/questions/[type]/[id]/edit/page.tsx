// app/questions/[type]/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import QuestionForm from "@/components/admin/question/question-form";
import { db } from "@/lib/db";

const VALID_TYPES = ["coding", "mcq"] as const;

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;
  if (!VALID_TYPES.includes(type as any)) return notFound();

  let data = null;
  try {
      data = await db.findOne("questions", { _id: id });
  } catch(e) {
      console.error(e);
  }

  if (!data || data.type !== type) return notFound();
  
  // Ensure data has string ID if component expects it, logic might need adjustment depending on QuestionForm props
  // MongoDB _id is generic, QuestionForm might expect specific shape.
  const mappedData = { 
    ...data, 
    id: data._id || data.id,
    // Map mismatched fields
    points: data.marks || data.points || 0,
    difficulty: data.difficulty?.toLowerCase(),
    // Coding specific
    boilerplate: data.boilerplateCode,
    constraints: typeof data.constraints === 'string' 
      ? (data.constraints as string).split(',').map(s => s.trim()).filter(Boolean)
      : (Array.isArray(data.constraints) ? data.constraints : [""]),
    
    // MCQ specific
    options: Array.isArray(data.options) 
        ? data.options.map((opt: any, index: number) => typeof opt === 'string' ? { id: String(index), text: opt } : opt)
        : [
          { id: "1", text: "" },
          { id: "2", text: "" },
          { id: "3", text: "" },
          { id: "4", text: "" },
        ],
    correctOptionIds: data.correctAnswer ? [data.correctAnswer] : [],
    questionType: data.questionType === "Multiple Correct" ? "multiple" : "single"
  };

  return (
    <QuestionForm
      type={type as "coding" | "mcq"}
      isCreating={false}
      initialData={mappedData}
    />
  );
}
