import Image from "next/image";
import { ClientAPIProvider } from "@/app__/tags/[...tagIds]/GoogleMap";
import { BreadcrumbSide } from "@/components/BreadcrumbSide";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  fetchClaimsForHub,
  fetchProfile,
  fetchTopClaimsForHub,
} from "@/lib/firebase";
import {
  getHubTagsFromTags,
  getLevel3TagsFromTags,
  getPlural,
  getPrimaryTagsFromTags,
  tagDefinitions,
  trendingExcellenceTags,
} from "@/lib/tags";
import Link from "next/link";
import SmallMap from "./SmallMap";
import { config } from "@/lib/config";
import { roundToInteger } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reason } from "@/components/Reason";
import SponsorRack from "@/components/SponsorRack";
import { PresetSelector } from "./PresetSelector";
import {
  BadgeCheckIcon,
  CheckIcon,
  ChevronRight,
  SlashIcon,
  TagsIcon,
} from "lucide-react";
import { Fragment, PropsWithChildren, Suspense } from "react";
import ReasonTagsFilter from "@/app__/profile/[...id]/ReasonTagsFilter";
import { searchTopAoeByCategory, searchTopAoeByMapBounds } from "@/lib/search";
import { boolean } from "zod";
import ProfileList from "./ProfileList";
import { InfoCircledIcon } from "@radix-ui/react-icons";

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

