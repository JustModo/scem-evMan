import React, { useRef } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestHeader() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (distance: number) => {
    scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };
  return (
    <div className="flex items-center p-2 pb-0">
      <ChevronLeft
        className="bg-muted h-full rounded-l-lg cursor-pointer"
        onClick={() => scroll(-300)}
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
        onClick={() => scroll(300)}
      />
      <div className="text-sm font-medium ml-2 px-4 whitespace-nowrap bg-muted h-full rounded-lg flex items-center justify-center select-none">
        10 / 50
      </div>
    </div>
  );
}
