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
      <div className="bg-muted sticky top-[72px] pl-8 -ml-8">
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
    <div className="mb-4">
      <h2 className="font-semibold text-lg">{label}</h2>
      <div className="flex items-center gap-2">
        {profiles.map((profile) => (
          <div key={profile.name} className="border rounded-md p-2 bg-muted">
            <Link href={`/profile/${profile.id}`}>{profile.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
