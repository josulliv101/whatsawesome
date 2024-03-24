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
import { PropsWithChildren } from "react";
import MapPanel from "./MapPanel";

export default async function Page({
  params: { hub },
  searchParams: { pt, st },
}: {
  params: any;
  searchParams: any;
}) {
  const profile = await fetchProfile(hub);
  const profilesByTag = await fetchHubProfilesForAllTags(hub, pt);
  console.log("profile", profile);
  return (
    <>
      {/* <MapPanel center={profile.latlng} /> */}
      <div className="bg-muted sticky top-[72px] pl-8 -ml-8 mb-8 border-b">
        <BreadcrumbWithDropdown />
      </div>
      <div className="px-4">
        {/* <Nav hub={hub} /> */}
        {profilesByTag
          .filter(({ profiles }) => !!profiles.length)
          .map(({ profiles, tags, label }: any) => {
            return <Row key={label} label={label} profiles={profiles} />;
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
}: {
  label: string;
  profiles: Array<any>;
}) {
  return (
    <div className="mb-0">
      <h2 className="font-semibold text-lg mb-4">{label}</h2>
      <div className="flex items-start gap-2 max-w-full overflow-auto">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="max-w-[160px] flex flex-col items-center justify-start"
          >
            <div
              key={profile.name}
              style={{
                backgroundImage: `url(${profile.pic})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
              }}
              className="min-h-40 min-w-40 max-w-40 border flex items-center justify-center rounded-md px-6 py-8 bg-muted text-center"
            ></div>
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
