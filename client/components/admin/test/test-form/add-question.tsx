"use client";
import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Settings } from "lucide-react";
import { problems } from "@/constants/test-data";
import QuestionCard from "../../question/question-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuestionAddForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");

  const filteredProblems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(term) ||
        problem.description.toLowerCase().includes(term);
      const matchesType =
        !typeFilter ||
        typeFilter === "all" ||
        problem.type?.toLowerCase() === typeFilter.toLowerCase();

      const matchesDifficulty =
        !difficultyFilter ||
        difficultyFilter === "all" ||
        problem.difficulty?.toLowerCase() === difficultyFilter.toLowerCase();

      return matchesSearch && matchesType && matchesDifficulty;
    });
  }, [searchTerm, typeFilter, difficultyFilter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add Questions
        </CardTitle>
        <CardDescription>Add questions to test</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border flex-1"
          />
          <Select onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="mcq">MCQ</SelectItem>
              <SelectItem value="coding">Coding</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[50vh] pr-4">
          {filteredProblems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No questions yet</p>
              <p className="text-sm">Try a different filter or search</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProblems.map((problem) => (
                <QuestionCard
                  key={problem.id}
                  problem={problem}
                  onClickQuestion={(e) => console.log(e)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
