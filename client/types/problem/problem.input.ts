import { BaseProblem, CodingProblem, MCQProblem } from "./problem.types";

type CreateFrom<T extends BaseProblem> = Omit<T, "id">;
type UpdateFrom<T extends BaseProblem> = Partial<Omit<T, "id">>;

export type CodingProblemCreate = CreateFrom<CodingProblem>;
export type CodingProblemUpdate = UpdateFrom<CodingProblem>;

export type MCQProblemCreate = CreateFrom<MCQProblem>;
export type MCQProblemUpdate = UpdateFrom<MCQProblem>;
