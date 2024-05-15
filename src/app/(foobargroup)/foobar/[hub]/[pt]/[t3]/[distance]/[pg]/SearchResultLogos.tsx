"use client";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMapContext } from "@/components/MapContext";
import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SearchLogoTabs from "./SearchLogoTabs";
import {
  defaultHelpText,
  useUserScrolledContext,
} from "@/components/UserScrolled";
import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import { CheckIcon } from "lucide-react";
// import MapContext from "@/components/MapContext";
// import { use } from "react";

export default function SearchResultLogos({ hits, pg = 0, resultsText }: any) {
  const [activeTabValue, setTabValue] = useState("row");
  const [isStuck, setIsStuck] = useStickyBreadcrumbContext();
  const [isScrolled, _1, _2, setHelpText] = useUserScrolledContext();
  const paramPg =
    typeof pg === "string" && !!pg && pg !== "index" ? Number(pg) : 0;
  const { mapState, setMapState } = useMapContext();
  const isRow = activeTabValue === "row";

  const handleLogoMouseOver = (objectID: string, helpText: string = "bar") => {
    if (!isScrolled && !isStuck) {
      setMapState(objectID);
    } else if (isScrolled && !isStuck) {
      setMapState(objectID);
      setHelpText("Scroll the map into full view to see details");
    } else if (isScrolled && isStuck) {
      setHelpText("Scroll the map into full view to see details");
    }

    // if (!isScrolled) {
    //   setMapState(objectID);
    // } else if (isScrolled && !isStuck) {
    //   setHelpText("Scroll the map into full view to see details");
    //   // const helpText = isStuck;
    //   // setHelpText(helpText);
    // } else if (isStuck) {
    //   setHelpText("Scroll the map into full view to see details");
    // }
  };

  const handleLogoMouseOut = (objectID: string, helpText: string = "foo") => {
    if (!isScrolled && !isStuck) {
      setMapState("");
    } else if (isScrolled && !isStuck) {
      setMapState("");
      setHelpText("");
    } else if (isScrolled && isStuck) {
      setHelpText("");
    }
    // setMapState("");
    // if (!isScrolled) {
    //   setHelpText(defaultHelpText);
    // } else if (isStuck) {
    //   setHelpText("");
    // } else {
    //   setHelpText(defaultHelpText);
    // }
  };
  // map?.addListener("mousemove", (...args) => console.log("m", ...args));
  return (
    <>
      <div className="flex items-center justify-between mx-8 mt-4 mb-0">
        <div className="text-muted-foreground text-base relative top-0">
          {resultsText}
        </div>
        <SearchLogoTabs value={activeTabValue} onChange={setTabValue} />
      </div>
      <div
        className={cn(
          "grid",
          isRow ? "grid-cols-10" : "grid-cols-6",
          isRow ? "md:gap-1 pt-3" : "md:gap-2 md:py-4",
          "mx-8 gap-1 md:gap-y-4 mt-0"
          // "px-4 rounded-md bg-muted"
        )}
      >
        {hits.map((hit: any, index: number) => {
          return (
            <div
              key={hit.objectID + index}
              className={cn(
                ` z-0 animate-fadeIn relative col-span-1 transition-all duration-500 text-white text-balance rounded-md ${false && mapState && mapState !== hit.objectID ? "opacity-10 grayscale" : "opacity-90 grayscale-0"} text-center flex flex-col items-center justify-start`,
                "transition-all duration-300",

                mapState && hit.objectID === mapState
                  ? "scale-105"
                  : "scale-100"
              )}
              onMouseOver={() =>
                handleLogoMouseOver(hit.objectID, hit.parent?.name)
              }
              onMouseOut={() => handleLogoMouseOut(hit.objectID)}
            >
              {hit.parent?.parentPhotoUrl && (
                <Image
                  key={hit.parentId}
                  alt={hit.parent?.name}
                  src={hit.parent?.parentPhotoUrl}
                  width="240"
                  height="240"
                  className={cn(
                    "bg-white rounded-t-md border block h-full object-cover relative z-0",
                    isRow ? "rounded-b-md" : ""
                  )}
                />
              )}
              {!hit.parent?.parentPhotoUrl && (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    "h-full w-full",
                    "bg-black text-white",
                    "px-4 rounded-t-md",
                    isRow ? "rounded-b-md" : ""
                  )}
                >
                  {!hit.parent?.parentPhotoUrl && hit.parent?.name}
                </div>
              )}
              {!isRow && (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    "w-full min-h-[48px]",
                    "bg-black",
                    "px-2 py-1 border-t border-t-white rounded-b-md",
                    "text-balance text-sm"
                  )}
                >
                  {hit.parent?.name}
                </div>
              )}
              {hit.objectID === mapState && (
                <div className="animate-fadeInQuick absolute -top-1 -right-1 z-[9999] w-5 h-5 border-0 border-white bg-blue-500 flex items-center justify-center rounded-full">
                  <CheckIcon className={cn(" text-white", "w-3 h-3")} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
