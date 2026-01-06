export interface BaseProblem {
  id: string | number;
  _id?: string; // MongoDB ID
  title: string;
  description: string;
  marks: number;
  difficulty: "Easy" | "Medium" | "Hard";
  questionType: "Single Correct" | "Multiple Correct" | "Coding"; // Added for handling generic type in list
  type?: "coding" | "mcq"; // Keep for internal logic if needed, or map to questionType
}

export interface CodingProblem extends BaseProblem {
  inputFormat: string;
  outputFormat: string;
  constraints: string; // Changed from string[] to String based on upstream Question.js
  boilerplateCode: { // Changed from boilerplate
    cpp?: string;
    c?: string;
    java?: string;
    python?: string;
    javascript?: string;
  };
}

export interface MCQProblem extends BaseProblem {
  questionType: "Single Correct" | "Multiple Correct";
  options: string[]; // Question.js has options: [String]
  correctAnswer: string;
}

export type Problem = CodingProblem | MCQProblem;
