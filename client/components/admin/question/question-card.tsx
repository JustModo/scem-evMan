import { BaseProblem } from "@/types/test";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Code, HelpCircle, Star } from "lucide-react";

export default function QuestionCard({ problem }: { problem: BaseProblem }) {
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

  return (
    <div className="border rounded-lg p-4 transition-colors hover:bg-muted cursor-pointer">
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

        {problem.tags && problem.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {problem.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {problem.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{problem.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
