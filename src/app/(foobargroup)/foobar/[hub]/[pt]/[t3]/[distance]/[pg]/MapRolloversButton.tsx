"use client";

import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import { useUserScrolledContext } from "@/components/UserScrolled";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";

export default function MapRolloversButton() {
  const [isScrolled] = useUserScrolledContext();
  const [isStuck] = useStickyBreadcrumbContext();
  return (
    <>
      <div
        className={cn(
          "text-muted-foreground text-sm flex items-center gap-2",
          "transition duration-500",
          !isStuck ? "opacity-0" : "opacity-100"
        )}
      >
        {!isScrolled ? (
          <CheckIcon className="animate-fadeInQuick w-4 h-4 stroke-2 text-green-500" />
        ) : (
          <div className="animate-fadeInQuick">
            <XIcon className="w-4 h-4 stroke-2 text-red-500 opacity-60" />
          </div>
        )}
        Logo/Map Icon Rollovers Enabled{" "}
      </div>
      <div className="w-[40px]">
        <Separator
          className={cn(
            "animate-fadeIn h-5 bg-gray-400 ml-4",
            "transition duration-500",
            !isStuck ? "opacity-0" : "opacity-100"
          )}
          orientation="vertical"
        />
      </div>
    </>
  );
}
