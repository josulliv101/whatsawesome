import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import TabNav from "@/components/TabNav";
import { cookies } from "next/headers";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchEntities, fetchHubProfiles, fetchProfile } from "@/lib/firebase";
import { getHubTags, getPrimaryTags, tagDefinitions } from "@/lib/tags";
import { Tags } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import PageContent from "./PageContent";
import useFilterOptions from "./useFilterOptions";
import { FilterByIdType } from "@/lib/filters";
import { API_KEY, ClientAPIProvider } from "@/app/edit/profile/[id]/GoogleMap";

export default async function Home({ params: { tags: tagsParam = [] } }) {
  const { hub, primaryTag, tags } = getHubTags(tagsParam);

  const profile =
    hub !== "all" && hub !== "index" ? await fetchProfile(hub) : undefined;
  const cookieStore = cookies();

  console.log("tags!!!", hub, primaryTag, profile?.tags || []);

  const { filterOptions, filterId } = useFilterOptions(
    profile?.tags || [],
    primaryTag,
    profile?.hubFilterTags
  );

  const cookieName = `filter-${filterId}-${primaryTag}`;

  const filterCookie = cookieStore.get(cookieName);
  console.log("filterCookie", hub, filterId, primaryTag, filterCookie?.value);

  const tagsToUse = filterCookie?.value
    ? filterCookie?.value.split(",")
    : filterOptions
        .filter((option) => option.active)
        .map((option) => option.value);
  const reorderedTags = filterOptions
    .filter((option) => tagsToUse.includes(option.value))
    .map((option) => option.value);
  const updatedOptions = filterOptions.map((option) => ({
    ...option,
    active: tagsToUse.includes(option.value),
  }));
  // if (!filterCookie) {
  //   cookies().set("filter", tagsParam.join("|"), { secure: true });
  // }

  // const profiles = await fetchHubProfiles(hub, primaryTag, [tags[0]]);
  console.log("filterOptions", filterOptions);
  return (
    <PageContent
      // profilesByTag={fetchedProfileByTag}
      {...getHubTags(tagsParam)}
      initialActiveTags={filterCookie?.value?.split(",")}
      tagsToUse={reorderedTags}
      filterOptions={updatedOptions}
      filterId={filterId}
      profile={profile}
    />
  );
}
