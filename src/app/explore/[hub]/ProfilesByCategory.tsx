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
import { Slash } from "lucide-react";
import { string } from "zod";
import SponsorRack from "@/components/SponsorRack";

export default async function ProfilesByCategory({
  hub,
  pt,
  st,
  t3,
  isShowAll,
  isStacked,
}: {
  hub: string;
  pt?: string;
  st?: string;
  t3?: string;
  isShowAll?: boolean;
  isStacked?: boolean;
}) {
  const profile = await fetchProfile(hub);
  const profilesByTag = await fetchHubProfilesForAllTags(hub, pt);
  console.log("profile", profile);
  return (
    <>
      {isStacked ? null : <br />}
      {/* <MapPanel center={profile.latlng} /> */}
      <div className="bg-muted sticky top-[72px] z-0 mb-8 border-b hidden">
        <BreadcrumbWithDropdown />
      </div>
      <div className="px-8 pt-2">
        {/* <Nav hub={hub} /> */}
        {profilesByTag
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
          })}
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
  return (
    <div className="mb-0">
      <h2 className="font-semibold text-lg mb-4 capitalize flex items-center justify-between">
        {label}{" "}
        <Button variant={"ghost"} asChild>
          <Link href={url}>View excellence</Link>
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
            <Link className={``} href={`/profile/${profile.id}`}>
              <div
                key={profile.name}
                style={{
                  backgroundImage: `url(${profile.pic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
                className="min-h-40 min-w-40 max-w-40 border flex items-center justify-center rounded-md px-6 py-8 bg-muted text-center"
              ></div>
            </Link>
            <Link
              className={`text-balance text-center text-muted-foreground mt-2 px-2 pb-6 ${profile.name?.length > 32 ? "text-xs" : "text-sm"}`}
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
        className={`flex items-start gap-2 max-w-full overflow-auto ${isShowAll ? "flex-wrap justify-start" : ""}`}
      >
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`w-full flex items-center justify-start h-16`}
          >
            <Link className={``} href={`/profile/${profile.id}`}>
              <div
                key={profile.name}
                style={{
                  backgroundImage: `url(${profile.pic})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
                className="min-w-16 max-w-16 h-16 w-16 max-h-16 border flex items-center justify-center rounded-md  bg-muted text-center"
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
