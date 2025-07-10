// import { IdParams } from "@/types/params";
// import React from "react";

// // Admin: Contest Details
// // Show detailed information about a specific contest.
// export default async function AdminTestDetailPage(props: { params: Promise<IdParams> }) {
//   const params = await props.params;
//   const { id } = params;
//   return <div>AdminTestDetailPage Screen: {id}</div>;
// }
import { IdParams } from "@/types/params";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  FileText,
  Calendar,
  Play,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Edit,
  BarChart3,
} from "lucide-react";
import { getTestById } from "@/components/tests";

// Admin: Contest Details
// Show detailed information about a specific contest.
export default async function AdminTestDetailPage({
  params,
}: {
  params: Promise<IdParams>;
}) {
  const { id } = await params;
  const test = getTestById(id);

  if (!test) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600 text-white";
      case "ongoing":
        return "bg-blue-600 text-white";
      default:
        return "bg-amber-600 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "ongoing":
        return <Play className="h-5 w-5 text-blue-400" />;
      default:
        return <XCircle className="h-5 w-5 text-amber-400" />;
    }
  };

  // Use real participation data instead of calculated values
  const inProgress = test.participantsInProgress;
  const completed = test.participantsCompleted;
  const notStarted = test.participants - inProgress - completed;

  return (
    <div className="flex-1 min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="h-full w-full">
        <div className="max-w-none w-full p-4 sm:p-6 lg:p-8">
          <div className="space-y-6 sm:space-y-8">
            {/* Header with Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              <Link href="/admin/tests">
                <Button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-2 rounded-lg transition-colors flex-shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to Tests</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight break-words">
                  {test.title}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg mt-2 break-words">
                  {test.description}
                </p>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center gap-4">
                {getStatusIcon(test.status)}
                <div className="min-w-0 flex-1">
                  <span
                    className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(
                      test.status
                    )} whitespace-nowrap`}
                  >
                    {test.status === "completed"
                      ? "Completed"
                      : test.status === "ongoing"
                      ? "Active"
                      : "Waiting"}
                  </span>
                  <p className="text-muted-foreground text-sm mt-1">
                    Test Status
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {test.status !== "completed" ? (
                  <Link href={`/admin/tests/${test.id}/edit`}>
                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                      <Edit className="h-4 w-4" />
                      Edit Test
                    </Button>
                  </Link>
                ) : (
                  <Button
                    disabled
                    className="flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-lg cursor-not-allowed w-full sm:w-auto"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Test (Completed)
                  </Button>
                )}
                <Link href={`/admin/tests/${test.id}/result`}>
                  <Button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
                    <BarChart3 className="h-4 w-4" />
                    View Results
                  </Button>
                </Link>
              </div>
            </div>

            {/* Test Information Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              {/* Basic Information */}
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-400" />
                    Test Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">
                      Duration
                    </span>
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span className="font-semibold">{test.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">
                      Total Questions
                    </span>
                    <div className="flex items-center gap-2 text-foreground">
                      <FileText className="h-4 w-4 text-green-400" />
                      <span className="font-semibold">
                        {test.totalQuestions}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">
                      Created
                    </span>
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span className="font-semibold text-sm sm:text-base">
                        {test.createdAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">
                      Test ID
                    </span>
                    <span className="text-foreground font-semibold font-mono text-sm sm:text-base">
                      #{test.id}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Participation Statistics */}
              <Card className="bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Participation Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">
                      Total Participants
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-foreground">
                      {test.participants}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {test.status === "waiting" ? (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">
                          Registered
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                          <span className="text-foreground font-semibold">
                            {test.participants}
                          </span>
                        </div>
                      </div>
                    ) : test.status === "completed" ? (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground font-medium">
                          Completed
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-foreground font-semibold">
                            {completed}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground font-medium">
                            Not Started
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <span className="text-foreground font-semibold">
                              {notStarted}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground font-medium">
                            In Progress
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-foreground font-semibold">
                              {inProgress}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground font-medium">
                            Completed
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-foreground font-semibold">
                              {completed}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {test.status !== "waiting" && (
                    <div className="pt-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>
                          {test.status === "completed"
                            ? "Completion"
                            : "Progress"}
                        </span>
                        <span>
                          {Math.round((completed / test.participants) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            test.status === "completed"
                              ? "bg-green-500"
                              : "bg-gradient-to-r from-blue-500 to-green-500"
                          }`}
                          style={{
                            width: `${(completed / test.participants) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage this test and view detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {test.status !== "completed" ? (
                    <Link href={`/admin/tests/${test.id}/edit`}>
                      <Button className="w-full h-16 flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <Edit className="h-5 w-5" />
                        <span className="text-xs font-medium text-center">
                          Edit Test
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      disabled
                      className="w-full h-16 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground rounded-lg cursor-not-allowed"
                    >
                      <Edit className="h-5 w-5" />
                      <span className="text-xs font-medium text-center">
                        Test Completed
                      </span>
                    </Button>
                  )}

                  <Link href={`/admin/tests/${test.id}/result`}>
                    <Button className="w-full h-16 flex flex-col items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors">
                      <BarChart3 className="h-5 w-5" />
                      <span className="text-xs font-medium text-center">
                        View Results
                      </span>
                    </Button>
                  </Link>

                  <Link href={`/test/${test.id}`}>
                    <Button className="w-full h-16 flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      <Play className="h-5 w-5" />
                      <span className="text-xs font-medium text-center">
                        Take Test
                      </span>
                    </Button>
                  </Link>

                  <Link href="/admin/tests">
                    <Button className="w-full h-16 flex flex-col items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors">
                      <ArrowLeft className="h-5 w-5" />
                      <span className="text-xs font-medium text-center">
                        Back to Tests
                      </span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
