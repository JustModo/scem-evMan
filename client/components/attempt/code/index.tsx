"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditorPanel from "./code-editor";
import DescriptionPanel from "./description";
import TestCasePanel from "./test-case";
import { CodingProblem } from "@/types/test";

export function CodeScreen({ problem }: { problem: CodingProblem }) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-screen h-full border"
    >
      <ResizablePanel defaultSize={30} minSize={4}>
        <div className="flex h-full w-full">
          <DescriptionPanel problem={problem} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70} minSize={20}>
        <ResizablePanelGroup direction="vertical" className="h-full w-full">
          <ResizablePanel defaultSize={55} minSize={6}>
            <div className="flex h-full w-full ">
              <CodeEditorPanel problem={problem} />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={45} minSize={6}>
            <div className="flex h-full w-full">
              <TestCasePanel />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
