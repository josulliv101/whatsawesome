"use client";

import Image from "next/image";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Reason as ReasonType } from "@/lib/profile";
import { cn, generateRandomDecimal } from "@/lib/utils";
import { Reason } from "@/components/Reason";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleMap from "./GoogleMap";
import Legend from "@/components/Legend";

export default function PageContent({
  children,
  className,
  results,
  title,
}: PropsWithChildren<{
  className?: string;
  title: string;
  results: Array<any>;
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
      <GoogleMap
        markers={results}
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        activeItemHoverId={activeItemHoverId}
        setActiveItemHoverId={setActiveItemHoverId}
        tag={title}
      />

      <h2 className="flex flex-col-reverse items-start gap-1 justify-between text-3xl mb-12 w-full">
        <span className="capitalize">{title} Roundup / North of Boston.</span>
        <span className="text-lg text-muted-foreground">
          Discover excellence.
        </span>
      </h2>
      <div className="flex flex-col gap-4 relative z-[0] ">
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
            <div className="pl-0 py-2 flex items-center justify-between">
              <span className="flex items-center gap-4 text-primary text-lg capitalize font-semibold">
                <Image
                  width="64"
                  height="64"
                  alt={reason.parentId}
                  src={`/${reason.parentId}.jpg`}
                  className="object-cover rounded-md absolute top-[221px] left-[-2px] z-50 border"
                />
                {reason.parentId?.replace(/[-_]/g, " ")}
              </span>
              <Button asChild>
                <Link href={`/profile/${reason.parentId}`}>
                  View Full Profile
                </Link>
              </Button>
            </div>
            <Reason
              description={reason?.reason || ""}
              name={reason.id || ""}
              {...reason}
              rating={reason.rating || 1}
              tags={reason.tags}
              profileId="1"
              isForceRatingToShow

              // photoUrl={profile?.pic}
            ></Reason>
          </div>
        ))}
        <Legend />
      </div>
    </>
  );
}
