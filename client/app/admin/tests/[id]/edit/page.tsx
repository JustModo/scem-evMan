// import React from "react";

// // Admin: Edit Contest
// // Form to edit contest details, questions, settings.
// export default function AdminTestEditPage() {
//   return <div>AdminTestEditPage Screen</div>;
// }
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Clock,
  Users,
  FileText,
  Settings,
} from "lucide-react";

interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

interface TestData {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: "waiting" | "ongoing" | "completed";
  questions: Question[];
  participants: number;
  startDate: string;
  endDate: string;
}

type TestStatus = "waiting" | "ongoing" | "completed";

export default function AdminTestEditPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [testId, setTestId] = useState<string>("");

  // Handle params properly
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setTestId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  // Mock data - replace with actual API call
  const [testData, setTestData] = useState<TestData>({
    id: testId,
    title: "Advanced JavaScript Concepts",
    description:
      "Test your knowledge of advanced JavaScript topics including closures, promises, and ES6+ features",
    duration: 120,
    status: "waiting",
    questions: [
      {
        id: "q1",
        title: "Implement a debounce function",
        description:
          "Create a debounce function that delays the execution of a function until after a specified delay",
        difficulty: "medium",
        points: 25,
      },
      {
        id: "q2",
        title: "Promise.all implementation",
        description:
          "Implement your own version of Promise.all that handles multiple promises",
        difficulty: "hard",
        points: 30,
      },
    ],
    participants: 0,
    startDate: "2024-01-15T10:00:00Z",
    endDate: "2024-01-15T12:00:00Z",
  });

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.push(`/admin/tests/${testId}`);
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      title: "",
      description: "",
      difficulty: "easy",
      points: 10,
    };
    setTestData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const removeQuestion = (questionId: string) => {
    setTestData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const updateQuestion = (
    questionId: string,
    field: keyof Question,
    value: string | number | "easy" | "medium" | "hard"
  ) => {
    setTestData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      ),
    }));
  };

  // Show loading state until testId is resolved
  if (!testId) {
    return (
      <div className="flex-1 min-h-screen bg-background text-foreground">
        <div className="h-full w-full p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="h-full w-full">
        <div className="max-w-none w-full p-4 sm:p-6 lg:p-8">
          <div className="space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link href={`/admin/tests/${testId}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-border text-foreground hover:bg-accent flex-shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="space-y-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">
                    Edit Test
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Modify test details, questions, and settings
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap ${
                    testData.status === "completed"
                      ? "bg-green-600 text-white"
                      : testData.status === "ongoing"
                      ? "bg-blue-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {testData.status.charAt(0).toUpperCase() +
                    testData.status.slice(1)}
                </span>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="font-semibold px-4 sm:px-6 py-2 transition-all duration-200 shadow-lg hover:shadow-xl bg-green-600 hover:bg-green-700 whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span className="hidden sm:inline">Saving...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span className="hidden sm:inline">Save Changes</span>
                      <span className="sm:hidden">Save</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6 lg:gap-8">
              {/* Main Content */}
              <div className="2xl:col-span-3 space-y-6">
                {/* Basic Information */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <FileText className="h-5 w-5 text-green-400" />
                      Basic Information
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Configure the test title, description, and basic settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-foreground">
                        Test Title
                      </Label>
                      <Input
                        id="title"
                        value={testData.title}
                        onChange={(e) =>
                          setTestData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter test title"
                        className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-foreground">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={testData.description}
                        onChange={(e) =>
                          setTestData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Enter test description"
                        rows={3}
                        className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-foreground">
                          Duration (minutes)
                        </Label>
                        <Input
                          id="duration"
                          type="number"
                          value={testData.duration}
                          onChange={(e) =>
                            setTestData((prev) => ({
                              ...prev,
                              duration: parseInt(e.target.value),
                            }))
                          }
                          placeholder="120"
                          className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status" className="text-foreground">
                          Status
                        </Label>
                        <Select
                          value={testData.status}
                          onValueChange={(value) =>
                            setTestData((prev) => ({
                              ...prev,
                              status: value as TestStatus,
                            }))
                          }
                        >
                          <SelectTrigger className="bg-input border-border text-foreground">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem
                              value="waiting"
                              className="text-foreground hover:bg-accent"
                            >
                              Waiting
                            </SelectItem>
                            <SelectItem
                              value="ongoing"
                              className="text-foreground hover:bg-accent"
                            >
                              Ongoing
                            </SelectItem>
                            <SelectItem
                              value="completed"
                              className="text-foreground hover:bg-accent"
                            >
                              Completed
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Questions */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="flex items-center gap-2 text-foreground">
                          <Settings className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="truncate">
                            Questions ({testData.questions.length})
                          </span>
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Add and configure test questions
                        </CardDescription>
                      </div>
                      <Button
                        onClick={addQuestion}
                        variant="outline"
                        className="border-border text-foreground hover:bg-accent w-full sm:w-auto flex-shrink-0"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {testData.questions.map((question, index) => (
                      <Card
                        key={question.id}
                        className="bg-muted border-border"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className="text-lg font-semibold text-green-400 flex-shrink-0">
                                Q{index + 1}
                              </span>
                              <span
                                className={`text-sm font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                                  question.difficulty === "easy"
                                    ? "bg-green-400/20 text-green-400"
                                    : question.difficulty === "medium"
                                    ? "bg-yellow-400/20 text-yellow-400"
                                    : "bg-red-400/20 text-red-400"
                                }`}
                              >
                                {question.difficulty.charAt(0).toUpperCase() +
                                  question.difficulty.slice(1)}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeQuestion(question.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor={`title-${question.id}`}
                              className="text-foreground"
                            >
                              Question Title
                            </Label>
                            <Input
                              id={`title-${question.id}`}
                              value={question.title}
                              onChange={(e) =>
                                updateQuestion(
                                  question.id,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Enter question title"
                              className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor={`description-${question.id}`}
                              className="text-foreground"
                            >
                              Description
                            </Label>
                            <Textarea
                              id={`description-${question.id}`}
                              value={question.description}
                              onChange={(e) =>
                                updateQuestion(
                                  question.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Enter question description"
                              rows={2}
                              className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-green-500"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor={`difficulty-${question.id}`}
                                className="text-foreground"
                              >
                                Difficulty
                              </Label>
                              <Select
                                value={question.difficulty}
                                onValueChange={(value) =>
                                  updateQuestion(
                                    question.id,
                                    "difficulty",
                                    value
                                  )
                                }
                              >
                                <SelectTrigger className="bg-input border-border text-foreground">
                                  <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border-border">
                                  <SelectItem
                                    value="easy"
                                    className="text-foreground hover:bg-accent"
                                  >
                                    Easy
                                  </SelectItem>
                                  <SelectItem
                                    value="medium"
                                    className="text-foreground hover:bg-accent"
                                  >
                                    Medium
                                  </SelectItem>
                                  <SelectItem
                                    value="hard"
                                    className="text-foreground hover:bg-accent"
                                  >
                                    Hard
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`points-${question.id}`}
                                className="text-foreground"
                              >
                                Points
                              </Label>
                              <Input
                                id={`points-${question.id}`}
                                type="number"
                                value={question.points}
                                onChange={(e) =>
                                  updateQuestion(
                                    question.id,
                                    "points",
                                    parseInt(e.target.value)
                                  )
                                }
                                placeholder="10"
                                className="bg-input border-border text-foreground placeholder-muted-foreground focus:border-green-500"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {testData.questions.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No questions yet</p>
                        <p className="text-sm">
                          Click &quot;Add Question&quot; to get started
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
                {/* Test Stats */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                      Test Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Duration
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {testData.duration} min
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Questions
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {testData.questions.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Participants
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {testData.participants}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Total Points
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">
                        {testData.questions.reduce(
                          (sum, q) => sum + q.points,
                          0
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Question Summary */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                      Question Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">Easy</span>
                      <span className="font-semibold text-foreground">
                        {
                          testData.questions.filter(
                            (q) => q.difficulty === "easy"
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-400">Medium</span>
                      <span className="font-semibold text-foreground">
                        {
                          testData.questions.filter(
                            (q) => q.difficulty === "medium"
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-red-400">Hard</span>
                      <span className="font-semibold text-foreground">
                        {
                          testData.questions.filter(
                            (q) => q.difficulty === "hard"
                          ).length
                        }
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card className="bg-card border-border shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                      Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-border text-foreground hover:bg-accent"
                      onClick={() => router.push(`/admin/tests/${testId}`)}
                    >
                      Preview Test
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-border text-foreground hover:bg-accent"
                      onClick={() => router.push("/admin/tests")}
                    >
                      Back to Tests
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
