"use client";

import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { getLevel3TagsFromTags } from "@/lib/tags";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import { config } from "@/lib/config";
import { roundToInteger } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";

export default function Marker({
  children,
  id = "",
  photoUrl,
  profileName,
  rating,
  reason,
  tags,
  ...props
}: PropsWithChildren<{
  id: string;
  photoUrl?: string;
  rating?: number;
  profileName?: string;
  reason?: string;
  tags?: any;
}>) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  // console.log("marker", tags);
  // const [infowindowOpen, setInfowindowOpen] = useState(false);
  // const [markerRef, marker] = useAdvancedMarkerRef();

  function handleClick() {
    // setInfowindowOpen(true);
    const pt = searchParams.get("pt");
    const t3 = searchParams.get("t3");
    const searchRadius = searchParams.get("searchRadius");
    const paramActiveId = searchParams.get("activeId");
    const tokens = id.split("/");
    // console.log("*", tokens[1]);

    if (tokens[1] === paramActiveId) {
      router.push(
        `/explore/${params.hub}?${t3 ? "&t3=" + t3 : ""}${pt ? "&pt=" + pt : ""}${searchRadius ? "&searchRadius=" + searchRadius : ""}`
      );
    } else {
      router.push(
        `/explore/${params.hub}?activeId=${tokens[1]}${t3 ? "&t3=" + t3 : ""}${pt ? "&pt=" + pt : ""}${searchRadius ? "&searchRadius=" + searchRadius : ""}`
      );
    }
  }
  return (
    <>
      <AdvancedMarker {...props} onClick={handleClick}>
        <Tooltip
        // onOpenChange={(open) => {
        //   console.log(open);
        //   handleClick();
        // }}
        >
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              side="top"
              className="z-50 relative flex flex-col_ items-start justify-start gap-4 min-h-24 min-w-[400px] max-w-[640px]"
            >
              <>
                {photoUrl && (
                  <p className="relative p-1 w-full flex items-start">
                    <Image
                      alt=""
                      width="300"
                      height="300"
                      src={photoUrl}
                      className="w-[200px] h-[200px] min-w-[200px] object-cover rounded-md"
                    />

                    <span className="absolute bottom-2 right-4 bg-white rounded-md inline-flex items-center gap-1 px-2 py-1">
                      <img
                        className="w-4 h-4 opacity-80"
                        src={config.logoPath}
                        width="24"
                        height="24"
                      />{" "}
                      {roundToInteger(rating || 0)}
                    </span>
                  </p>
                )}
                <div className="my-2">
                  <p className="mb-4 font-semibold text-lg text-muted-foreground">
                    {profileName}
                  </p>
                  <p className="text-lg text-muted-foreground_">{reason}</p>
                  <p className="absolute top-3 right-2 w-full flex justify-end mt-0 capitalize">
                    {getLevel3TagsFromTags(tags).map((tag) => (
                      <Badge key={tag} variant={"outline"} className="py-1.5">
                        <BadgeCheckIcon className="h-4 w-4 mr-1.5 text-blue-500 opacity-80 " />{" "}
                        {tag}
                      </Badge>
                    ))}
                  </p>
                  <p className="text-xs text-muted-foreground absolute bottom-3 right-3">
                    Hint: click on a map marker to toggle more details.
                  </p>
                </div>
              </>
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </AdvancedMarker>
    </>
  );
}
