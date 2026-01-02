// app/questions/[type]/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getQuestionById } from "@/constants/test-data";
import QuestionForm from "@/components/admin/question/question-form";

const VALID_TYPES = ["coding", "mcq"] as const;

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;
  if (!VALID_TYPES.includes(type as any)) return notFound();

  const data = await getQuestionById(parseInt(id));
  if (!data || data.type !== type) return notFound();

  return (
    <QuestionForm
      type={type as "coding" | "mcq"}
      isCreating={false}
      initialData={data}
    />
  );
}
