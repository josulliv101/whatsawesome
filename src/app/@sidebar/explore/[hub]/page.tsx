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
import { Badge } from "@/components/ui/badge";
import { Reason } from "@/components/Reason";
import SponsorRack from "@/components/SponsorRack";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const backers = [
  "@josulliv101",
  "@hoss",
  "@twhitemore",
  "@bigjohn",
  "@efudd",
  "@sarasmith",
  "@bobwhite",
  "@josie",
  "@bjones",
  "@maggie",
];

export default async function Page({
  params: { hub },
  searchParams: { pt, st, t3 },
}: {
  params: any;
  searchParams: any;
}) {
  const profile = await fetchProfile(hub);
  const data = await fetchClaimsForHub(hub, [pt], [st], [t3]);
  const items =
    tagDefinitions[st]?.tags ||
    tagDefinitions[pt]?.tags ||
    tagDefinitions.all.tags ||
    [];
  const markers = data
    .map((datum) => ({ latlng: datum.parent.latlng }))
    .filter((m) => m.latlng?.lat && m.latlng?.lng);
  console.log("markers", markers);
  return (
    <>
      <div className="sticky z-50 top-[72px] bg-muted border-b flex items-center justify-between pl-4">
        <BreadcrumbSide />
      </div>
      <SideNav items={items} hub={hub} pt={pt} st={st} />

      <div className="px-8 pb-5 max-h-[calc(100vh-72px-52px)] sticky top-[120px] overflow-auto">
        {data.map((item, index) => {
          return (
            <>
              <div key={item.id} className="py-2">
                <Reason
                  showExtraPassion={index === 3}
                  description={item.reason}
                  name={item.parent.name}
                  profileId={item.id}
                  rating={Math.max(
                    2,
                    roundToInteger(item.rating * 10.34 - index)
                  )}
                  tags={item.tags}
                  photoUrlAside={
                    item.photoUrl && !item.tags.includes("person")
                      ? item.parent.parentPhotoUrl
                      : undefined
                  }
                  photoUrl={item.photoUrl || item.parent.parentPhotoUrl}
                  id={item.id}
                  isForceRatingToShow
                  latestBacker={backers[index % 10]}
                />
                <div
                  key={index}
                  className="flex_ hidden items-start gap-4 mb-4 mt-4 px-0 flex-1"
                >
                  <Image
                    src={item.photoUrl || item.parent.parentPhotoUrl}
                    width={220}
                    height={220}
                    alt={item.parent.name}
                    className="h-[220px] w-[220px] object-cover min-w-[220px] rounded-md"
                  />
                  <div key={index} className="relative py-2">
                    <strong>{item.parent.name}</strong>{" "}
                    {getPrimaryTagsFromTags(item.tags).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-muted-foreground/50 rounded-sm mx-2"
                      >
                        {tag}
                      </Badge>
                    ))}{" "}
                    {item.reason} |{" "}
                    <Link href={`/profile/${item.parentId}`}>View Profile</Link>
                  </div>
                  <div className="relative p-2 h-[80px] text-muted-foreground rounded-md border border-muted-foreground/30 bg-gray-200/50 flex flex-col items-center justify-center gap-0 top-0 right-0 font-semibold ">
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
                      className="w-5 h-5 my-1 hidden"
                      src={config.logoPath}
                      width="18"
                      height="18"
                    />
                    <div className="text-sm flex items-center whitespace-nowrap">
                      &nbsp;&nbsp;backers&nbsp;&nbsp;
                    </div>
                  </div>
                </div>
              </div>

              {(index + 1) % 10 === 0 && (
                <div className="pt-14 pb-6">
                  <SponsorRack hub={hub} />
                </div>
              )}
            </>
          );
        })}
        <p>
          sidebar hub pt={pt} st={st}
        </p>
      </div>
    </>
  );
}

function SideNav({
  hub,
  items,
  pt,
  st,
}: {
  hub: string;
  pt: string;
  st?: string;
  items: Array<any>;
}) {
  return (
    <div className="flex items-end justify-between gap-2 pt-4 pb-2 px-8 flex-wrap capitalize">
      <div className="flex flex-col items-start gap-1">
        <div className="capitalize text-sm font-semibold text-muted-foreground">
          {hub.replaceAll("-", " ")}
        </div>
        <div className="capitalize text-3xl font-bold">
          {st || pt || "Discover Excellence"}
        </div>
      </div>
      <nav className="flex items-center gap-2">
        <Button
          key={"all"}
          variant="secondary"
          className={`text-sm h-7 text-muted-foreground`}
          size="sm"
          asChild
        >
          <Link href={`/explore/${hub}?pt=${pt}`}>Top 40</Link>
        </Button>
        {items.map((tag) => (
          <Button
            key={tag}
            variant="secondary"
            className="text-sm h-7 text-muted-foreground"
            size="sm"
            asChild
          >
            <Link
              href={`/explore/${hub}?pt=${st || pt}&st=${pt ? st : ""}&t3=${!st ? "" : tag}`}
            >
              {tag}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