export default async function ExcellenceItems({
  hub,
  pt = "",
  st = "",
  t3 = "",
  isStacked,
  isGrid,
  searchMapBounds = "",
  showHint,
  profileMap,
  hideNav = false,
  MushroomButton,
}: {
  hub: string;
  pt?: string;
  st?: string;
  t3?: string;
  searchMapBounds?: string;
  isStacked?: boolean;
  isGrid?: boolean;
  showHint?: boolean;
  profileMap?: any;
  hideNav?: boolean;
  MushroomButton?: any;
}) {
  // const profile = await fetchProfile(hub);

  const categories = await searchTopAoeByCategory(hub);
  // console.log("my cats", categories);
  const topClaims = categories.map((category) => {
    return {
      labels: "",
      tags: category.query?.split(","),
      results: category.hits,
    };
  });
  const topAoe = await searchTopAoeByCategory(hub, [[t3, pt]]);
  let hits = topAoe[0].hits.sort(
    (a: any, b: any) => Number(b.rating) - Number(a.rating)
  );

  if (searchMapBounds) {
    const hits2 = await searchTopAoeByMapBounds(hub, [t3], searchMapBounds);
    // console.log("hits2", hits2);
    hits = hits2.hits;
  }

  // console.log("hits", topAoe);
  // return null;
  // const data = await fetchClaimsForHub(hub, [pt], [st], [t3]);

  // const topClaims = await fetchTopClaimsForHub(hub, [pt], [st], [t3]);
  const items = tagDefinitions[st]?.tags || tagDefinitions[pt]?.tags || [];

  const Component = isStacked ? StackedReason : Reason;
  const dataToUse = !isStacked ? topAoe : topClaims;
  // console.log("data", topAoe.hits);
  return (
    <>
      {!isStacked && !hideNav && (
        <SideNav
          items={items}
          resultsCount={dataToUse.length}
          hub={hub}
          pt={pt}
          st={st}
          t3={t3}
        />
      )}
      {!isGrid && isStacked && (
        <h2 className="font-semibold text-2xl capitalize px-8 mt-20 py-0 flex items-center">
          Discover Excellence in {hub.replaceAll("-", " ")}
        </h2>
      )}
      {profileMap && (
        <Suspense>
          <ProfileList profileMap={profileMap} />
        </Suspense>
      )}
      <div
        className={`mt-4 mx-8 pt-4 rounded-md pb-4 ${isStacked ? "" : "bg-muted px-4"} sticky__ top-[120px] overflow-auto ${isGrid ? "grid md:grid-cols-12 gap-x-8 gap-y-8" : "gap-8"}`}
      >
        {showHint && (
          <p
            className={`${isStacked ? "col-span-12" : ""} hidden_ opacity-100 text-muted-foreground mt-4_ px-2 py-0 top-2_ relative flex items-center`}
          >
            Leave a{" "}
            <Image
              // id={marker.id}
              alt="vote"
              src={config.logoPath}
              width={15}
              height={15}
              className={`inline-flex ml-2 mr-2 grayscale opacity-80`}
            />{" "}
            on the items where you can confirm the excellence.
            <Button variant={"ghost"} size={"sm"}>
              How it works
              <ChevronRight className="stroke-1 h-4 w-4 text-muted-foreground bg-muted-foreground_ rounded-full" />
            </Button>
          </p>
        )}

        {!isStacked &&
          hits
            .slice(0, 10)
            // .filter((item) => item.reason)
            .map((result, index) => (
              <div key={result.objectID} className="last:mb-8">
                <ExcellenceItem
                  displayRank={index + 1}
                  item={result}
                  Component={Component}
                  MushroomButton={MushroomButton}
                />
              </div>
            ))}
        {!isStacked && (
          <>
            <div>
              {topAoe?.[0].hits?.map((result: any, index: number) => {
                <div key={result.name} className="last:mb-8">
                  <ExcellenceItem
                    MushroomButton={MushroomButton}
                    item={result}
                    Component={Component}
                  />
                </div>;
              })}
            </div>
          </>
        )}
        {isStacked &&
          dataToUse?.map((item: any, index: number) => {
            const itemsToUse = isStacked ? item.results : topAoe.hits;
            return (
              <div key={index} className="col-span-12">
                {isStacked && (
                  <div className="relative bg-muted px-4 py-4 flex capitalize items-center gap-2 text-lg font-semibold text-muted-foreground mt-2 mb-5 ">
                    {/* <span className="capitalize">{hub}</span>
                    <SlashIcon className="h-4 w-4 mx-1" /> */}
                    <Button
                      className="absolute right-2  capitalize_ text-md"
                      size="sm"
                      variant={"ghost"}
                      asChild
                    >
                      <Link
                        className=" capitalize_"
                        href={`/explore/${hub}?pt=${getPrimaryTagsFromTags(item.tags)[0]}&t3=${getLevel3TagsFromTags(item.tags)[0]}`}
                      >
                        {/* {hub} {getLevel3TagsFromTags(item.tags)[0]} Roundup */}
                        view all
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    {item.tags.map((tag: string, index: number) => (
                      <>
                        <span className="flex items-center gap-0 capitalize">
                          {index === item.tags?.length - 1 ? (
                            <BadgeCheckIcon className="h-5 w-5 mr-1.5 text-blue-500 opacity-80" />
                          ) : (
                            ""
                          )}
                          {tag}
                        </span>
                        <SlashIcon className="h-4 w-4 mx-1 last:hidden" />
                      </>
                    ))}
                  </div>
                )}
                <div>
                  {itemsToUse
                    .filter((item: any) => !!item.reason)
                    .slice(0, 2)
                    .map((result: any) => {
                      return (
                        <>
                          <div
                            key={result.name}
                            className="mt-6 last:mb-8 flex flex-col gap-8"
                          >
                            {/* <ExcellenceItem
                              item={result}
                              Component={Component}
                            /> */}
                            {/* {JSON.stringify(result)} */}
                            <Reason
                              id={result.objectID}
                              description={result?.reason || ""}
                              name={result.parent?.name || ""}
                              rating={result.rating}
                              tags={item.tags}
                              profileId={result.parentId}
                              photoUrlAside={
                                result?.photoUrl
                                  ? result.parent?.parentPhotoUrl
                                  : undefined
                              }
                              isForceRatingToShow
                              photoUrl={
                                result?.photoUrl ||
                                result.parent?.parentPhotoUrl
                              }
                            ></Reason>
                          </div>
                        </>
                      );
                    })}
                </div>
                {false && isStacked && (
                  <>
                    <div className="flex justify-end -mt-8">
                      <Button
                        className="-mr-2 capitalize bg-white/90"
                        size="sm"
                        variant={"secondary"}
                        asChild
                      >
                        <Link
                          className=" capitalize"
                          href={`/explore/${hub}?pt=${getPrimaryTagsFromTags(item.tags)[0]}&t3=${getLevel3TagsFromTags(item.tags)[0]}`}
                        >
                          {/* {hub} {getLevel3TagsFromTags(item.tags)[0]} Roundup */}
                          More
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                    {/* <Separator className="mt-4 mb-8 last:hidden" /> */}
                  </>
                )}
              </div>
            );
          })}
        {/* {dataToUse.map((item, index) => {
          
        })} */}
        {false && !isStacked && (
          <div className="pt-14 pb-6">
            <SponsorRack hub={hub} />
          </div>
        )}
      </div>
    </>
  );
}

