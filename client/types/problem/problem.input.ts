import z from "zod/v3";
// import { BaseProblem, CodingProblem, MCQProblem } from "./problem.types";

// type CreateFrom<T extends BaseProblem> = Omit<T, "id">;
// type UpdateFrom<T extends BaseProblem> = Partial<Omit<T, "id">>;

// export type CodingProblemCreate = CreateFrom<CodingProblem>;
// export type CodingProblemUpdate = UpdateFrom<CodingProblem>;

// export type MCQProblemCreate = CreateFrom<MCQProblem>;
// export type MCQProblemUpdate = UpdateFrom<MCQProblem>;

const codingSchema = z.object({
  type: z.literal("coding"),
  title: z.string().min(1),
  description: z.string().min(1),
  points: z.coerce.number().min(0),
  difficulty: z.enum(["easy", "medium", "hard"]),
  inputFormat: z.string().min(1),
  outputFormat: z.string().min(1),
  constraints: z.array(z.string().min(1)),
  boilerplate: z.record(z.string()),
});

const mcqSchema = z.object({
  type: z.literal("mcq"),
  title: z.string().min(1),
  description: z.string().min(1),
  points: z.coerce.number().min(0),
  difficulty: z.enum(["easy", "medium", "hard"]),
  questionType: z.enum(["single", "multiple"]),
  options: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1),
      })
    )
    .length(4, "Exactly 4 options are required"),
  correctOptionIds: z.array(z.string()).min(1),
});

export const formSchema = z.discriminatedUnion("type", [
  codingSchema,
  mcqSchema,
]);

export type FormSchema = z.infer<typeof formSchema>;
