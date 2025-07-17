import { Problem } from "@/types/problem";

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    points: 10,
    difficulty: "easy",
    type: "coding",
    inputFormat: "An array of integers and an integer target",
    outputFormat: "An array of two indices",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    boilerplate: {
      javascript: "function twoSum(nums, target) {\n  // Your code here\n}",
      python: "def two_sum(nums, target):\n    # Your code here\n    pass",
    },
  },
  {
    id: 2,
    title: "Binary Search Implementation",
    description:
      "Implement binary search algorithm to find a target value in a sorted array. Return the index if found, -1 otherwise.",
    points: 15,
    difficulty: "medium",
    type: "coding",
    inputFormat: "A sorted array of integers and an integer target",
    outputFormat: "An integer index or -1",
    constraints: ["1 <= nums.length <= 10^5"],
    boilerplate: {
      javascript:
        "function binarySearch(nums, target) {\n  // Your code here\n}",
      python:
        "def binary_search(nums, target):\n    # Your code here\n    pass",
    },
  },
  {
    id: 3,
    title: "JavaScript Closures",
    description:
      "Which of the following best describes a closure in JavaScript?",
    points: 5,
    difficulty: "easy",
    type: "mcq",
    questionType: "single",
    options: [
      {
        id: "a",
        text: "A function having access to its outer function scope even after the outer function has returned",
      },
      { id: "b", text: "A function with no parameters" },
      { id: "c", text: "A function that calls itself" },
    ],
  },
  {
    id: 4,
    title: "Longest Palindromic Substring",
    description:
      "Given a string s, return the longest palindromic substring in s. A palindrome reads the same backward as forward.",
    points: 25,
    difficulty: "hard",
    type: "coding",
    inputFormat: "A string s",
    outputFormat: "A string which is the longest palindrome",
    constraints: ["1 <= s.length <= 1000"],
    boilerplate: {
      javascript: "function longestPalindrome(s) {\n  // Your code here\n}",
      python: "def longest_palindrome(s):\n    # Your code here\n    pass",
    },
  },
  {
    id: 5,
    title: "React State Management",
    description:
      "What is the correct way to update state in a React functional component?",
    points: 8,
    difficulty: "medium",
    type: "mcq",
    questionType: "single",
    options: [
      { id: "a", text: "Directly assign a new value to the state variable" },
      { id: "b", text: "Use setState with a new value" },
      { id: "c", text: "Use the useState setter function" },
    ],
  },
  {
    id: 6,
    title: "Merge Sort Algorithm",
    description:
      "Implement the merge sort algorithm to sort an array of integers in ascending order.",
    points: 20,
    difficulty: "medium",
    type: "coding",
    inputFormat: "An array of integers",
    outputFormat: "A sorted array in ascending order",
    constraints: ["1 <= nums.length <= 10^5"],
    boilerplate: {
      javascript: "function mergeSort(nums) {\n  // Your code here\n}",
      python: "def merge_sort(nums):\n    # Your code here\n    pass",
    },
  },
  {
    id: 7,
    title: "Database Normalization",
    description: "Which normal form eliminates transitive dependencies?",
    points: 12,
    difficulty: "hard",
    type: "mcq",
    questionType: "single",
    options: [
      { id: "a", text: "1NF" },
      { id: "b", text: "2NF" },
      { id: "c", text: "3NF" },
      { id: "d", text: "BCNF" },
    ],
  },
  {
    id: 8,
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    points: 10,
    difficulty: "easy",
    type: "coding",
    inputFormat: "A string containing parentheses",
    outputFormat: "Boolean indicating validity",
    constraints: ["1 <= s.length <= 10^4"],
    boilerplate: {
      javascript: "function isValid(s) {\n  // Your code here\n}",
      python: "def is_valid(s):\n    # Your code here\n    pass",
    },
  },
  {
    id: 9,
    title: "Big O Notation",
    description:
      "What is the time complexity of searching for an element in a balanced binary search tree?",
    points: 6,
    difficulty: "easy",
    type: "mcq",
    questionType: "single",
    options: [
      { id: "a", text: "O(n)" },
      { id: "b", text: "O(log n)" },
      { id: "c", text: "O(1)" },
    ],
  },
  {
    id: 10,
    title: "Graph Shortest Path",
    description:
      "Implement Dijkstra's algorithm to find the shortest path between two nodes in a weighted graph.",
    points: 30,
    difficulty: "hard",
    type: "coding",
    inputFormat: "A graph as an adjacency list and a source node",
    outputFormat: "An array of shortest distances from source",
    constraints: ["Graph contains no negative weight edges"],
    boilerplate: {
      javascript: "function dijkstra(graph, source) {\n  // Your code here\n}",
      python: "def dijkstra(graph, source):\n    # Your code here\n    pass",
    },
  },
  {
    id: 11,
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
    id: 12,
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
  startsAt: string;
  status: "waiting" | "ongoing" | "completed";

  participantsInProgress: number;
  participantsCompleted: number;
}

export const testsData: Test[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Basic JavaScript concepts and syntax",
    duration: "60 minutes",
    totalQuestions: 10,
    participantsInProgress: 8,
    participantsCompleted: 12,
    status: "ongoing",
    startsAt: "2025-07-10 10:00 AM",
  },
  {
    id: "2",
    title: "React Components",
    description: "Understanding React components and props",
    duration: "90 minutes",
    totalQuestions: 15,
    participantsInProgress: 0,
    participantsCompleted: 0,
    status: "waiting",
    startsAt: "2025-07-12 11:30 AM",
  },
  {
    id: "3",
    title: "Database Design",
    description: "SQL and database modeling concepts",
    duration: "120 minutes",
    totalQuestions: 20,
    participantsInProgress: 0,
    participantsCompleted: 32,
    status: "completed",
    startsAt: "2025-07-08 09:00 AM",
  },
  {
    id: "4",
    title: "Python Basics",
    description: "Introduction to Python programming",
    duration: "75 minutes",
    totalQuestions: 12,
    participantsInProgress: 7,
    participantsCompleted: 15,
    status: "ongoing",
    startsAt: "2025-07-15 02:00 PM",
  },
  {
    id: "5",
    title: "Data Structures",
    description: "Arrays, linked lists, stacks, and queues",
    duration: "105 minutes",
    totalQuestions: 18,
    participantsInProgress: 10,
    participantsCompleted: 18,
    status: "completed",
    startsAt: "2025-07-05 01:30 PM",
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
