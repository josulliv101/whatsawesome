"use client";

import { useMapContext } from "@/components/MapContext";
import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import { useUserScrolledContext } from "@/components/UserScrolled";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  CheckCircle2,
  CheckIcon,
  CircleHelpIcon,
  ThumbsDownIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";

export default function MapRolloversButton() {
  const { mapState, setMapState } = useMapContext();
  const [isScrolled, _, helpText, setHelpText] = useUserScrolledContext();
  const [isStuck] = useStickyBreadcrumbContext();
  return (
    <>
      <div
        className={cn(
          "text-muted-foreground text-sm flex items-center gap-2",
          "transition duration-500"
          // isStuck && !helpText ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="hidden absolute bottom-0">
          {mapState ? mapState : "map no"} / {isStuck ? "stuck" : "no stuck"} /{" "}
          {isScrolled ? "scrolled" : "no scrolled"}
        </div>
        {helpText}
        {/* <CircleHelpIcon className="w-4 h-4 text-blue-500" /> */}
        {
          false && !isScrolled ? (
            <CheckCircle2 className="animate-fadeInQuick w-4 h-4 stroke-2 text-green-500" />
          ) : null
          // <div className="animate-fadeInQuick">
          //   <ThumbsDownIcon className="w-4 h-4 stroke-2 text-gray-500 opacity-50" />
          // </div>
        }{" "}
      </div>
      <div className="w-[40px] hidden">
        <Separator
          className={cn(
            "animate-fadeIn h-5 bg-gray-400 ml-6",
            "transition duration-500"
            // !isStuck ? "opacity-0" : "opacity-100"
          )}
          orientation="vertical"
        />
      </div>
    </>
  );
}
