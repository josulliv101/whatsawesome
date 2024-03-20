import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { config } from "@/lib/config";
import { fetchHubProfiles } from "@/lib/firebase";
import { Profile } from "@/lib/profile";
import { PrimaryTagType, getPlural, tagDefinitions } from "@/lib/tags";
import { GlobeIcon } from "lucide-react";
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
  const fetchedProfileByTag = await fetchHubProfiles(
    hub,
    primaryTag,
    tagsToUse,
    99 || config.totalPaginationProfiles
  );
  const label = tagsToUse.map((tag) => getPlural(tag)).join(" / ");
  return (
    <main className="flex min-h-screen w-full mx-auto flex-col items-start justify-start">
      <PageHeading
        icon={<GlobeIcon className="h-4 w-4 text-gray-400" />}
        heading={`${label}`}
        subhead={`${hub} / ${label} / ${fetchedProfileByTag.profiles.length} total profiles`}
      />
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 sm:gap-4">
        {fetchedProfileByTag.profiles.map((profile: any) => (
          <ProfileCard
            key={profile.name}
            width={300}
            height={300}
            aspectRatio="portrait"
            className="w-full max-w-full object-bottom"
            profile={profile}
          />
        ))}
      </div>
    </main>
  );
}
