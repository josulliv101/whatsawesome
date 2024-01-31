import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import TabNav from "@/components/TabNav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchEntities, fetchHubProfiles } from "@/lib/firebase";
import { getHubTags, getPrimaryTags, tagDefinitions } from "@/lib/tags";
import { Tags } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import PageContent from "./PageContent";

export default async function Home({ params: { tags: tagsParam = [] } }) {
  const { hub, primaryTag, tags } = getHubTags(tagsParam);
  console.log("tags", hub, primaryTag, tags);

  // const profiles = await fetchHubProfiles(hub, primaryTag, [tags[0]]);
  const fetchPromises = tags.map(
    async (tag) => await fetchHubProfiles(hub, primaryTag, [tag])
  );
  const fetchedProfileByTag = await Promise.all(fetchPromises);
  return (
    <PageContent
      profilesByTag={fetchedProfileByTag}
      {...getHubTags(tagsParam)}
    />
  );
}
