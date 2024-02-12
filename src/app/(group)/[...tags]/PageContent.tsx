import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import Image from "next/image";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Profile } from "@/lib/profile";
import { PrimaryTagType, getPlural, tagDefinitions } from "@/lib/tags";
import { Fragment, Suspense } from "react";
import Profiles from "./Profiles";
import LoadingSkeleton from "./LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import { FilterOptions } from "@/lib/filters";
import ProfilePageContent from "@/app/profile/[...id]/ProfilePageContent";

export default function PageContent({
  // profilesByTag,
  hub,
  primaryTag,
  tags,
  initialActiveTags,
  tagsToUse,
  profile,
  filterOptions,
  filterId,
}: {
  profilesByTag?: Array<{
    tags: string[];
    label: string;
    profiles: Array<Profile>;
  }>;
  hub: string;
  primaryTag: PrimaryTagType;
  tags: string[];
  initialActiveTags?: string[];
  tagsToUse: string[];
  profile?: Profile;
  filterOptions: FilterOptions;
  filterId: string;
}) {
  const tagOptions = tagDefinitions[primaryTag]?.children.map(
    (tag: string) => ({
      label: tag,
      value: tag,
    })
  );
  const imgPosition = profile?.tags.includes("person")
    ? "object-top"
    : "object-center";
  console.log("TABNAV render");
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4  lg:px-8 py-16 ">
      <div className="w-full flex items-center justify-between pb-16">
        <div className="flex items-center gap-4">
          <TabNav activeTabId={primaryTag} hub={hub} profile={profile} />
        </div>
        <div className="flex items-center gap-4">
          {/* {profile && (
            <Button className="relative pl-5 md:pl-0 h-12" variant={"outline"}>
              <Image
                className="hidden md:block opacity-80 h-12 w-12 rounded-tl-sm rounded-br-sm mr-6"
                alt={hub}
                src={profile.pic}
                height={64}
                width={64}
              />
              <div className="flex flex-col items-start pr-4 md:pr-0">
                <div className="text-sm">{profile.name}</div>
                <div className="text-xs text-muted-foreground">
                  View Profile
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block mx-4 h-6"
              />
              <div className="hidden md:flex opacity-100 px-2 py-1 pr-1 rounded-md min-w-max static bg-transparent  items-center flex-nowrap text-nowrap whitespace-nowrap text-md gap-2">
                <Image
                  alt="vote"
                  src="/cute-mushroom.png"
                  width={16}
                  height={16}
                />{" "}
                78%
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block mx-4 h-6"
              />
              <Square className="h-5 w-5 mr-1 opacity-40" />
            </Button>
          )} */}
          {primaryTag && (primaryTag as string) !== "profile" && (
            <TagFilter
              initialActiveTags={
                initialActiveTags?.length ? initialActiveTags : tags
              }
              filterOptions={filterOptions}
              filterId={filterId}
              // onFilterChange={(tags: string[]) => console.log(tags)}
              // options={tagOptions}
              hub={hub}
              primaryTag={primaryTag}
              // tags={tags}
              title={`filter ${getPlural(primaryTag)}`}
            />
          )}
        </div>
      </div>
      {profile && (primaryTag as string) === "profile" && (
        <ProfilePageContent
          params={{ id: hub }}
          className="lg:pt-0 mt-0 lg:px-0"
        />
      )}

      {(primaryTag as string) !== "profile" && (
        <PageHeading
          heading={`Discover what's awesome about ${tagDefinitions[primaryTag]?.plural}${profile && hub !== "all" ? ` in ${profile.name}` : ""}.`}
          subhead="Inclusion in the what&#39;s awesome catalog is by invitation only. Everyone can vote on what&#39;s awesome."
        />
      )}
      <Suspense fallback={<LoadingSkeleton />}>
        <Profiles hub={hub} primaryTag={primaryTag} tagsToUse={tagsToUse} />
      </Suspense>
    </main>
  );
}
