import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import Image from "next/image";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Profile } from "@/lib/profile";
import { PrimaryTagType, getPlural, tagDefinitions } from "@/lib/tags";
import { Fragment, Suspense, useRef, useState } from "react";
import Profiles from "./Profiles";
import LoadingSkeleton from "./LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import { FilterOptions } from "@/lib/filters";
import ProfilePageContent from "@/app/profile/[...id]/ProfilePageContent";
import DisablePage from "@/components/DisablePage";
import GoogleMap from "./GoogleMapMain";
import { API_KEY, ClientAPIProvider } from "@/app/edit/profile/[id]/GoogleMap";
import { fetchHubProfiles } from "@/lib/firebase";
import BubbleChart from "./BubbleChart";
import { BreadcrumbWithDropdown } from "@/components/BreadcrumbWithDropdown";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default async function PageContent({
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
  const fetchPromises =
    tagsToUse?.map(
      async (tag) => await fetchHubProfiles(hub, primaryTag, [tag])
    ) || [];

  const fetchPromises2 =
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

  const markers = profilesByTag
    .filter((item: any) => !!item?.profiles)
    .map(({ profiles = [] }: { profiles: Array<any> }) => {
      return profiles.map((profile) => ({
        ...profile,
        name: profile.name,
        id: profile.id,
        latlng: profile?.latlng,
        tag: profile?.tags?.length ? profile.tags[0] : null,
      }));
    })
    .flat()
    .filter((item: any) => !!item?.latlng)
    .map((item: any) => ({
      ...item,
      latlng: { lat: item?.latlng.latitude, lng: item?.latlng.longitude },
    }));

  console.log("markers", markers);

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

  // const [activeItemId, setActiveItemId] = useState<string | null>(null);
  // const activeItemRef = useRef<HTMLDivElement | null>(null);
  return (
    <ClientAPIProvider apiKey={API_KEY}>
      {profile && (primaryTag as string) === "profile" && (
        <ProfilePageContent
          params={{ id: hub }}
          className="lg:pt-0 mt-0 lg:px-0"
        />
      )}
      <div className="sticky top-[-14px] flex items-center justify-between pb-4 pt-6 mb-0 mx-0 px-4 rounded-md z-[99] bg-gray-50 w-full">
        <BreadcrumbWithDropdown hub={hub} />
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Hide Map</Label>
        </div>
      </div>
      {primaryTag === "place" && (
        <GoogleMap
          profilesByTag={profilesByTag}
          markers={markers}
          center={profile?.latlng}
          // activeItemId={activeItemId}
          // setActiveItemId={setActiveItemId}
          // activeItemRef={activeItemRef}
          // activeItemHoverId={activeItemHoverId}
          // setActiveItemHoverId={setActiveItemHoverId}
          tag={"burger"}
          hub={hub}
        />
      )}

      {primaryTag === "person" && (
        <BubbleChart
          profilesByTag={profilesByTag}
          markers={markers}
          //activeItemId={null}
          // setActiveItemId={null}
          activeItemHoverId={null}
          // setActiveItemHoverId={null}
          tag={"burger"}
        />
      )}

      {(primaryTag as string) !== "profile" && (
        <div className="px-8">
          <PageHeading
            heading={`Discover & celebrate excellence ${profile && hub !== "all" ? ` in ${profile.name}` : ""}.`} // what's awesome about ${tagDefinitions[primaryTag]?.plural}${profile && hub !== "all" ? ` in ${profile.name}` : ""}
            subhead="Inclusion in the blue mushroom catalog is by invitation only. There's no fee, it's free." // on what&#39;s awesome
          />
        </div>
      )}
      <DisablePage>
        <Suspense fallback={<LoadingSkeleton />}>
          <Profiles
            // activeItemRef={activeItemRef}
            // activeItemId={activeItemId}
            hub={hub}
            primaryTag={primaryTag}
            tagsToUse={tagsToUse}
          />
        </Suspense>
      </DisablePage>
    </ClientAPIProvider>
  );
}
