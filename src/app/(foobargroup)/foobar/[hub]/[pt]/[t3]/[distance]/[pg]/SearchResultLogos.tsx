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
// import MapContext from "@/components/MapContext";
// import { use } from "react";

export default function SearchResultLogos({ hits, pg = 0, resultsText }: any) {
  const [activeTabValue, setTabValue] = useState("row");
  const paramPg =
    typeof pg === "string" && !!pg && pg !== "index" ? Number(pg) : 0;
  const { mapState, setMapState } = useMapContext();
  const isRow = activeTabValue === "row";
  // map?.addListener("mousemove", (...args) => console.log("m", ...args));
  return (
    <>
      <div className="flex items-end justify-between mx-8 mt-6 mb-0">
        <div className="text-muted-foreground text-lg ">{resultsText}</div>
        <SearchLogoTabs value={activeTabValue} onChange={setTabValue} />
      </div>
      <div
        className={cn(
          "grid",
          isRow ? "grid-cols-10" : "grid-cols-5",
          isRow ? "md:gap-1 pt-3" : "md:gap-2 md:py-4",
          "mx-8 gap-1 md:gap-y-4 mt-0"
          // "px-4 rounded-md bg-muted"
        )}
      >
        {hits.map((hit: any, index: number) => {
          return (
            <div
              key={hit.objectID + index}
              className={`animate-fadeIn relative col-span-1 transition-all duration-500 text-white text-balance rounded-md ${false && mapState && mapState !== hit.objectID ? "opacity-10 grayscale" : "opacity-90 grayscale-0"} text-center flex flex-col items-center justify-start`}
              onMouseOver={() => setMapState(hit.objectID)}
              onMouseOut={() => setMapState("")}
            >
              {hit.parent?.parentPhotoUrl && (
                <Image
                  key={hit.parentId}
                  alt={hit.parent?.name}
                  src={hit.parent?.parentPhotoUrl}
                  width="240"
                  height="240"
                  className={cn(
                    "bg-white rounded-t-md border block h-full object-cover",
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
            </div>
          );
        })}
      </div>
    </>
  );
}
