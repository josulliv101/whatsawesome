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
import DisablePage from "@/components/DisablePage";

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
    <>
      {profile && (primaryTag as string) === "profile" && (
        <ProfilePageContent
          params={{ id: hub }}
          className="lg:pt-0 mt-0 lg:px-0"
        />
      )}

      {(primaryTag as string) !== "profile" && (
        <PageHeading
          heading={`Discover excellence.`} // what's awesome about ${tagDefinitions[primaryTag]?.plural}${profile && hub !== "all" ? ` in ${profile.name}` : ""}
          subhead="Inclusion in the blue mushroom catalog is by invitation only. There's no fee, it's free." // on what&#39;s awesome
        />
      )}
      <DisablePage>
        <Suspense fallback={<LoadingSkeleton />}>
          <Profiles hub={hub} primaryTag={primaryTag} tagsToUse={tagsToUse} />
        </Suspense>
      </DisablePage>
    </>
  );
}
