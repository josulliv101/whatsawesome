"use client";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMapContext } from "@/components/MapContext";
import { use, useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SearchLogoTabs from "./SearchLogoTabs";
import {
  defaultHelpText,
  useUserScrolledContext,
} from "@/components/UserScrolled";
import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import { CheckIcon, CircleAlert, TriangleAlertIcon } from "lucide-react";
import { useResultsLabelContext } from "@/components/ResultsLabel";
import { Separator } from "@/components/ui/separator";
import LogoSwatch from "@/components/LogoSwatch";
import { MapMarkerContext } from "@/components/MapMarkerContext";
// import MapContext from "@/components/MapContext";
// import { use } from "react";

export const warningMapScroll =
  "Scroll the map into full view to enable map tooltip details.";

export const warningMapOutOfBounds =
  "Location not in map bounds. Click logo to pan it into view.";

export default function SearchResultLogos({
  hits,
  pg = 0,
  resultsText = "",
}: any) {
  const [activeTabValue, setTabValue] = useState("row");
  const [markerStatusMap, setMarkerStatusMap] = use(MapMarkerContext);
  const [resultsTextFromState, setResultsTextFromState] =
    useResultsLabelContext();
  const [isStuck, setIsStuck] = useStickyBreadcrumbContext();
  const [isScrolled, _1, helpText, setHelpText] = useUserScrolledContext();
  const paramPg =
    typeof pg === "string" && !!pg && pg !== "index" ? Number(pg) : 0;
  const { mapState, setMapState } = useMapContext();
  const isRow = activeTabValue === "row";

  const handleLogoMouseOver = (
    objectID: string,
    name: string = "",
    isWithinBounds: boolean
  ) => {
    console.log(markerStatusMap[objectID], name, objectID, isWithinBounds);
    const parentLogoHit = hits.find((hit: any) => hit.parent?.name === name);
    const warningText = !isWithinBounds
      ? warningMapOutOfBounds
      : warningMapScroll;
    console.log("warningText", warningText);

    if (!isScrolled && !isStuck && isWithinBounds) {
      setMapState(objectID);
    } else if (isScrolled && !isStuck && isWithinBounds) {
      setMapState(objectID);
      setHelpText(warningText);
    } else if (!isWithinBounds) {
      setHelpText(warningMapOutOfBounds);
    } else if (isScrolled && isStuck) {
      setHelpText(warningText);
    }

    setResultsTextFromState(
      <LogoSwatch
        name={name}
        photoUrl={parentLogoHit?.parent?.parentPhotoUrl}
      />
    );

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

  const handleLogoMouseOut = (
    objectID: string,
    helpText: string = "",
    isWithinBounds: boolean
  ) => {
    if (!isScrolled && !isStuck && isWithinBounds) {
      setMapState("");
      setHelpText("");
    } else {
      setHelpText("");
      setMapState("");
    }
    //   setMapState("");
    //   setHelpText("");
    // } else if (isScrolled && isStuck) {
    //   setHelpText("");
    // }
    setResultsTextFromState("");
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
      <div className="flex flex-row-reverse items-center justify-between mx-8 mt-4 mb-0">
        <div className="text-muted-foreground text-base relative top-0">
          {helpText ? (
            <>
              <div className="flex items-center gap-2 animate-fadeInQuick text-muted-foreground text-base">
                <TriangleAlertIcon className="w-5 h-5 text-orange-500/80" />{" "}
                {helpText}
              </div>
            </>
          ) : (
            resultsText
          )}
        </div>
        <div className="flex items-center gap-8">
          <SearchLogoTabs value={activeTabValue} onChange={setTabValue} />
        </div>
      </div>
      <div
        className={cn(
          "grid",
          isRow ? "grid-cols-10" : "grid-cols-6",
          isRow ? "md:gap-2 pt-3" : "md:gap-2 md:py-4",
          "mx-8 gap-1 md:gap-y-4 mt-2"
          // "px-4 rounded-md bg-muted"
        )}
      >
        {hits.map((hit: any, index: number) => {
          const isWithinMapBounds =
            markerStatusMap[hit.objectID]?.isWithinBounds;
          return (
            <div
              key={hit.objectID + index}
              className={cn(
                ` z-0 animate-fadeIn relative col-span-1 transition-all duration-500 text-white text-balance rounded-md ${false && mapState && mapState !== hit.objectID ? " grayscale" : "  grayscale-0"} text-center flex flex-col items-center justify-start`,
                "transition-all duration-300",
                isWithinMapBounds ? "opacity-100" : "opacity-50",
                mapState && hit.objectID === mapState
                  ? "scale-105"
                  : "scale-100"
              )}
              onClick={() => {
                console.log("clickck");
                setMarkerStatusMap({
                  ...markerStatusMap,
                  [hit.objectID]: {
                    ...markerStatusMap[hit.objectID],
                    pan: hit.objectID,
                  },
                });
              }}
              onMouseOver={() =>
                handleLogoMouseOver(
                  hit.objectID,
                  hit.parent?.name,
                  isWithinMapBounds
                )
              }
              onMouseOut={() =>
                handleLogoMouseOut(
                  hit.objectID,
                  hit.parent?.name,
                  isWithinMapBounds
                )
              }
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
                  {" "}
                  {isWithinMapBounds ? "yes map" : "no in map"}
                  {hit.parent?.name}
                </div>
              )}
              {hit.objectID === mapState && isWithinMapBounds && (
                <div className="animate-fadeInQuick absolute -top-1 -right-1 z-[9999] w-5 h-5 border-2 border-white bg-blue-500 flex items-center justify-center rounded-full">
                  <CheckIcon className={cn(" text-white", "w-3 h-3")} />
                </div>
              )}
              {!isWithinMapBounds && (
                <div className="animate-fadeInQuick absolute -top-1 -right-1 z-[9999] w-5 h-5 border-0 border-white  flex items-center justify-center rounded-full">
                  <CircleAlert
                    className={cn(
                      " text-white",
                      "w-5 h-5 fill-orange-500 rounded-full"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
