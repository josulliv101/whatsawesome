"use client";

import Image from "next/image";
import { CommandMenu } from "@/components/CommandMenu";
import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { config } from "@/lib/config";

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

export function SearchPanel() {
  return (
    <div className=" bg-blue-100/50 px-8 text-muted-foreground_ w-full pt-6 pb-4">
      <div className="flex items-center justify-between w-full mb-4 font-semibold text-md _capitalize text-muted-foreground">
        Discover excellence in the world around you.
        <span className="font-normal text-sm"></span>
      </div>
      <CommandMenu small />
      <p className="w-full opacity-0 text-sm text-muted-foreground text-right px-2 pt-2 flex items-center justify-end gap-0">
        Leave a{" "}
        <Image
          // id={marker.id}
          alt="vote"
          src={config.logoPath}
          width={15}
          height={15}
          className={`inline-flex ml-2 mr-1 grayscale opacity-80`}
        />{" "}
        on items you endorse.
        {/* more{" "}
        <img
          className="w-4 h-4 opacity-70 grayscale relative -top-0.5"
          src={config.logoPath}
          width="24"
          height="24"
        />{" "}
        <EqualIcon className="h-5 w-5" /> more excellence */}
      </p>
    </div>
  );
}
