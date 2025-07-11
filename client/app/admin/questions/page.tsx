// import React from "react";

// // Admin: All Questions
// // View a list of all questions available.
// export default function AdminQuestionsPage() {
//   return <div>AdminQuestionsPage Screen</div>;
// }
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Code, Braces } from "lucide-react";

const groupedQuestions = {
  JavaScript: [
    {
      id: 1,
      title: "What is a closure in JavaScript?",
      description:
        "Closures allow a function to access variables from its outer scope even after the outer function has returned.",
    },
    {
      id: 2,
      title: "How does hoisting work in JavaScript?",
      description:
        "Hoisting moves declarations to the top of the scope. Only function and variable declarations are hoisted, not initializations.",
    },
  ],
  React: [
    {
      id: 3,
      title: "What is the difference between useEffect and useLayoutEffect?",
      description:
        "useEffect runs after the component renders, while useLayoutEffect runs before the paint phase, useful for layout calculations.",
    },
    {
      id: 4,
      title: "How do state and props differ in React?",
      description:
        "Props are passed to components and are read-only. State is managed within the component and can change over time.",
    },
  ],
  DSA: [
    {
      id: 5,
      title: "How does binary search algorithm work?",
      description:
        "Binary search finds the target by repeatedly dividing a sorted array in half, achieving O(log n) time complexity.",
    },
    {
      id: 6,
      title: "What is the difference between stack and queue?",
      description:
        "A stack follows LIFO (last-in, first-out), while a queue follows FIFO (first-in, first-out).",
    },
  ],
};

export default function AdminQuestionsPage() {
  return (
    <div className="h-full w-full p-6 md:p-10 bg-black text-white overflow-y-scroll">
      <h1 className="text-4xl font-bold text-center mb-12">Manage Questions</h1>

      <div className="space-y-16">
        {Object.entries(groupedQuestions).map(([subject, questions]) => {
          const Icon =
            subject === "JavaScript"
              ? Braces
              : subject === "React"
              ? Code
              : BookOpen;

          return (
            <section key={subject} className="px-2 md:px-4 w-full">
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-5 pl-1">
                <Icon className="text-[#B8E1B0] w-5 h-5" />
                <h2 className="text-2xl font-semibold text-[#B8E1B0]">
                  {subject}
                </h2>
              </div>

              {/* Cards */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {questions.map((q) => (
                  <Card
                    key={q.id}
                    className="rounded-xl border border-[#B8E1B0] bg-[#1a1a1a] hover:shadow-lg hover:scale-[1.01] transition duration-200"
                  >
                    <CardContent className="p-5 space-y-2 overflow-hidden">
                      <div className="text-xs font-semibold bg-[#B8E1B0] text-[#111] px-3 py-1 inline-block rounded-full">
                        {subject}
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {q.title}
                      </h3>
                      <p className="text-sm text-gray-400 break-words">
                        {q.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
