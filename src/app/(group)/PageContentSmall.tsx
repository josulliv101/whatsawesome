"use client";

import Image from "next/image";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Reason as ReasonType } from "@/lib/profile";
import { cn, generateRandomDecimal, roundToInteger } from "@/lib/utils";
import { Reason } from "@/components/Reason";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Legend from "@/components/Legend";
import { config } from "@/lib/config";
import { Heart } from "lucide-react";
import { tagDefinitions } from "@/lib/tags";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function PageContentSmall({
  children,
  className,
  results,
  title,
  hideMap,
  hub,
}: PropsWithChildren<{
  className?: string;
  title: string;
  results: Array<any>;
  hideMap?: boolean;
  hub: string;
}>) {
  const [activeItemHoverId, setActiveItemHoverId] = useState<string | null>(
    null
  );
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const activeItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // const {current} = activeItemRef
    if (activeItemRef.current !== null) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [activeItemId]);
  return (
    <>
      <h2 className="py-3 capitalize text-lg font-semibold px-2 mt-0 flex items-center justify-start">
        {hub.replaceAll("-", " ")}
        <span className="px-2">/</span> Most Backed
        <span className="capitalize text-md text-muted-foreground font-normal pr-2"></span>
      </h2>
      <div className="flex flex-col gap-2 relative z-[0]  h-full overflow-auto">
        {results.map((reason) => (
          <div
            id={reason.id}
            key={reason.id}
            className="relative bg-muted_ text-muted-foreground px-2 pb-0 rounded-md border-0 "
          >
            <div className="py-0 font-semibold capitalize flex items-center justify-between">
              <span className="flex-1 whitespace-nowrap">
                {reason.parentId.replaceAll("-", " ")}
              </span>
              <Button
                variant={"link"}
                size={"sm"}
                className="capitalize"
                asChild
              >
                <Link href={`/profile/${reason.parentId}`}>
                  <Badge
                    variant={"outline"}
                    className="rounded-sm border-muted-foreground text-muted-foreground"
                  >
                    {
                      reason?.tags.filter(
                        (t: string) =>
                          t !== "boston" &&
                          t !== "cambridge-ma" &&
                          t !== "arlington-ma" &&
                          t !== "somerville-ma"
                      )[0]
                    }
                  </Badge>
                </Link>
              </Button>
            </div>
            <div
              className="absolute top-[-510px] opacity-0"
              ref={reason.id === activeItemId ? activeItemRef : null}
            >
              foobar
            </div>
            <div className="flex items-start gap-1 relative">
              <div className="pl-0 py-2 flex flex-col items-center justify-between">
                <span className="flex w-full items-center gap-4 text-primary text-lg capitalize font-semibold">
                  <Image
                    width="300"
                    height="300"
                    alt={reason.parentId}
                    src={reason.photoUrl || `/${reason.parentId}.jpg`}
                    className="object-cover h-324 w-24 min-w-24 min-h-24 max-h-24 rounded-md absolute_  z-50 border"
                  />
                </span>
              </div>
              <div className="text-sm p-4 relative">{reason?.reason || ""}</div>
              <div
                // variant={"outline"}
                className="absolute bottom-4 right-0 flex gap-2 text-sm text-muted-foreground transition-all duration-500 p-0 leading-none"
              >
                <Image
                  alt="vote"
                  src={config.logoPath}
                  width={16}
                  height={16}
                  className="grayscale_ ml-2 relative -top-px"
                />
                {(roundToInteger(reason.rating * 100) === 287 ||
                  roundToInteger(reason.rating * 100) === 240) && (
                  <Heart className="w-3.5 h-3.5 absolute hidden_ left-[37px] top-[3px] stroke-2 text-white fill-red-500" />
                )}
                <span className="pr-2">
                  {roundToInteger(reason.rating * 100)} Backers
                </span>
              </div>
            </div>
            <Separator className="mt-2" />
            {/* <Reason
              description={reason?.reason || ""}
              name={reason.id || ""}
              {...reason}
              rating={reason.rating || 1}
              tags={reason.tags}
              profileId="1"
              isForceRatingToShow
              photoUrl={reason?.photoUrl || reason.parentPhotoUrl}
            ></Reason> */}
          </div>
        ))}
      </div>
    </>
  );
}
