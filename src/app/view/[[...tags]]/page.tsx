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
import { Fragment, Suspense } from "react";
// import useFilterOptions from "../../[[...tags]]/useFilterOptions";
import { FilterByIdType } from "@/lib/filters";
import Profiles from "./Profile";

export default async function ViewAll({
  params: { tags: tagsParam },
}: {
  params: { tags: string[] | string | undefined };
}) {
  const { hub, primaryTag, tags } = getHubTags(tagsParam);

  // const profile = hub !== "all" ? await fetchProfile(hub) : undefined;
  // const cookieStore = cookies();

  console.log("tags", tagsParam, hub, primaryTag);

  return (
    <div className="mt-10 mb-8 relative max-w-7xl mx-auto flex flex-col sm:flex-row items-start gap-8 w-full">
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <Profiles hub={hub} primaryTag={primaryTag} tagsToUse={tags} />
        </Suspense>
      </div>
    </div>
  );
}
