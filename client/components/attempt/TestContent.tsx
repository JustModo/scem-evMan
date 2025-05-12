import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { CodeScreen } from "./code";

export default function TestContent() {
  return (
    <div className="flex-1 w-full">
      {Array.from({ length: 50 }, (_, i) => (
        <TabsContent key={i} value={`tab-${i + 1}`} className="h-full w-full">
          <CodeScreen />
        </TabsContent>
      ))}
    </div>
  );
}
