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
    <div className="bg-primary/100 sticky top-[0px] z-50 border-b">
      <div className="container mx-auto max-w-[1080px]">
        <div className="w-full bg-primary flex items-center justify-between px-4 py-0 text-white min-h-[4px]">
          <div
            ref={ref}
            className="absolute top-[-65.5px] w-[4px] h-[1px] z-[99999]"
          />
          {children}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
