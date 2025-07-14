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
import { ArrowLeft, Save, Plus, FileText, Settings } from "lucide-react";

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

  if (!testId) {
    return (
      <div className="flex-1 h-full bg-background text-foreground">
        <div className="h-full w-full p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full bg-background text-foreground overflow-x-hidden">
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
                    <div>TODO: TestCard</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
