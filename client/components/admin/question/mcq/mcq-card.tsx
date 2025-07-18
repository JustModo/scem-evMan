"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/types/problem";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MCQCard() {
  const { control, watch, setValue } = useFormContext();

  const questionType = watch("questionType");
  const correctOptionIds = watch("correctOptionIds") || [];
  const options = watch("options") || [];

  // Ensure options array has exactly 4 elements
  if (options.length !== 4) {
    setValue(
      "options",
      Array.from(
        { length: 4 },
        (_, i) => options[i] || { id: `${i}`, text: "" }
      )
    );
  }

  const handleSingleSelect = (selectedId: string) => {
    setValue("correctOptionIds", [selectedId]);
  };

  const handleMultiToggle = (id: string, checked: boolean) => {
    const set = new Set(correctOptionIds);
    checked ? set.add(id) : set.delete(id);
    setValue("correctOptionIds", Array.from(set));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pencil className="h-5 w-5 text-primary" />
          MCQ Options
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="questionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single">Single Correct</SelectItem>
                  <SelectItem value="multiple">Multiple Correct</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormLabel className="text-base">Options</FormLabel>

        <div className="space-y-4">
          {questionType === "single" && (
            <RadioGroup
              value={correctOptionIds[0] || ""}
              onValueChange={handleSingleSelect}
              className="space-y-4"
            >
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border p-3 rounded"
                >
                  <FormField
                    control={control}
                    name={`options.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm">
                          Option {index + 1}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Option text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <RadioGroupItem value={`${index}`} />
                  <FormLabel>Correct</FormLabel>
                </div>
              ))}
            </RadioGroup>
          )}

          {questionType === "multiple" &&
            Array.from({ length: 4 }, (_, index) => {
              const optionId = options[index]?.id || `${index}`;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 border p-3 rounded"
                >
                  <FormField
                    control={control}
                    name={`options.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm">
                          Option {index + 1}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Option text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Checkbox
                    checked={correctOptionIds.includes(optionId)}
                    onCheckedChange={(checked) =>
                      handleMultiToggle(optionId, !!checked)
                    }
                  />
                  <FormLabel>Correct</FormLabel>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
