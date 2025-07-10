interface BaseProblem {
  id: number;
  title: string;
  description: string;
  points: number;
  tags?: string[];
  difficulty: "easy" | "medium" | "hard";
  type: "coding" | "mcq";
}

interface CodingProblem extends BaseProblem {
  type: "coding";
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  boilerplate: Record<string, string>;
}

interface MCQProblem extends BaseProblem {
  type: "mcq";
  questionType: "single" | "multiple";
  options: {
    id: string;
    text: string;
  }[];
}

export type Problem = CodingProblem | MCQProblem;
