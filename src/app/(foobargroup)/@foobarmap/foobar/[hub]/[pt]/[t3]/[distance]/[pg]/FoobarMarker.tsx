"use client";

import Image from "next/image";
import {
  Marker,
  AdvancedMarker,
  useAdvancedMarkerRef,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
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
import { useEffect } from "react";
import { useMapMarkerContext } from "@/components/MapMarkerContext";

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
  const map = useMap();
  const coreLib = useMapsLibrary("core");

  const { mapState, setMapState } = useMapContext();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [_, setResultsLabel] = useResultsLabelContext();
  const [markerStatusMap, setMarkerStatusMap] = useMapMarkerContext();
  // console.log("markerStatusMap", markerStatusMap);
  const [isBreadcrumbStuck] = useStickyBreadcrumbContext();
  const [isUserScrolled, _1, helpText, setHelpText] = useUserScrolledContext();

  const requestToPan = !!markerStatusMap[id]?.pan;
  const isWithinBounds =
    !isBreadcrumbStuck &&
    !!marker?.position &&
    map?.getBounds()?.contains(marker?.position);

  const handleMouseOver = () => {
    setMapState(id);
    if (isUserScrolled) {
      setHelpText(!isWithinBounds ? "oh oh again" : warningMapScroll);
    }
    // setResultsLabel(title);
    setResultsLabel(<LogoSwatch name={title} photoUrl={parentPhotoUrl} />);
  };

  // useEffect(() => {
  //   if (!coreLib || !map || !marker) return;
  //   if (requestToPan) {
  //     setMapState("");
  //     marker.position && map.panTo(marker.position);
  //   }
  // }, [coreLib, map, requestToPan]);

  // useEffect(() => {
  //   if (mapState === id) {
  //     const isWithinBounds =
  //       !!marker?.position && map?.getBounds()?.contains(marker?.position);
  //     console.log("mapState change", isWithinBounds, marker?.position);
  //     if (isWithinBounds) {
  //       handleMouseOver();
  //     }
  //   }
  // }, [mapState]);

  return (
    <AdvancedMarker
      ref={markerRef}
      {...props}
      onClick={(ev, ...args) => console.log("click", ev, args, marker)}
    >
      <Tooltip open={isWithinBounds && mapState === id && !isUserScrolled}>
        <TooltipTrigger
          className={cn(
            "relative",
            "transition-all duration-300",
            (isUserScrolled && mapState !== id) || (mapState && mapState !== id)
              ? "grayscale opacity-80"
              : "grayscale-0 opacity-100",
            mapState && mapState === id ? "scale-125" : "scale-100"
          )}
          onMouseOver={handleMouseOver}
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
