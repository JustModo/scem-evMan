"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { getAllTests } from "@/constants/test-data";
import { Badge } from "@/components/ui/badge";

export default function AdminTestsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const tests = getAllTests();

  const filteredTests = tests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className="max-w-none w-full p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Tests
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl">
                Create and manage coding tests for your students
              </p>
            </div>
            <Link href="/admin/tests/new/edit">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl">
                + Create New Test
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-full sm:max-w-lg">
            <Input
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input border-border"
            />
          </div>

          {/* Tests Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredTests.map((test) => (
              <Card key={test.id} className="shadow-md bg-card border-border">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl text-foreground font-semibold truncate">
                        {test.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-1 text-sm leading-relaxed line-clamp-2">
                        {test.description}
                      </CardDescription>
                    </div>
                    <Badge
                      className={`px-3 py-1 text-xs font-medium rounded-full border flex-shrink-0`}
                    >
                      {test.status === "completed"
                        ? "Completed"
                        : test.status === "ongoing"
                        ? "Active"
                        : "Waiting"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Date & Time */}
                  <div
                    className="flex items-center gap-2 text-muted-foreground text-sm mb-4 p-3 bg-muted rounded-lg"
                    title="Start Date & Time"
                  >
                    <Clock className="h-4 w-4 text-foreground flex-shrink-0" />
                    <span className="font-medium">Started:</span>
                    <span className="truncate">{test.createdAt}</span>
                  </div>

                  {/* Progress Stats */}
                  {test.status === "waiting" ? (
                    <div className="flex items-center justify-center p-4 bg-muted rounded-lg border border-border mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-foreground">
                            {test.participants}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Registered
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : test.status === "completed" ? (
                    <div className="flex items-center justify-center p-4 rounded-lg border bg-muted mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-foreground">
                            {test.participantsCompleted}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Completed
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div
                        className="flex items-center gap-2 p-2 bg-muted rounded-lg border border-border"
                        title="Not started yet"
                      >
                        <div className="w-3 h-3 bg-muted-foreground rounded-full flex-shrink-0"></div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-foreground">
                            {test.participants -
                              test.participantsInProgress -
                              test.participantsCompleted}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            Not Started
                          </span>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-2 p-2 bg-muted rounded-lg border border-border"
                        title="Tests currently being taken"
                      >
                        <div className="w-3 h-3 bg-primary/70 rounded-full flex-shrink-0"></div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-foreground">
                            {test.participantsInProgress}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            In Progress
                          </span>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-2 p-2 bg-muted rounded-lg border border-border"
                        title="Completed submissions"
                      >
                        <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-foreground">
                            {test.participantsCompleted}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="space-y-3 mb-6 p-4 bg-muted rounded-lg border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Duration
                      </span>
                      <span className="text-foreground font-semibold">
                        {test.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Questions
                      </span>
                      <span className="text-foreground font-semibold">
                        {test.totalQuestions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Total Participants
                      </span>
                      <span className="text-foreground font-semibold">
                        {test.participants}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href={`/admin/tests/${test.id}`} className="flex-1">
                      <Button variant="outline" className="w-full text-sm">
                        View
                      </Button>
                    </Link>

                    {test.status !== "completed" ? (
                      <Link
                        href={`/admin/tests/${test.id}/edit`}
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full text-sm">
                          Edit
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        variant={"outline"}
                        className="flex-1 w-full text-sm bg-muted cursor-not-allowed"
                      >
                        Completed
                      </Button>
                    )}

                    <div className="flex-1">
                      <Button
                        className={`w-full text-sm font-medium shadow-md`}
                      >
                        {test.status === "completed"
                          ? "Completed"
                          : test.status === "ongoing"
                          ? "Active"
                          : "Waiting"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredTests.length === 0 && (
            <Card className="text-center py-12 sm:py-16 border-2 border-dashed border-border shadow-lg bg-card">
              <CardContent className="space-y-6 sm:space-y-8 px-4">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full opacity-80 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-foreground text-2xl sm:text-3xl font-bold">
                    No tests found
                  </p>
                  <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    {searchTerm
                      ? "Try adjusting your search terms or create a new test to get started"
                      : "Get started by creating your first test to engage your students and track their progress"}
                  </p>
                </div>
                {!searchTerm && (
                  <Link href="/admin/tests/new/edit">
                    <Button className="mt-8 font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 hover:scale-105">
                      Create Your First Test
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
