"use client";

import Image from "next/image";
import { Marker, AdvancedMarker } from "@vis.gl/react-google-maps";
import { config } from "@/lib/config";
import { CheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { useMapContext } from "@/components/MapContext";
import { useStickyBreadcrumbContext } from "@/components/StickyBreadcrumb";
import MapExcellence from "./MapExcellence";
import { useUserScrolledContext } from "@/components/UserScrolled";

const thumbnailSize = 140;

export default function FoobarMarker({
  id,
  children,
  excellence,
  photoUrl,
  size = 24,
  title,
  ...props
}: any) {
  const { mapState, setMapState } = useMapContext();
  const [isUserScrolled] = useUserScrolledContext();
  return (
    <AdvancedMarker {...props} onClick={() => console.log("click")}>
      <Tooltip open={mapState === id && !isUserScrolled}>
        <TooltipTrigger
          className={isUserScrolled ? "grayscale" : "grayscale-0"}
          onMouseOver={() => setMapState(id)}
          onMouseOut={() => setMapState("")}
          asChild
          // className={
          //   mapState && id === mapState
          //     ? "opacity-100"
          //     : !mapState
          //       ? "opacity-100"
          //       : "opacity-0"
          // }
        >
          {children}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side="top"
            className="z-50 relative flex   items-start justify-start gap-4 min-h-24 min-w-[440px] max-w-[440px]"
          >
            <MapExcellence
              photoUrl={photoUrl}
              title={title}
              excellence={excellence}
            />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </AdvancedMarker>
  );
}
