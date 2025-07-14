"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <Card className="text-center py-12 sm:py-16 border-2 border-dashed border-border shadow-lg bg-card">
      <CardContent className="space-y-6 sm:space-y-8 px-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto shadow-inner">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full opacity-80 animate-pulse" />
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
  );
}
