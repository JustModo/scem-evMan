// import React from "react";

// // Admin: List of all contests
// // Display all created contests with options to edit or view results.
// export default function AdminTestsPage() {

//   return <div>AdminTestsPage Screen</div>;
// }
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
import { getAllTests } from "@/components/tests";

export default function AdminTestsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const tests = getAllTests();

  const filteredTests = tests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-screen bg-background text-foreground">
      <div className="max-w-none w-full p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Tests
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl">
                Create and manage coding tests for your students
              </p>
            </div>
            <Link href="/admin/tests/new/edit">
              <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl rounded-xl">
                + Create New Test
              </Button>
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2 sm:mb-3">
                  {tests.length}
                </div>
                <p className="text-muted-foreground font-semibold text-base sm:text-lg">
                  Total Tests
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2 sm:mb-3">
                  {tests.filter((t) => t.status === "ongoing").length}
                </div>
                <p className="text-muted-foreground font-semibold text-base sm:text-lg">
                  Active Tests
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8">
                <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2 sm:mb-3">
                  {tests.reduce((sum, t) => sum + t.participants, 0)}
                </div>
                <p className="text-muted-foreground font-semibold text-base sm:text-lg">
                  Total Participants
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="max-w-full sm:max-w-lg">
            <Input
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-green-500 focus:border-green-400 transition-all duration-200 shadow-md text-base sm:text-lg py-3 sm:py-4 px-4 sm:px-6 rounded-xl"
            />
          </div>

          {/* Tests Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {filteredTests.map((test) => (
              <Card
                key={test.id}
                className="hover:shadow-xl transition-all duration-300 hover:border-green-400 hover:scale-[1.02] group shadow-md bg-green-200 border-green-300"
              >
                <CardHeader className="pb-3 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl text-slate-800 group-hover:text-slate-900 transition-colors duration-200 font-semibold truncate">
                        {test.title}
                      </CardTitle>
                      <CardDescription className="text-slate-700 mt-1 text-sm leading-relaxed line-clamp-2">
                        {test.description}
                      </CardDescription>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border flex-shrink-0 ${
                        test.status === "completed"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : test.status === "ongoing"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : "bg-amber-100 text-amber-800 border-amber-300"
                      }`}
                    >
                      {test.status === "completed"
                        ? "Completed"
                        : test.status === "ongoing"
                        ? "Active"
                        : "Waiting"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 p-4 sm:p-6">
                  {/* Date & Time */}
                  <div
                    className="flex items-center gap-2 text-slate-600 text-sm mb-4 p-3 bg-slate-100 rounded-lg"
                    title="Start Date & Time"
                  >
                    <Clock className="h-4 w-4 text-slate-700 flex-shrink-0" />
                    <span className="font-medium">Started:</span>
                    <span className="truncate">{test.createdAt}</span>
                  </div>

                  {/* Progress Stats */}
                  {test.status === "waiting" ? (
                    <div className="flex items-center justify-center p-4 bg-amber-50 rounded-lg border border-amber-200 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-amber-800">
                            {test.participants}
                          </div>
                          <div className="text-xs text-amber-600">
                            Registered
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : test.status === "completed" ? (
                    <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-800">
                            {test.participantsCompleted}
                          </div>
                          <div className="text-xs text-green-600">
                            Completed
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                      <div
                        className="flex items-center gap-2 p-2 bg-slate-150 rounded-lg border border-slate-300"
                        title="Not started yet"
                      >
                        <div className="w-3 h-3 bg-gray-500 rounded-full flex-shrink-0"></div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-slate-800">
                            {test.participants -
                              test.participantsInProgress -
                              test.participantsCompleted}
                          </span>
                          <span className="text-xs text-slate-600 truncate">
                            Not Started
                          </span>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-2 p-2 bg-slate-150 rounded-lg border border-slate-300"
                        title="Tests currently being taken"
                      >
                        <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-slate-800">
                            {test.participantsInProgress}
                          </span>
                          <span className="text-xs text-slate-600 truncate">
                            In Progress
                          </span>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-2 p-2 bg-slate-150 rounded-lg border border-slate-300"
                        title="Completed submissions"
                      >
                        <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-slate-800">
                            {test.participantsCompleted}
                          </span>
                          <span className="text-xs text-slate-600 truncate">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="space-y-3 mb-6 p-4 bg-slate-100 rounded-lg border border-slate-300">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">
                        Duration
                      </span>
                      <span className="text-slate-800 font-semibold">
                        {test.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">
                        Questions
                      </span>
                      <span className="text-slate-800 font-semibold">
                        {test.totalQuestions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-medium">
                        Total Participants
                      </span>
                      <span className="text-slate-800 font-semibold">
                        {test.participants}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href={`/admin/tests/${test.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full text-sm border-slate-400 text-slate-700 hover:bg-slate-300 hover:border-slate-500"
                      >
                        View
                      </Button>
                    </Link>
                    {test.status !== "completed" ? (
                      <Link
                        href={`/admin/tests/${test.id}/edit`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full text-sm border-slate-400 text-slate-700 hover:bg-slate-300 hover:border-slate-500"
                        >
                          Edit
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        className="flex-1 w-full text-sm bg-gray-400 text-gray-600 cursor-not-allowed"
                      >
                        Completed
                      </Button>
                    )}
                    <div className="flex-1">
                      <Button
                        className={`w-full text-sm shadow-md hover:shadow-lg transition-all duration-200 ${
                          test.status === "completed"
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : test.status === "ongoing"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-amber-600 hover:bg-amber-700 text-white"
                        }`}
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
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full opacity-80 animate-pulse" />
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
                    <Button className="mt-8 font-semibold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 hover:scale-105">
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
