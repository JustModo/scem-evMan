import { Problem } from "@/types/test";

export const problems: Problem[] = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    description: "Given two numbers, return their sum.",
    type: "coding",
    difficulty: "easy",
    inputFormat: "Two integers a and b",
    outputFormat: "An integer representing their sum",
    constraints: ["1 <= a, b <= 10^9"],
    boilerplate: {
      javascript: "function sum(a, b) {\n  // Your code here\n}",
      python: "def sum(a, b):\n    # Your code here\n    pass",
    },
    points: 10,
  },
  {
    id: 2,
    title: "What is the output of 2 + 2?",
    description: "Select the correct answer.",
    type: "mcq",
    difficulty: "easy",
    questionType: "single",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
    ],
    points: 5,
  },
];
