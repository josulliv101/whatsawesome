"use client";

import Image from "next/image";
import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import mergeWith from "lodash.mergewith";
import { Reason as ReasonType } from "@/lib/profile";
import { cn, generateRandomDecimal } from "@/lib/utils";
import { Reason } from "@/components/Reason";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleMap from "./GoogleMap";
import Legend from "@/components/Legend";
import { tagDefinitions } from "@/lib/tags";
import { Badge } from "@/components/ui/badge";
import ReasonTagsFilter from "@/app__/profile/[...id]/ReasonTagsFilter";

function customizer(objValue: any, srcValue: any) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export default function PageContent({
  children,
  className,
  results,
  title,
  onCompareChange,
}: PropsWithChildren<{
  className?: string;
  title: string;
  results: Array<any>;
  onCompareChange?: () => Promise<any>;
}>) {
  const [activeItemHoverId, setActiveItemHoverId] = useState<string | null>(
    null
  );
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const activeItemRef = useRef<HTMLDivElement | null>(null);

  const [entities, setEntityIds] = useState<Array<any>>([]);

  useEffect(() => {
    // const {current} = activeItemRef
    if (activeItemRef.current !== null) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [activeItemId]);

  const reasonsGroupedByTag = entities.map((entity) => {
    return entity.reasons.reduce((acc: any, reason: any) => {
      const tag = reason.tags.length ? reason.tags[0] : undefined;
      const updatedReason = { ...reason, parentId: entity.id };
      if (tag) {
        return {
          ...acc,
          [tag]: acc[tag] ? [...acc[tag], updatedReason] : [updatedReason],
        };
      }
      return acc;
    }, {});
  });

  const reasonsMap = mergeWith.apply(null, [
    ...reasonsGroupedByTag,
    customizer,
  ] as any);

  console.log("reasonsMap", reasonsMap);

  const tags: string[] = Object.keys(reasonsMap).sort();
  console.log("tags", tags);
  const isAnySelected = Object.keys(reasonsMap).length > 0;
  return (
    <>
      <GoogleMap
        markers={results}
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        activeItemHoverId={activeItemHoverId}
        setActiveItemHoverId={setActiveItemHoverId}
        tag={title}
        // onCompareChange={handleAddEntityToCompare}
        entities={entities}
        setEntityIds={setEntityIds}
      />
      {children}

      <h2 className="flex flex-col-reverse items-start gap-1 justify-between text-3xl mb-12 w-full">
        <span className="capitalize">Compare Excellence Head-to-Head</span>
        <span className="text-lg text-muted-foreground">
          Discover excellence.
        </span>
      </h2>
      <div className="">
        {isAnySelected && <ReasonTagsFilter tags={tags} />}
      </div>
      {!isAnySelected && (
        <div className="bg-muted px-4 py-3 text-muted-foreground">
          Select at least 2 items to compare them head-to-head.
        </div>
      )}
      <div className="flex flex-col gap-10 relative z-[0] ">
        {Object.keys(reasonsMap)
          .sort()
          .map((tagId) => {
            const ids = reasonsMap[tagId].map((reason: any) => reason.parentId);
            const uniqueEntityIds = [...new Set(ids)];
            console.log("uniqueEntityIds", uniqueEntityIds);
            return (
              <div
                id={tagId}
                key={tagId}
                className={`relative bg-muted text-muted-foreground px-8 pb-8 rounded-md border`}
              >
                <div className="pl-0 py-2 flex items-center justify-between">
                  <span className="flex items-center gap-4 text-primary text-lg capitalize font-semibold px-3 py-2">
                    {tagId?.replace(/[-_]/g, " ")}
                  </span>
                </div>
                <div>
                  {uniqueEntityIds.map((uniqueId: any) => {
                    const reasonsPerParent = reasonsMap[tagId].filter(
                      (reason: any) => reason.parentId === uniqueId
                    );
                    return (
                      <>
                        <div key={uniqueId} className="mb-6 last:mb-0">
                          {reasonsPerParent
                            .slice(0, 1)
                            .map((reason: any, index: number) => {
                              const entity = entities.find(
                                (entity) => entity.id === reason.parentId
                              );
                              return (
                                <div
                                  key={reason.id}
                                  className={`p-4 rounded-md `}
                                  style={{
                                    backgroundColor:
                                      entity?.primaryColor || "#444",
                                    color:
                                      entity?.primaryColorForeground || "#fff",
                                  }}
                                >
                                  {index === 0 && (
                                    <div className="py-2 text-inherit flex items-center gap-4">
                                      <div className="flex items-center gap-4 w-full">
                                        <Image
                                          className={`rounded-md hover:grayscale-0__ object-cover w-full h-full max-h-[48px] max-w-full block min-w-full md:h-[48px] md:max-w-[48px] md:w-auto min-h-full md:min-w-[48px] overflow-hidden opacity-100 border-r-0`}
                                          width="48"
                                          height="48"
                                          src={entity.pic}
                                          alt=""
                                        />
                                        <div className="text-xl font-sem'">
                                          {entity.name}
                                        </div>
                                      </div>
                                      <Button asChild>
                                        <Link href={`/profile/${entity.id}`}>
                                          View Full Profile
                                        </Link>
                                      </Button>
                                    </div>
                                  )}
                                  <Reason
                                    key={reason.id}
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
                              );
                            })}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            );
          })}

        <Legend />
      </div>
    </>
  );
}
