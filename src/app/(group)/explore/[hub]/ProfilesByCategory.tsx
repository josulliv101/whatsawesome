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
import { ChevronRight, Slash } from "lucide-react";
import { string } from "zod";
import SponsorRack from "@/components/SponsorRack";
import { searchProfilesByCategory } from "@/lib/search";

export default async function ProfilesByCategory({
  hub,
  pt,
  st,
  t3,
  catalog,
  isShowAll,
  isStacked,
}: {
  hub: string;
  pt?: string;
  st?: string;
  t3?: string;
  catalog?: string;
  isShowAll?: boolean;
  isStacked?: boolean;
}) {
  const query = [hub, pt, st, t3].filter((tag) => !!tag) as string[];
  const profilesByCategory = await searchProfilesByCategory(
    hub,
    catalog ? [catalog] : undefined
  );

  // const profile = await fetchProfile(hub);
  // const profilesByTag = await fetchHubProfilesForAllTags(hub, pt);
  console.log("profilesByCategory..", profilesByCategory);
  // return JSON.stringify(profilesByCategory);
  return (
    <>
      {isStacked ? null : <br />}
      {/* <MapPanel center={profile.latlng} /> */}
      <div className="bg-muted sticky top-[72px] z-0 mb-8 border-b hidden">
        <BreadcrumbWithDropdown />
      </div>
      <div className="px-8 pt-2">
        {/* <Nav hub={hub} /> */}
        {/* {profiles.map((profile, index) => (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-6">{profile.query}</h2>
            {profile.hits.map(
              ({ objectID, description, name, _geoloc }: any) => (
                <div className="mb-4">
                  <h2>
                    <Link href={`/profile/${objectID}`}>{name}</Link>
                  </h2>
                  <p>{description ? description : "--"}</p>
                </div>
              )
            )}
          </div>
        ))} */}
        {profilesByCategory
          .filter(({ profiles, tags, label }) => !!profiles?.length)
          .map(({ profiles, tags, label }: any) => {
            const Component = isStacked ? Stack : Row;
            return (
              <Component
                key={label}
                label={
                  <span className="flex items-center">
                    {hub} <Slash className="w-4 h-4 mx-3" /> {label}
                  </span>
                }
                url={`/explore/${hub}?pt=${tags[0]}`}
                profiles={profiles}
                isShowAll={isShowAll}
                tag={tags[0]}
              />
            );
          })}
        {/* {profilesByTag
          .filter(({ profiles }) => !!profiles.length)
          .map(({ profiles, tags, label }: any) => {
            const Component = isStacked ? Stack : Row;
            return (
              <Component
                key={label}
                label={
                  <span className="flex items-center">
                    {hub} <Slash className="w-4 h-4 mx-3" /> {label}
                  </span>
                }
                url={`/explore/${hub}?pt=${tags[0]}`}
                profiles={profiles}
                isShowAll={isShowAll}
                tag={tags[0]}
              />
            );
          })} */}
      </div>
    </>
  );
}

function formatLatLng(latlng: any) {
  return {
    lat: latlng.latitude,
    lng: latlng.longitude,
  };
}

function Nav({ hub }: { hub: string }) {
  return (
    <div className="flex gap-2 py-4 flex-wrap capitalize">
      <Button size="sm" variant="outline" className="text-sm h-7" asChild>
        <Link className="" href={`/explore/${hub}`}>
          all
        </Link>
      </Button>
      {allTags.map((tag) => (
        <Button
          key={tag}
          size="sm"
          variant="outline"
          className="text-sm h-7"
          asChild
        >
          <Link href={`/explore/${hub}?pt=${tag}`}>{tag}</Link>
        </Button>
      ))}
    </div>
  );
}

function Row({
  label,
  profiles = [],
  isShowAll,
  url,
  tag,
}: {
  label: ReactNode;
  profiles: Array<any>;
  isShowAll?: boolean;
  url: string;
  tag: string;
}) {
  return null;
  return (
    <div className="mb-0">
      <h2 className="font-semibold text-lg mb-4 capitalize flex items-center justify-between">
        {label}{" "}
        <Button variant={"ghost"} asChild>
          <Link href={url}>
            View All <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </h2>
      <div
        className={`flex items-start gap-2 max-w-full overflow-auto ${isShowAll ? "flex-wrap justify-start" : ""}`}
      >
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`max-w-[160px] flex flex-col items-center justify-start`}
          >
            <Link className={``} href={`/profile/${profile.objectID}`}>
              <div
                key={profile.name}
                style={{
                  backgroundImage: `url(${profile.pic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
                className="min-h-32 min-w-32 max-w-32 border flex items-center justify-center rounded-md px-6 py-8 bg-muted text-center"
              ></div>
            </Link>
            <Link
              className={`text-balance text-center text-muted-foreground mt-2 px-2 pb-6 ${profile.name?.length > 32 ? "text-xs" : "text-sm"}`}
              href={`/profile/${profile.objectID}`}
            >
              {profile.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stack({
  label,
  profiles = [],
  isShowAll,
  url,
  tag,
}: {
  label: ReactNode;
  profiles: Array<any>;
  isShowAll?: boolean;
  url: string;
  tag: string;
}) {
  return (
    <div className="mb-0">
      <h2 className="font-semibold text-lg mb-4 capitalize flex items-center justify-between">
        {label}
        {/* <Button variant={"ghost"} asChild>
          <Link href={url}>View excellence</Link>
        </Button> */}
      </h2>
      <div
        className={`flex items-start gap-1 max-w-full overflow-auto ${isShowAll ? "flex-wrap justify-start" : ""}`}
      >
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`w-full flex items-center justify-start h-12`}
          >
            <Link className={``} href={`/profile/${profile.id}`}>
              <div
                key={profile.name}
                style={{
                  backgroundImage: `url(${profile.pic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
                className="min-w-12 max-w-12 h-12 w-12 max-h-12 border flex items-center justify-center rounded-md  bg-muted text-center"
              ></div>
            </Link>
            <Link
              className={`text-balance text-center px-6 ${profile.name?.length > 32 ? "text-xs" : "text-sm"}`}
              href={`/profile/${profile.id}`}
            >
              {profile.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
