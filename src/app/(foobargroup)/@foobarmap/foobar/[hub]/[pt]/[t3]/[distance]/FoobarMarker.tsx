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

const thumbnailSize = 140;

export default function FoobarMarker({
  children,
  excellence,
  photoUrl,
  size = 24,
  title,
  ...props
}: any) {
  return (
    <AdvancedMarker {...props} onClick={() => console.log("click")}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
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
