import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Plus } from "lucide-react";

export default function QuestionAddForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add Questions
        </CardTitle>
        <CardDescription>Add questions to test</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">TODO</CardContent>
    </Card>
  );
}
