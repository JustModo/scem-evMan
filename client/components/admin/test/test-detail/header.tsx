import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Edit,
  BarChart3,
  CheckCircle,
  XCircle,
  Play,
} from "lucide-react";
import { Test } from "@/constants/test-data";

interface TestDetailHeaderProps {
  test: Test;
}

export function TestDetailHeader({ test }: TestDetailHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-primary text-primary-foreground";
      case "ongoing":
        return "bg-primary/70 text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "ongoing":
        return <Play className="h-5 w-5 text-primary/70" />;
      default:
        return <XCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "ongoing":
        return "Active";
      default:
        return "Waiting";
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/admin/tests">
            <Button
              variant="outline"
              size="icon"
              className="border-border text-foreground hover:bg-accent flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div className="space-y-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">
              {test.title}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base truncate">
              {test.description}
            </p>
          </div>
        </div>
      </div>

      {/* Status and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-md">
        <div className="flex items-center gap-4">
          {getStatusIcon(test.status)}
          <div className="min-w-0 flex-1">
            <span
              className={`px-4 py-2 text-sm font-medium rounded-full ${getStatusColor(
                test.status
              )} whitespace-nowrap`}
            >
              {getStatusText(test.status)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {test.status !== "completed" ? (
            <Link href={`/admin/tests/${test.id}/edit`}>
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
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
    </>
  );
}
