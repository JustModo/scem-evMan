// edit-form.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";

export default function TestBasicCard() {
  const { control, setValue, watch } = useFormContext();

  const startsAt = watch("startsAt");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    if (startsAt) {
      const parsed = new Date(startsAt);
      if (!isNaN(parsed.getTime())) {
        setDate(parsed);
        setTime(parsed.toTimeString().slice(0, 8));
      }
    }
  }, [startsAt]);

  useEffect(() => {
    if (date && time) {
      const [h, m, s] = time.split(":").map(Number);
      const updated = new Date(date);
      updated.setHours(h);
      updated.setMinutes(m);
      updated.setSeconds(s);
      setValue("startsAt", updated.toISOString());
    }
  }, [date, time, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Basic Information
        </CardTitle>
        <CardDescription>
          Configure the test title, description, and scheduling settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Test Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (HH:MM:SS)</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    step="1"
                    className="w-fit bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label>Starts At</Label>
            <div className="flex space-x-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-32 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(d) => {
                      setDate(d);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-fit bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </div>
          </div>
        </div>
        {/* Hidden status field to ensure it is passed */}
        <FormField
          control={control}
          name="status"
          render={({ field }) => <input type="hidden" {...field} />}
        />
      </CardContent>
    </Card>
  );
}
