import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchEntities, fetchHubProfiles } from "@/lib/firebase";
import { getHubTags, getPrimaryTags, tagDefinitions } from "@/lib/tags";
import { Tags } from "lucide-react";
import Image from "next/image";

export default async function Home({ params: { tags: tagsParam = [] } }) {
  const { hub, primaryTag, tags } = getHubTags(tagsParam);
  console.log("tags", hub, primaryTag, tags);

  const profiles = await fetchHubProfiles(hub, primaryTag, [tags[0]]);
  const fetchPromises = tags.map(
    async (tag) => await fetchHubProfiles(hub, primaryTag, [tag])
  );
  const fetchedProfileByTag = await Promise.all(fetchPromises);
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-8 py-12">
      <PageHeading
        heading={`Discover what&#39;s awesome about ${tagDefinitions[primaryTag].plural}.`}
        subhead="Inclusion in the what&#39;s awesome catalog is by invitation only. Everyone can vote on what&#39;s awesome."
      />
      {fetchedProfileByTag.map((profiles, tagIndex) => (
        <>
          <div className="mt-0 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              {hub} / {tags[tagIndex]}
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
        </>
      ))}
    </main>
  );
}
