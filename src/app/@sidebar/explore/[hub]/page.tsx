import MapPanel from "@/app/explore/[hub]/MapPanel";
import Image from "next/image";
import { ClientAPIProvider } from "@/app__/tags/[...tagIds]/GoogleMap";
import { BreadcrumbSide } from "@/components/BreadcrumbSide";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchClaimsForHub, fetchProfile } from "@/lib/firebase";
import { getPrimaryTagsFromTags, tagDefinitions } from "@/lib/tags";
import Link from "next/link";
import SmallMap from "./SmallMap";
import { config } from "@/lib/config";
import { roundToInteger } from "@/lib/utils";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default async function Page({
  params: { hub },
  searchParams: { pt, st },
}: {
  params: any;
  searchParams: any;
}) {
  const profile = await fetchProfile(hub);
  const data = await fetchClaimsForHub(hub, [pt], [st]);
  const items = tagDefinitions[pt]?.tags || [];
  const markers = data
    .map((datum) => ({ latlng: datum.parent.latlng }))
    .filter((m) => m.latlng?.lat && m.latlng?.lng);
  console.log("markers", markers);
  return (
    <ClientAPIProvider apiKey={API_KEY}>
      <div className="sticky top-[72px] bg-muted">
        <div className="h-[300px]">
          <SmallMap markers={markers} />
        </div>
        <BreadcrumbSide />
        {pt && <SideNav items={items} hub={hub} pt={pt} />}
        <Separator className="my-2" />
      </div>
      <div className="px-4 py-0 max-h-[520px] sticky top-[460px] overflow-auto">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-start gap-4 mb-4 px-0 flex-1"
            >
              <Image
                src={item.photoUrl || item.parent.parentPhotoUrl}
                width={80}
                height={80}
                alt={item.parent.name}
                className="h-[80px] w-[80px] object-cover min-w-[80px]"
              />
              <div key={index} className="relative py-2">
                <strong>{item.parent.name}</strong> |{" "}
                {getPrimaryTagsFromTags(item.tags)} | {item.reason} |{" "}
                <Link href={`/profile/${item.parentId}`}>View Profile</Link>
              </div>
              <div className="relative p-2 text-muted-foreground rounded-md border border-muted-foreground/30 flex flex-col items-center justify-center gap-0 top-0 right-0 font-semibold ">
                <div className="hidden absolute w-6 h-6 flex items-center justify-center -top-2 -right-2 bg-white rounded-full">
                  <img
                    className="w-4 h-4"
                    src={config.logoPath}
                    width="18"
                    height="18"
                  />
                </div>
                <span className="text-2xl font-bold items-center whitespace-nowrap flex gap-1 flex-row-reverse">
                  <img
                    className="w-5 h-5 hidden"
                    src={config.logoPath}
                    width="18"
                    height="18"
                  />{" "}
                  {roundToInteger(item.rating * 10.34)}
                </span>
                <img
                  className="w-5 h-5 my-1"
                  src={config.logoPath}
                  width="18"
                  height="18"
                />
                <div className="text-sm flex items-center whitespace-nowrap">
                  &nbsp;&nbsp;backers&nbsp;&nbsp;
                </div>
              </div>
            </div>
          );
        })}
        <p>
          sidebar hub pt={pt} st={st}
        </p>
      </div>
    </ClientAPIProvider>
  );
}

function SideNav({
  hub,
  items,
  pt,
}: {
  hub: string;
  pt: string;

  items: Array<any>;
}) {
  return (
    <div className="flex gap-2 py-4 flex-wrap capitalize">
      <Button
        key={"all"}
        variant="outline"
        className="text-sm h-7"
        size="sm"
        asChild
      >
        <Link href={`/explore/${hub}?pt=${pt}`}>all</Link>
      </Button>
      {items.map((tag) => (
        <Button
          key={tag}
          variant="outline"
          className="text-sm h-7"
          size="sm"
          asChild
        >
          <Link href={`/explore/${hub}?pt=${pt}&st=${tag}`}>{tag}</Link>
        </Button>
      ))}
    </div>
  );
}
