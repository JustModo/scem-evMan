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

export interface Test {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalQuestions: number;
  participants: number;
  participantsInProgress: number; // Add real participation tracking
  participantsCompleted: number;
  status: "waiting" | "ongoing" | "completed";
  createdAt: string;
}

export const testsData: Test[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Basic JavaScript concepts and syntax",
    duration: "60 minutes",
    totalQuestions: 10,
    participants: 20,
    participantsInProgress: 8,
    participantsCompleted: 12,
    status: "ongoing",
    createdAt: "2025-07-10 10:00 AM",
  },
  {
    id: "2",
    title: "React Components",
    description: "Understanding React components and props",
    duration: "90 minutes",
    totalQuestions: 15,
    participants: 18,
    participantsInProgress: 0,
    participantsCompleted: 0,
    status: "waiting",
    createdAt: "2025-07-12 11:30 AM",
  },
  {
    id: "3",
    title: "Database Design",
    description: "SQL and database modeling concepts",
    duration: "120 minutes",
    totalQuestions: 20,
    participants: 32,
    participantsInProgress: 0,
    participantsCompleted: 32,
    status: "completed",
    createdAt: "2025-07-08 09:00 AM",
  },
  {
    id: "4",
    title: "Python Basics",
    description: "Introduction to Python programming",
    duration: "75 minutes",
    totalQuestions: 12,
    participants: 22,
    participantsInProgress: 7,
    participantsCompleted: 15,
    status: "ongoing",
    createdAt: "2025-07-15 02:00 PM",
  },
  {
    id: "5",
    title: "Data Structures",
    description: "Arrays, linked lists, stacks, and queues",
    duration: "105 minutes",
    totalQuestions: 18,
    participants: 28,
    participantsInProgress: 10,
    participantsCompleted: 18,
    status: "completed",
    createdAt: "2025-07-05 01:30 PM",
  },
];

// Helper function to get all tests
export const getAllTests = (): Test[] => {
  return testsData;
};

// Helper function to get a test by ID
export const getTestById = (id: string): Test | undefined => {
  return testsData.find((test) => test.id === id);
};

// Helper function to get tests by status
export const getTestsByStatus = (status: Test["status"]): Test[] => {
  return testsData.filter((test) => test.status === status);
};
