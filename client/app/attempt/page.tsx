"use client";
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import TestHeader from "@/components/attempt/TestHeader";
import TestContent from "@/components/attempt/TestContent";

export default function TestPage() {
  const [activeTab, setActiveTab] = useState("tab-1");

  return (
    <div className="w-screen h-screen flex">
      <Tabs
        defaultValue="tab-1"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col"
      >
        <TestHeader />
        <TestContent/>
      </Tabs>
    </div>
  );
}
