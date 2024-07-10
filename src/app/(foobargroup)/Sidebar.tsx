"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatLayout } from "@/components/chat/chat-layout";
import { PropsWithChildren } from "react";
import useSidebarStore from "./useSidebarStore";

export default function Sidebar({ children }: PropsWithChildren) {
  const { activeId, updateActiveId } = useSidebarStore();
  return (
    <Sheet
      open={!!activeId}
      onOpenChange={(open) => updateActiveId(open ? "foobar" : "")}
    >
      <SheetContent className=" w-full sm:max-w-full lg:max-w-2xl overflow-y-auto">
        {/* <SheetHeader>
          <SheetTitle>activeId: {activeId}</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        {activeId === "explore" && <div>{children}</div>}
        {activeId === "ai-assistant" && (
          <ChatLayout defaultLayout={undefined} navCollapsedSize={8} />
        )}
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
