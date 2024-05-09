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
  return (
    <AdvancedMarker {...props} onClick={() => console.log("click")}>
      <Tooltip open={mapState === id}>
        <TooltipTrigger
          onMouseOver={() => setMapState(id)}
          onMouseOut={() => setMapState("")}
          asChild
          className={
            mapState && id === mapState
              ? "opacity-100"
              : !mapState
                ? "opacity-100"
                : "opacity-30"
          }
        >
          {children}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side="top"
            className="z-50 relative flex   items-start justify-start gap-4 min-h-24 min-w-[440px] max-w-[440px]"
          >
            {photoUrl && (
              <Image
                className={`w-[140px] h-[140px] object-cover`}
                src={photoUrl}
                width={thumbnailSize}
                height={thumbnailSize}
                alt={title}
              />
            )}
            <div>
              <h2 className="font-semibold text-lg mb-2">{title}</h2>
              <p>{excellence}</p>
            </div>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </AdvancedMarker>
  );
}
