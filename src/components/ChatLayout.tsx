"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface ChatLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function ChatLayout({ leftPanel, rightPanel }: ChatLayoutProps) {
  return (
    <div className="flex w-screen h-[93vh] xl:h-[95vh] p-5">
      <div className="w-full h-full">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel */}
          <ResizablePanel className="pr-5" defaultSize={50}>
            {leftPanel}
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel */}
          <ResizablePanel className="pl-5" defaultSize={50}>
            {rightPanel}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
