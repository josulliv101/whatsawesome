"use client";

import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  const [isStuck] = useStickyBreadcrumbContext();
  return (
    <div
      className={cn(
        "transform-gpu",
        isStuck ? "relative top-[320px]" : "sticky top-[64px]"
      )}
    >
      {children}
    </div>
  );
}
