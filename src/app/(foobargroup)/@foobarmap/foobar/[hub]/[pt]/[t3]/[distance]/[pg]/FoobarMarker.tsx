"use client";

import Image from "next/image";
import { Marker, AdvancedMarker } from "@vis.gl/react-google-maps";
import { config } from "@/lib/config";
import { CheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
  TooltipPortal,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { useMapContext } from "@/components/MapContext";
import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import MapExcellence from "./MapExcellence";
import { useUserScrolledContext } from "@/components/UserScrolled";
import { cn } from "@/lib/utils";
import { useResultsLabelContext } from "@/components/ResultsLabel";
import { warningMapScroll } from "@/app/(foobargroup)/foobar/[hub]/[pt]/[t3]/[distance]/[pg]/SearchResultLogos";
import LogoSwatch from "@/components/LogoSwatch";

const thumbnailSize = 140;

export default function FoobarMarker({
  id,
  children,
  excellence,
  photoUrl,
  parentPhotoUrl,
  size = 24,
  title,
  ...props
}: any) {
  const { mapState, setMapState } = useMapContext();
  const [_, setResultsLabel] = useResultsLabelContext();
  // console.log("foobfoob", foob);
  const [isBreadcrumbStuck] = useStickyBreadcrumbContext();
  const [isUserScrolled, _1, helpText, setHelpText] = useUserScrolledContext();
  return (
    <AdvancedMarker {...props} onClick={() => console.log("click")}>
      <Tooltip open={mapState === id && !isUserScrolled}>
        <TooltipTrigger
          className={cn(
            "relative",
            "transition-all duration-300",
            (isUserScrolled && mapState !== id) || (mapState && mapState !== id)
              ? "grayscale opacity-80"
              : "grayscale-0 opacity-100",
            mapState && mapState === id ? "scale-125" : "scale-100"
          )}
          onMouseOver={() => {
            setMapState(id);
            if (isUserScrolled) {
              setHelpText(warningMapScroll);
            }
            // setResultsLabel(title);
            setResultsLabel(
              <LogoSwatch name={title} photoUrl={parentPhotoUrl} />
            );
          }}
          onMouseOut={() => {
            setMapState("");
            setHelpText("");
            setResultsLabel("");
          }}
          // asChild
          // className={
          //   mapState && id === mapState
          //     ? "opacity-100"
          //     : !mapState
          //       ? "opacity-100"
          //       : "opacity-0"
          // }
        >
          <div className="relative">
            {children}{" "}
            {mapState === id ? (
              <CheckIcon
                className={cn(
                  "absolute z-[9999] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ",
                  "animate-fadeInQuick",
                  size === 24 ? "w-3 h-3" : "w-4 h-4"
                )}
              />
            ) : null}
          </div>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            arrowPadding={100}
            side="left"
            sideOffset={20}
            className="z-50 bg-black text-white py-2 relative flex overflow-visible   items-start justify-start gap-4 min-h-24 min-w-[440px] max-w-[440px]"
          >
            <MapExcellence
              photoUrl={photoUrl}
              parentPhotoUrl={parentPhotoUrl}
              title={title}
              excellence={excellence}
            />
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </AdvancedMarker>
  );
}
