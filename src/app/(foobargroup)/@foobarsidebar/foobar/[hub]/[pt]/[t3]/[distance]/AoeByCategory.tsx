import { BreadcrumbWithDropdown } from "@/components/BreadcrumbWithDropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { allTags } from "@/lib/config";
import {
  fetchHubProfiles2,
  fetchHubProfilesForAllTags,
  fetchProfile,
} from "@/lib/firebase";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

import { BadgeCheckIcon, ChevronRight, Slash } from "lucide-react";
import { string } from "zod";
import SponsorRack from "@/components/SponsorRack";
import { searchProfilesByCategory } from "@/lib/search";
import { tagDefinitions } from "@/lib/tags";

export default async function AoeByCategory({
  hub,
  pt,
  t3,
  distance = 0,
}: {
  hub: string;
  distance?: number;
}) {
  const aoeByCategory = ["restaurant", "coffeehouse", "hotel", "museum"];
  return (
    <>
      <div className="pl-6 mt-4">
        {aoeByCategory.map((category: any) => {
          const tags = tagDefinitions[category].tags;
          return (
            <Row
              key={category}
              category={category}
              hub={hub}
              label={
                <span className="flex items-center">
                  {hub} <Slash className="w-4 h-4 mx-3" /> {category}
                </span>
              }
              distance={distance}
              // url={`/explore/${hub}?pt=${tags[0]}`}
              profiles={tags}
              tag={"foobar"}
            />
          );
        })}
      </div>
    </>
  );
}

function Row({
  label,
  profiles = [],
  tag,
  hub,
  category,
  distance = 0,
}: {
  label: ReactNode;
  profiles: Array<any>;
  tag: string;
  hub: string;
  category: string;
  distance: number;
}) {
  return (
    <div className="mb-4">
      <h2 className="font-semibold text-base text-muted-foreground mb-2 capitalize flex items-center justify-between">
        {label}
        <Button className="opacity-0" variant={"ghost"} asChild>
          <Link href={"/"}>
            View All <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </h2>
      <div className={`flex items-start gap-2 max-w-full overflow-auto`}>
        {profiles.sort().map((profile) => (
          <div
            key={profile}
            className={`max-w-24 flex flex-col items-center justify-start`}
          >
            <Link
              className={`rounded-md`}
              href={`/foobar/${hub}/${category}/${profile}/${distance}`}
            >
              <div
                key={profile}
                style={{
                  //   backgroundImage: profile.pic
                  //     ? `url(${profile})`
                  //     : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
                className={`border-gray-400/50 capitalize ${profile ? "bg-muted" : "bg-black"} ${profile.length >= 10 ? "text-xs" : "text-sm"} gap-2 min-h-20 min-w-20 max-w-20 border flex flex-col items-center justify-center rounded-md px-6 py-2 bg-muted_ text-muted-foreground text-balance text-center font-semibold`}
              >
                <BadgeCheckIcon className="h-6 w-6 mr-0 text-blue-500 opacity-80" />
                {profile}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
