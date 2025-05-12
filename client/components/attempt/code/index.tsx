import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditorPanel from "./CodeEditorPanel";
import DescriptionPanel from "./DescriptionPanel";
import TestCasePanel from "./TestCasePanel";

export function CodeScreen() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-screen h-full rounded-lg border"
    >
      <ResizablePanel defaultSize={25} minSize={4}>
        <div className="flex h-full w-full">
          <DescriptionPanel />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={6}>
        <ResizablePanelGroup direction="vertical" className="h-full w-full">
          <ResizablePanel defaultSize={55} minSize={6}>
            <div className="flex h-full w-full ">
              <CodeEditorPanel />
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
