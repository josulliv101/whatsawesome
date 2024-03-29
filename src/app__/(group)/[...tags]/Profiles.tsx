import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import SponsorCard from "@/components/SponsorCard";
import SponsorRack from "@/components/SponsorRack";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { config } from "@/lib/config";
import { fetchHubProfiles } from "@/lib/firebase";
import { Profile } from "@/lib/profile";
import { PrimaryTagType, tagDefinitions } from "@/lib/tags";
import { profile } from "console";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";

import { Fragment, useRef, useState } from "react";

export default async function Profiles({
  hub,
  tagsToUse,
  primaryTag,
  activeItemRef,
  activeItemId,
}: {
  hub: string;
  tagsToUse: string[];
  primaryTag: PrimaryTagType;
  activeItemRef?: any;
  activeItemId?: string | null;
}) {
  const fetchPromises =
    tagsToUse?.map(
      async (tag) => await fetchHubProfiles(hub, primaryTag, [tag])
    ) || [];

  const fetchPromises2: any =
    tagDefinitions.person.children?.map(
      async (tag: string) => await fetchHubProfiles(hub, "person", [tag])
    ) || [];
  const fetchedProfileByTag = await Promise.all(fetchPromises);
  const fetchedProfileByTag2 = await Promise.all(fetchPromises2);

  const profilesByTag = fetchedProfileByTag.reduce((acc: any, item, i) => {
    if (i > -1 && i % 2 === 0) {
      return [...acc, item, fetchedProfileByTag2[i / 2]];
    }
    return [...acc, item];
  }, []);

  return (
    <main className="flex px-8 min-h-screen w-full max-w-full mx-auto flex-col items-start justify-start">
      {[...((profilesByTag as any) || {})]
        .filter((item) => !!item && item?.profiles && item.profiles.length > 0)
        .map(({ tags, profiles, label }, tagIndex) => (
          <Fragment key={tagsToUse[tagIndex]}>
            <div
              id={tagsToUse.join("-") + "-foobar"}
              className={`mt-8 first:mt-8 space-y-1 w-full relative ${!profiles.length ? "hidden" : ""}`}
            >
              {" "}
              <div
                id={`foobar-${tags}`}
                className="absolute top-[-490px] opacity-0"
                ref={label === activeItemId ? activeItemRef : null}
              >
                foobar
              </div>
              <h2 className="w-full flex items-center justify-between text-2xl font-semibold tracking-tight">
                <div className="capitalize">
                  <span className="capitalize font-semibold inline-flex items-center gap-2 pr-2">
                    {" "}
                    {hub !== config.rootHub && (
                      <>
                        <GlobeIcon className="h-4 w-4" />{" "}
                        {hub.replace(/[-]/g, " ")}{" "}
                        <span className="pl-1">/</span>
                      </>
                    )}
                  </span>
                  {label}
                </div>
                <Button size="sm" variant={"secondary"} asChild>
                  <Link
                    href={`/view/${hub}/${primaryTag}/${tagsToUse[tagIndex]}`}
                  >
                    View All
                  </Link>
                </Button>
              </h2>
              <p className="hidden text-sm text-muted-foreground">
                Your personal playlists. Updated daily. /{" "}
                {tagsToUse.join(" / ")}
              </p>
            </div>
            <div className="relative w-full">
              <ScrollArea>
                <div className="flex space-x-4 mt-2 p-4 border shadow-md border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  {profiles.map((profile: any) => (
                    <ProfileCard
                      key={profile.name}
                      width={200}
                      height={200}
                      aspectRatio="square"
                      className="w-[200px] max-w-[200px]"
                      profile={profile}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </Fragment>
        ))}
      {/* <div className="bg-gray-200 w-full mt-20 opacity-100">
        <SponsorRack hub={hub} />
      </div> */}
    </main>
  );
}
