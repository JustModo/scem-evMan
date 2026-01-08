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
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MCQCard() {
  const { control, watch, setValue } = useFormContext();

  const questionType = watch("questionType");
  const correctOptionIds = watch("correctOptionIds") || [];
  const options = watch("options") || [];

  useEffect(() => {
    if (options.length !== 4) {
      setValue(
        "options",
        Array.from({ length: 4 }, (_, i) => {
          const existing = options[i];
          return existing
            ? { id: existing.id ?? `${i}`, text: existing.text ?? "" }
            : { id: `${i}`, text: "" };
        })
      );
    }
  }, [options, setValue]);

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
        {/* Question Type */}
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

        {/* Option Inputs */}
        <div className="space-y-2">
          <FormLabel className="text-base">Options</FormLabel>
          {Array.from({ length: 4 }, (_, index) => (
            <FormField
              key={index}
              control={control}
              name={`options.${index}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Option {index + 1}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Option text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Correct Option Selection with validation */}
        <FormField
          control={control}
          name="correctOptionIds"
          render={() => (
            <FormItem>
              <FormLabel className="text-base mt-6">
                Select Correct Option(s)
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {questionType === "single" && (
                    <RadioGroup
                      value={correctOptionIds[0] || ""}
                      onValueChange={handleSingleSelect}
                      className="space-y-1"
                    >
                      {Array.from({ length: 4 }, (_, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <RadioGroupItem value={`${index}`} />
                          <FormLabel>Option {index + 1}</FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {questionType === "multiple" &&
                    Array.from({ length: 4 }, (_, index) => {
                      const optionId = options[index]?.id || `${index}`;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <Checkbox
                            checked={correctOptionIds.includes(optionId)}
                            onCheckedChange={(checked) =>
                              handleMultiToggle(optionId, !!checked)
                            }
                          />
                          <FormLabel>Option {index + 1}</FormLabel>
                        </div>
                      );
                    })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
