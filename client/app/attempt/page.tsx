"use client";
import React, { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CodeScreen } from "@/components/attempt/CodeScreen";

export default function TestPage() {
  const [activeTab, setActiveTab] = useState("tab-1");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (distance: number) => {
    scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <div className="w-screen h-screen flex">
      <Tabs
        defaultValue="tab-1"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col"
      >
        <div className="flex items-center p-2 pb-0">
          <ChevronLeft
            className="bg-muted h-full rounded-l-lg cursor-pointer"
            onClick={() => scroll(-150)}
          />
          <div ref={scrollRef} className="flex-1 overflow-x-auto no-scrollbar">
            <TabsList className="flex w-max rounded-none">
              <div className="px-4 flex items-center select-none text-accent-foreground">
                MCQ
              </div>
              {Array.from({ length: 20 }, (_, i) => (
                <TabsTrigger
                  key={i + 1}
                  value={`tab-${i + 1}`}
                  className="p-4 w-auto"
                >
                  {i + 1}
                </TabsTrigger>
              ))}
              <div className="px-4 flex items-center select-none text-accent-foreground">
                Code
              </div>
              {Array.from({ length: 20 }, (_, i) => (
                <TabsTrigger
                  key={i + 21}
                  value={`tab-${i + 21}`}
                  className="p-4 w-auto"
                >
                  {i + 21}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <ChevronRight
            className="bg-muted h-full rounded-r-lg cursor-pointer"
            onClick={() => scroll(150)}
          />
          <div className="text-sm font-medium ml-2 px-4 whitespace-nowrap bg-muted h-full rounded-lg flex items-center justify-center select-none">
            10 / 50
          </div>
        </div>
        <div className="flex-1 w-full">
          {Array.from({ length: 50 }, (_, i) => (
            <TabsContent
              key={i}
              value={`tab-${i + 1}`}
              className="h-full w-full"
            >
              <CodeScreen />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
