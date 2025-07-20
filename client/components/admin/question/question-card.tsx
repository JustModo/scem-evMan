"use client";
import { BaseProblem } from "@/types/problem";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Code, HelpCircle, Star } from "lucide-react";

interface Props {
  problem: BaseProblem;
  selected?: boolean;
  onClickQuestion?: (id: number) => void;
}

export default function QuestionCard({
  problem,
  selected,
  onClickQuestion,
}: Props) {
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "default";
      case "medium":
        return "secondary";
      case "hard":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "coding" ? (
      <Code className="w-4 h-4" />
    ) : (
      <HelpCircle className="w-4 h-4" />
    );
  };

  const handleClick = () => {
    if (onClickQuestion) onClickQuestion(problem.id);
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-colors cursor-pointer ${
        selected ? "bg-muted border-primary" : "hover:bg-muted"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg leading-tight mb-1">
            {problem.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {problem.description}
          </p>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground ml-4 flex-shrink-0">
          <Star className="w-4 h-4" />
          <span className="text-sm font-medium">{problem.points}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant={getDifficultyVariant(problem.difficulty)}
            className="capitalize"
          >
            {problem.difficulty}
          </Badge>

          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(problem.type)}
            {problem.type.toUpperCase()}
          </Badge>
        </div>
      </div>
    </div>
  );
}
