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
import { useEffect, useState } from "react";
import { Test } from "@/types/test";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function TestEditForm({ testData }: { testData: Test }) {
  const [formData, setFormData] = useState(testData);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    if (testData.startsAt) {
      const parsed = new Date(testData.startsAt);
      if (!isNaN(parsed.getTime())) {
        setDate(parsed);
        setTime(parsed.toTimeString().slice(0, 8));
      }
    }
  }, [testData.startsAt]);

  useEffect(() => {
    if (date && time) {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      const updated = new Date(date);
      updated.setHours(hours);
      updated.setMinutes(minutes);
      updated.setSeconds(seconds);
      setFormData((prev) => ({
        ...prev,
        startsAt: updated.toISOString(),
      }));
    }
  }, [date, time]);

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
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Test Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
          />
        </div>

        {/* Duration and Date Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (HH:MM:SS)</Label>
            <Input
              id="duration"
              type="time"
              step="1"
              className="w-fit bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startsAt" className="px-1">
              Starts At
            </Label>
            <div className="flex space-x-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="startsAt"
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
                    onSelect={(selected) => {
                      setDate(selected);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Input
                type="time"
                id="time-picker"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-fit bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
