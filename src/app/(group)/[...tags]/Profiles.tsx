import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchHubProfiles } from "@/lib/firebase";
import { Profile } from "@/lib/profile";
import { PrimaryTagType, tagDefinitions } from "@/lib/tags";
import Link from "next/link";
import { Fragment } from "react";

export default async function Profiles({
  hub,
  tagsToUse,
  primaryTag,
}: {
  hub: string;
  tagsToUse: string[];
  primaryTag: PrimaryTagType;
}) {
  const fetchPromises =
    tagsToUse?.map(
      async (tag) => await fetchHubProfiles(hub, primaryTag, [tag])
    ) || [];
  const fetchedProfileByTag = await Promise.all(fetchPromises);
  return (
    <main className="flex min-h-screen w-full mx-auto flex-col items-start justify-start">
      {fetchedProfileByTag.map(({ profiles, label }, tagIndex) => (
        <Fragment key={tagsToUse[tagIndex]}>
          <div className="mt-20 first:mt-8 space-y-1 w-full">
            <h2 className="w-full flex items-center justify-between text-2xl font-semibold tracking-tight">
              <div>
                {hub} / {label}
              </div>
              <Button size="sm" variant={"secondary"} asChild>
                <Link
                  href={`/view/${hub}/${primaryTag}/${tagsToUse[tagIndex]}`}
                >
                  View All
                </Link>
              </Button>
            </h2>
            <p className="text-sm text-muted-foreground">
              Your personal playlists. Updated daily. / {tagsToUse.join(" / ")}
            </p>
          </div>
          <div className="relative w-full">
            <ScrollArea>
              <div className="flex space-x-4 mt-8 p-4 border shadow-md border-gray-200 bg-white">
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
    </main>
  );
}