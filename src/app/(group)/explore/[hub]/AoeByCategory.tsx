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
import MapPanel from "./MapPanel";
import { BadgeCheckIcon, ChevronRight, Slash } from "lucide-react";
import { string } from "zod";
import SponsorRack from "@/components/SponsorRack";
import { searchProfilesByCategory } from "@/lib/search";
import { tagDefinitions } from "@/lib/tags";

export default async function AoeByCategory({ hub }: { hub: string }) {
  const aoeByCategory = ["restaurant", "coffeehouse", "hotel", "museum"];
  return (
    <>
      <div className="px-8 mt-8">
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
}: {
  label: ReactNode;
  profiles: Array<any>;
  tag: string;
  hub: string;
  category: string;
}) {
  return (
    <div className="mb-0">
      <h2 className="font-semibold text-lg mb-4 capitalize flex items-center justify-between">
        {label}{" "}
        <Button variant={"ghost"} asChild>
          <Link href={"/"}>
            View All <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </h2>
      <div className={`flex items-start gap-2 max-w-full overflow-auto`}>
        {profiles.map((profile) => (
          <div
            key={profile}
            className={`max-w-[160px] flex flex-col items-center justify-start`}
          >
            <Link
              className={`rounded-md`}
              href={`/explore/${hub}?pt=${category}&t3=${profile}`}
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
                className={`${profile ? "bg-muted" : "bg-black"} text-xl gap-2 min-h-32 min-w-32 max-w-32 border flex flex-col items-center justify-center rounded-md px-6 py-8 bg-muted_ text-muted-foreground text-balance text-center font-semibold`}
              >
                <BadgeCheckIcon className="h-8 w-8 mr-0 text-blue-500 opacity-80" />
                {profile}
              </div>
            </Link>
            <Link
              className={`opacity-0 text-balance text-center text-muted-foreground mt-2 px-2 pb-6`}
              href={`/profile/${profile}`}
            >
              {profile}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
