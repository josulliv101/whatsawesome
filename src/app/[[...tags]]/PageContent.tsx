import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Profile } from "@/lib/profile";
import { PrimaryTagType, tagDefinitions } from "@/lib/tags";
import { Fragment } from "react";

export default function PageContent({
  profilesByTag,
  hub,
  primaryTag,
  tags,
}: {
  profilesByTag: Array<{
    tags: string[];
    label: string;
    profiles: Array<Profile>;
  }>;
  hub: string;
  primaryTag: PrimaryTagType;
  tags: string[];
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
          activeTags={tags}
          // onFilterChange={(tags: string[]) => console.log(tags)}
          options={tagOptions}
          hub={hub}
          primaryTag={primaryTag}
          // tags={tags}
        />
      </div>
      <PageHeading
        heading={`Discover what's awesome about ${tagDefinitions[primaryTag].plural}.`}
        subhead="Inclusion in the what&#39;s awesome catalog is by invitation only. Everyone can vote on what&#39;s awesome."
      />
      {profilesByTag.map(({ profiles, label }, tagIndex) => (
        <Fragment key={tags[tagIndex]}>
          <div className="mt-10 first:mt-0 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              {hub} / {label}
            </h2>
            <p className="text-sm text-muted-foreground">
              Your personal playlists. Updated daily. / {tags.join(" / ")}
            </p>
          </div>
          <div className="relative w-full">
            <ScrollArea>
              <div className="flex space-x-4 mt-8 p-4 border border-gray-200">
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
