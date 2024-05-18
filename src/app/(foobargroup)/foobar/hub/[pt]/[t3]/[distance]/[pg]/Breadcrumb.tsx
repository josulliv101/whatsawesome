"use client";

import { useResultsLabelContext } from "@/components/ResultsLabel";
import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

export default function Breadcrumb({ children }: PropsWithChildren) {
  const [_, setIsStuck] = useStickyBreadcrumbContext();

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    initialInView: true,
    // trackVisibility: true,
    onChange: (inView) => setIsStuck(!inView),
  });

  return (
    <div className="sticky top-[64px] z-50 w-full flex items-center justify-between px-8 py-2 bg-gray-100 border-b border-r border-r-gray-200 border-b-gray-300 text-muted-foreground min-h-[54px]">
      <div
        ref={ref}
        className="absolute top-[-65.5px] w-[4px] h-[1px] z-[99999] bg-red-500"
      />
      {children}
    </div>
  );
}
