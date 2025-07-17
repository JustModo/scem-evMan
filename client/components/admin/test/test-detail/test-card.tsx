import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, Calendar } from "lucide-react";
import { Test } from "@/types/test";

interface TestInformationCardProps {
  test: Test;
}

export function TestInformationCard({ test }: TestInformationCardProps) {
  return (
    <Card className="bg-card border-border shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Test Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Duration</span>
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-primary/70" />
            <span className="font-semibold">{test.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">
            Total Questions
          </span>
          <div className="flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-semibold">{test.totalQuestions}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Created</span>
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4 text-primary/50" />
            <span className="font-semibold text-sm sm:text-base">
              {test.startsAt}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Test ID</span>
          <span className="text-foreground font-semibold font-mono text-sm sm:text-base">
            #{test.id}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
