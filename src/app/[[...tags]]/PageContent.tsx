import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Profile } from "@/lib/profile";
import { PrimaryTagType, tagDefinitions } from "@/lib/tags";
import { Fragment, Suspense } from "react";
import Profiles from "./Profiles";
import LoadingSkeleton from "./LoadingSkeleton";

export default function PageContent({
  // profilesByTag,
  hub,
  primaryTag,
  tags,
  initialActiveTags,
  tagsToUse,
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
}) {
  const tagOptions = tagDefinitions[primaryTag].children.map((tag) => ({
    label: tag,
    value: tag,
  }));

  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4 py-6 lg:px-8 lg:py-12">
      <div className="w-full flex items-center justify-between pb-12">
        <TabNav activeTabId={primaryTag} hub={hub} />
        <TagFilter
          initialActiveTags={
            initialActiveTags?.length ? initialActiveTags : tags
          }
          // onFilterChange={(tags: string[]) => console.log(tags)}
          // options={tagOptions}
          hub={hub}
          primaryTag={primaryTag}
          // tags={tags}
        />
      </div>
      <PageHeading
        heading={`Discover what's awesome about ${tagDefinitions[primaryTag].plural}.`}
        subhead="Inclusion in the what&#39;s awesome catalog is by invitation only. Everyone can vote on what&#39;s awesome."
      />
      <Suspense fallback={<LoadingSkeleton />}>
        <Profiles hub={hub} primaryTag={primaryTag} tagsToUse={tagsToUse} />
      </Suspense>
    </main>
  );
}
