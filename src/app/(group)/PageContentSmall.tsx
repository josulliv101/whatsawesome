"use client";

import Image from "next/image";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Reason as ReasonType } from "@/lib/profile";
import { cn, generateRandomDecimal } from "@/lib/utils";
import { Reason } from "@/components/Reason";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import Legend from "@/components/Legend";

export default function PageContentSmall({
  children,
  className,
  results,
  title,
  hideMap,
}: PropsWithChildren<{
  className?: string;
  title: string;
  results: Array<any>;
  hideMap?: boolean;
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
      <div className="flex flex-col gap-4 relative z-[0] max-h-[500px] h-full overflow-auto">
        {results.map((reason) => (
          <div
            id={reason.id}
            key={reason.id}
            className="relative bg-muted text-muted-foreground px-2 pb-2 rounded-md border "
          >
            <div
              className="absolute top-[-510px] opacity-0"
              ref={reason.id === activeItemId ? activeItemRef : null}
            >
              foobar
            </div>
            <div className="pl-0 py-2 flex flex-col items-center justify-between">
              <span className="flex w-full items-center gap-4 text-primary text-lg capitalize font-semibold">
                {reason?.photoUrl && (
                  <Image
                    width="300"
                    height="300"
                    alt={reason.parentId}
                    src={reason.photoUrl}
                    className="object-contain h-[300px] w-full rounded-md absolute_  z-50 border"
                  />
                )}
              </span>
            </div>
            <div className="text-sm p-4">{reason?.reason || ""}</div>
            <Button size={"sm"} asChild>
              <Link href={`/profile/${reason.parentId}`}>Profile</Link>
            </Button>
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