export function SideNav({
  hub,
  items,
  pt,
  st,
  resultsCount = 0,
  t3,
}: {
  hub: string;
  pt: string;
  st?: string;
  t3?: string;
  resultsCount: number;
  items: Array<any>;
}) {
  return (
    <div className="relative">
      <div className="relative flex items-end justify-between gap-2 pt-0 mt-0 pb-4 px-8 flex-wrap capitalize">
        <div className="flex flex-col items-start gap-1">
          <div className="capitalize text-lg font-medium text-muted-foreground mb-1">
            Discover excellence in {hub.replaceAll("-", " ")}
          </div>
          <div className="capitalize text-4xl font-bold flex items-center">
            {pt}
            {t3 ? <SlashIcon className="h-4 w-4 mx-6" /> : ""}{" "}
            {t3 ? (
              <>
                <span className="capitalize flex items-center capitalize">
                  <BadgeCheckIcon className="h-8 w-8 mr-3 text-blue-500 opacity-80" />
                  {t3}
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="text-muted-foreground absolute h-10 border-0 bottom-12 right-8 z-10 flex flex-row-reverse items-center gap-2">
        {/* <div className="px-4 text-muted-foreground/80">
          showing {resultsCount} items{" "}
        </div> */}
        <Separator className="h-4" orientation="vertical" />
        {/* <PresetSelector /> */}
      </div>
      <nav className="flex items-center flex-row justify-between gap-2 px-8 pt-4 pb-1">
        <h4 className="relative rounded-sm text-lg bg-muted px-4 pt-2 mt-4 pb-2 font-normal text-muted-foreground mb-0 w-full flex items-center justify-between">
          <BadgeCheckIcon className="h-5 w-5 mr-2 text-blue-500 opacity-80" />
          <strong className="font-[500] capitalize text-balance_ flex-1 block whitespace-nowrap">
            {/* Areas of Excellence */}
            {t3} excellence
          </strong>
          <div className="flex items-center gap-2">
            {/* <Button
              key={"all"}
              variant="secondary"
              className={`text-sm h-7 text-muted-foreground relative`}
              size="sm"
              asChild
            >
              <Link href={`/explore/${hub}?pt=${pt}`} replace={true}>
                {!t3 && (
                  <div className="h-4 w-4 bg-[#4c98fd] absolute -top-2 -right-1 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-4 w-4 p-0.5 text-white" />
                  </div>
                )}
                Top 10
              </Link>
            </Button> */}
            {items.sort().map((tag) => (
              <Button
                key={tag}
                variant="secondary"
                className="capitalize text-sm h-7 text-muted-foreground relative"
                size="sm"
                asChild
              >
                <Link
                  replace={true}
                  href={`/explore/${hub}?pt=${pt}&st=${pt ? "" : ""}&t3=${tag}`}
                >
                  {t3 && t3 === tag && (
                    <div className="h-4 w-4 bg-[#4c98fd] absolute -top-2 -right-1 rounded-full flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 p-0.5 text-white" />
                    </div>
                  )}
                  {tag}
                </Link>
              </Button>
            ))}
          </div>
          <div className="flex_ items-center gap-4 shrink-0 hidden">
            {/* <Separator
                orientation="vertical"
                className="bg-gray-300 h-6 ml-3"
              />
              <AnalyticsButton /> */}
          </div>
        </h4>
      </nav>
    </div>
  );
}

function StackedReason({
  id,
  description,
  name,
  rating,
  photoUrl,
  photoUrlAside,
  profileId,
  userRating,
  ratings: ratingsProp = {},
  isAnalytcisView,
  userId,
  tags = [],
  children,
  isForceRatingToShow,
  isEditable = false,
  latlng,
  showExtraPassion,
  latestBacker,
}: PropsWithChildren<{
  id?: string;
  description: string;
  name: string;
  rating: number;
  photoUrl?: string;
  photoUrlAside?: string;
  profileId: string;
  userRating?: number;
  ratings?: Record<string, number>;
  isAnalytcisView?: boolean;
  userId?: string;
  tags: string[];
  isForceRatingToShow?: boolean;
  isEditable?: boolean;
  latlng?: {
    lat: number;
    lng: number;
  };
  showExtraPassion?: boolean;
  latestBacker?: string;
}>) {
  const passionateBackers = Math.max(0, roundToInteger(rating / 8 - 1));
  return (
    <>
      <div className="py-2">
        <div className="flex items-start gap-8 relative">
          <div>
            <div className="absolute bottom-2 left-2 z-50 text-sm bg-muted_ inline-flex gap-1.5 bg-white border-1 border-gray-500 rounded-sm text-muted-foreground font-semibold px-2 py-1 items-center">
              <Image
                // id={marker.id}
                alt="vote"
                src={config.logoPath}
                width={16}
                height={16}
                className={``}
              />
              {rating}
            </div>
            {photoUrl && (
              <Image
                width="220"
                height="220"
                className="w-[220px] h-[220px] min-w-[220px] object-cover rounded-md"
                src={photoUrl}
                alt={name}
              />
            )}
          </div>

          <div className="relative flex flex-col justify-between h-full">
            <div className="pr-0 pt-2 text-md">{description}</div>

            <div className="flex items-center justify-between">
              <Button
                variant={"ghost"}
                className="relative_ -ml-10 bg-white hidden _flex flex-col min-w-10 items-center px-1  gap-0 w-12 transition-all duration-500 text-muted-foreground"
              >
                <span className="flex flex-row border-0 border-gray-500 text-sm _flex-row-reverse items-center justify-center px-4 gap-1 rounded-md">
                  <span className="text-lg font-semibold pl-0 fle">
                    {rating} mushrooms
                  </span>
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={18}
                    height={18}
                    className="hidden grayscale_ opacity-80  relative -top-px"
                  />
                </span>
              </Button>
              {/* <Button
                className="hidden absolute bottom-0 right-0 capitalize"
                size="sm"
                variant={"secondary"}
                asChild
              >
                <Link
                  href={`/explore/${getHubTagsFromTags(tags)[0]}?pt=${getPrimaryTagsFromTags(tags)[0]}&t3=${getLevel3TagsFromTags(tags)[0]}`}
                >
                  more {getPlural(getLevel3TagsFromTags(tags)[0])}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </Button> */}
            </div>
          </div>
          <div className="flex items-center justify-between pb-0 absolute bottom-0 right-0">
            <div
              className={`border rounded-md pl-4 flex items-center gap-4 font-semibold min-h-[48px] ${photoUrlAside ? "" : "pr-4"}`}
            >
              <Link
                className="text-balance max-w-[180px]"
                href={`/profile/${profileId}`}
              >
                {name}
              </Link>
              {photoUrlAside && (
                <Image
                  src={photoUrlAside}
                  width={48}
                  height={48}
                  alt={name}
                  className="border h-[48px] w-[48px] object-cover min-w-[48px] rounded-md"
                />
              )}
            </div>

            <div className="hidden _flex items-center justify-start font-semibold gap-4">
              {getPrimaryTagsFromTags(tags).map((tag) => (
                <Badge key={tag} variant={"outline"}>
                  {tag}
                </Badge>
              ))}
              {getLevel3TagsFromTags(tags).map((tag) => (
                <Badge key={tag} variant={"default"}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ExcellenceItem({ item, Component, displayRank, MushroomButton }: any) {
  return (
    <Fragment key={item.id}>
      <div key={item.id} className="py-2">
        <Component
          displayRank={displayRank}
          showExtraPassion={false}
          description={item.reason}
          name={item.parent?.name}
          profileId={item.parentId}
          rating={Math.max(2, roundToInteger(item.rating))}
          tags={item._tags}
          photoUrlAside={
            item.photoUrl && !item._tags?.includes("person")
              ? item.parent?.parentPhotoUrl
              : undefined
          }
          photoUrl={item.photoUrl || item.parent?.parentPhotoUrl}
          id={item.objectID}
          isForceRatingToShow
          // latestBacker={backers[index % 10]}
        >
          <Suspense fallback={<div>loading...</div>}>
            <MushroomButton
              excellenceId={item.objectID}
              profileId={item.parentId}
            />
          </Suspense>
        </Component>
        <div
          key={item.id}
          className="flex_ hidden items-start gap-4 mb-4 mt-4 px-0 flex-1"
        >
          <Image
            src={item.photoUrl || item.parent?.parentPhotoUrl}
            width={220}
            height={220}
            alt={item.parent?.name}
            className="h-[220px] w-[220px] object-cover min-w-[220px] rounded-md"
          />
          <div key={item.id} className="relative py-2">
            <strong>{item.parent?.name}</strong>{" "}
            {getPrimaryTagsFromTags(item._tags).map((tag) => (
              <Badge
                key={tag}
                variant={
                  tagDefinitions[tag]?.level === 3 ? "default" : "outline"
                }
                className="border-muted-foreground/50 rounded-sm mx-2"
              >
                {tag}
              </Badge>
            ))}{" "}
            {item.reason} |{" "}
            <Link href={`/profile/${item.parentId}`}>View Profile</Link>
          </div>
          <div className="relative p-2 h-[80px] text-muted-foreground rounded-md border border-muted-foreground/30 bg-gray-200/50 flex flex-col items-center justify-center gap-0 top-0 right-0 font-semibold ">
            <div className="hidden absolute w-6 h-6 _flex items-center justify-center -top-2 -right-2 bg-white rounded-full">
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
    </Fragment>
  );
}
