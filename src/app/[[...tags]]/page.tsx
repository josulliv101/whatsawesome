import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import TabNav from "@/components/TabNav";
import { cookies } from "next/headers";
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

  const cookieStore = cookies();
  const filterCookie = cookieStore.get(`filter-${primaryTag}`);
  console.log("filterCookie", primaryTag, filterCookie?.value);

  const tagsToUse = filterCookie?.value ? filterCookie?.value.split(",") : tags;
  // if (!filterCookie) {
  //   cookies().set("filter", tagsParam.join("|"), { secure: true });
  // }

  // const profiles = await fetchHubProfiles(hub, primaryTag, [tags[0]]);

  return (
    <PageContent
      // profilesByTag={fetchedProfileByTag}
      {...getHubTags(tagsParam)}
      initialActiveTags={filterCookie?.value?.split(",")}
      tagsToUse={tagsToUse}
    />
  );
}
