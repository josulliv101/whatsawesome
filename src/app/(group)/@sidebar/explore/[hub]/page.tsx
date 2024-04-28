import { PropsWithChildren, Suspense } from "react";
import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ExcellenceItems from "./ExcellenceItems";
import ProfilesByCategory from "@/app/(group)/explore/[hub]/ProfilesByCategory";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { searchProfilesByCategory, searchTopAoeByCategory } from "@/lib/search";
import CategorySelector from "./CategorySelector";
import { CommandMenu } from "@/components/CommandMenu";
import { config } from "@/lib/config";
import { BadgeCheckIcon, CheckIcon, SlashIcon, Slice } from "lucide-react";
import { fetchProfile } from "@/lib/firebase";
import ProfileList from "./ProfileList";
import { getLevel3TagsFromTags, getPrimaryTagsFromTags } from "@/lib/tags";
import { roundToInteger } from "@/lib/utils";

function truncateString(str: string, maxLength: number) {
  // Check if the string length is less than or equal to the maxLength
  if (str.length <= maxLength) {
    return str;
  }

  // Find the last space before maxLength
  const lastSpaceIndex = str.lastIndexOf(" ", maxLength);

  // If there's no space, truncate at maxLength to avoid cutting a word in the middle
  if (lastSpaceIndex === -1) {
    return str.slice(0, maxLength) + "...";
  }

  // Return the substring from the beginning to the last space
  return str.slice(0, lastSpaceIndex) + "...";
}

export function toSearchParamsUrl(params: Record<string, string> = {}) {
  return Object.keys(params).reduce((acc, key) => {
    if (!!key) {
      return `${acc}&${key}=${params[key]}`;
    }
    return acc;
  }, "?");
}

const NEAR_RADIUS = "4";
export default async function Page({
  params: { hub },
  searchParams,
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  const { pt, st, t3, catalog, searchRadius = NEAR_RADIUS } = searchParams;
  const topProfiles = await searchTopAoeByCategory(hub, [[t3, pt]]);
  const profile = await fetchProfile(hub);
  const profilesByCategory = await searchProfilesByCategory(hub);
  const neighbors = [
    "arlington-ma",
    "boston",
    "cambridge-ma",
    "medford-ma",
    "somerville-ma",
  ];
  // return null;
  const profileMap = topProfiles
    .map((category) => category.hits || [])
    .flat()
    .reduce((acc, hit) => {
      return {
        ...acc,
        [hit.parent.id]: hit.parent,
      };
    }, {});

  if (hub) {
    // && pt
    const t3UrlParam = t3 ? `&t3=${t3}` : "";
    const ptUrlParam = pt ? `&pt=${pt}` : "";
    return (
      <>
        <div className="">
          <p className="bg-blue-100/50 px-8 text-muted-foreground_ w-full py-8">
            <CommandMenu />
          </p>
          <Separator className="h-px bg-gray-300 mb-8" />
          <div className="px-8 mb-8">
            {/* <p className="text-xl text-muted-foreground mb-4">Search</p> */}

            {true && (
              <>
                <div className="flex items-center justify-between w-full mb-4 font-semibold text-md capitalize text-muted-foreground">
                  Search Area{" "}
                  <span className="font-normal text-sm">change location</span>
                </div>

                <ToggleGroup
                  className="mb-8 justify-start grid grid-cols-12 gap-2"
                  type="single"
                  value={searchRadius}
                >
                  {[0, NEAR_RADIUS, 20, 50].map((miles) => (
                    <ToggleGroupItem
                      key={miles}
                      variant={"default"}
                      className="group border border-gray-300 bg-gray-200 hover:bg-gray-200 py-4 relative col-span-3 text-center capitalize data-[state=on]:bg-blue-500_ data-[state=on]:text-white_ aria-checked:bg-blue-500_  "
                      value={String(miles)}
                      asChild
                    >
                      <Link
                        className="text-xs block py-4 min-h-10 text-balance aria-checked:bg-blue-500_  aria-checked:text-white_ aria-checked:border-muted-foreground/50_"
                        href={toSearchParamsUrl({
                          ...searchParams,
                          searchRadius: miles,
                        })}
                      >
                        {miles === 0 && `in ${hub.replace("-", ", ")}`}
                        {miles === NEAR_RADIUS &&
                          `near ${hub.replace("-", ", ")}`}
                        <span className="text-xs">
                          {miles > NEAR_RADIUS && `within ${miles} miles`}
                        </span>
                        <div className="group-aria-checked:block hidden h-4 w-4 bg-[#4c98fd] absolute -top-1 -right-1 rounded-full  items-center justify-center">
                          <CheckIcon className="h-4 w-4 p-0.5 text-white" />
                        </div>
                      </Link>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </>
            )}
            {!pt && (
              <>
                <div className="pt-2 flex items-center justify-between w-full mb-8 font-semibold text-md capitalize text-muted-foreground">
                  <div className="flex items-center">
                    {hub} <SlashIcon className="h-4 w-4 mx-4" /> Recommended
                    <span className="font-normal text-sm"></span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-x-0 gap-y-6">
                  {topProfiles?.map((category) => {
                    const foo = category.hits
                      .filter(
                        (hit) => !!hit?.photoUrl && !!hit.parent?.parentPhotoUrl
                      )
                      .sort((a, b) => {
                        return Number(a.rating) - Number(b.rating);
                      })
                      .slice(0, 6)
                      .reduce((acc, hit) => {
                        return {
                          ...acc,
                          [getLevel3TagsFromTags(hit._tags)[0]]: hit,
                        };
                      }, {});

                    return Object.values(foo).map((hit, index) => {
                      const isEven = index % 2 === 0;
                      const t3Tags = getLevel3TagsFromTags(hit._tags);
                      const primaryTags = getPrimaryTagsFromTags(hit._tags);
                      const spot1 = (
                        <Link
                          href={`/explore/${hub}?pt=${primaryTags[0]}&t3=${t3Tags[0]}`}
                          className="block col-span-6 "
                        >
                          <div className="relative aspect-square bg-gray-100">
                            <Image
                              src={hit.photoUrl}
                              alt=""
                              className="w-full object-cover aspect-square"
                              width="200"
                              height="200"
                            />

                            <Image
                              src={hit.parent?.parentPhotoUrl}
                              alt=""
                              className={`w-20 border border-gray-50 bg-gray-50 absolute -bottom-1 ${true ? "-right-1" : "-left-1"} rounded-md object-cover aspect-square`}
                              width="200"
                              height="200"
                            />
                          </div>
                        </Link>
                      );
                      const spot2 = (
                        <Link
                          href={`/explore/${hub}?pt=${primaryTags[0]}&t3=${t3Tags[0]}`}
                          className="block col-span-6"
                        >
                          <div className=" text-muted-foreground px-6 py-4 bg-gray-50 relative border aspect-square">
                            <div className="font-semibold text-lg mb-4">
                              {hit.parent?.name}
                            </div>
                            <p className="text-lg">
                              {truncateString(hit.reason, 86)}
                            </p>
                            <div className="absolute p-4 bottom-0 left-0 flex items-center justify-between w-full">
                              <Badge
                                variant={"outline"}
                                className="relative border-0 -left-0 flex gap-1 capitalize"
                              >
                                <BadgeCheckIcon
                                  className={`h-4 w-4 mr-1  text-blue-500 opacity-80`}
                                />{" "}
                                {t3Tags}
                              </Badge>
                              <div className="flex items-center gap-2 pr-2">
                                <Image
                                  // id={marker.id}
                                  alt="vote"
                                  src={config.logoPath}
                                  width={16}
                                  height={16}
                                  className={``}
                                />
                                {roundToInteger(hit.rating)}
                              </div>
                            </div>
                            {/* <Image
                            src={hit.parent?.parentPhotoUrl}
                            alt=""
                            className={`w-24 border border-gray-50 absolute -bottom-1 ${isEven ? "-right-1" : "-left-1"} rounded-md object-cover aspect-square`}
                            width="200"
                            height="200"
                          /> */}
                          </div>
                        </Link>
                      );
                      return <>{false ? [spot1, spot2] : [spot2, spot1]}</>;
                    });
                  })}
                </div>
              </>
            )}

            {/* {profile.neighbors && false && (
              <div className="flex items-center justify-end">
                <Badge variant={"secondary"}>neighbors</Badge>

                {profile.neighbors.map((neighbor) => (
                  <Badge
                    key={neighbor}
                    className="border-muted-foreground/30"
                    variant={"outline"}
                  >
                    {neighbor.split("-")[0]}
                  </Badge>
                ))}
              </div>
            )} */}
            {/* {pt && <Separator className="h-px bg-gray-300 my-6 mb-10" />} */}

            {/* <Tabs
              defaultValue="aoe"
              className="w-full_ absolute_ _top-2 _right-2"
            >
              <div className="flex items-center justify-start px-0 py-0 mb-4">
                <TabsList className="h-[48px]">
                  <TabsTrigger
                    value="aoe"
                    className="aria-selected:bg-white h-[48px] px-6 text-xl"
                    asChild
                  >
                    <Link href="?">
                      <BadgeCheckIcon className="h-6 w-6 mr-2.5 text-blue-500 opacity-80 " />{" "}
                      Areas of Excellence
                    </Link>
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="aria-selected:bg-white h-[48px] px-6 text-xl"
                    asChild
                  >
                    <Link href="?catalog=true">Browse Profiles</Link>
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="account">as</TabsContent>
              <TabsContent value="password">aa</TabsContent>
            </Tabs> */}

            {/* <p className="text-xl text-muted-foreground mb-4">Categories</p> */}
            <Suspense>
              <CategorySelector profilesByCategory={profilesByCategory} />
            </Suspense>
          </div>
          {/* <ProfilesByCategory
          hub={hub}
          pt={pt}
          st={st}
          t3={t3}
          isStacked
          isShowAll={true}
        />
        <Separator className="my-8" /> */}

          {/* {<ProfilesByCategory hub={hub} st={st} t3={t3} isShowAll={false} />} */}
        </div>
        {catalog && (
          <div className="mt-8 px-8 mb-8">
            info here related to category profiles
          </div>
        )}

        {false && !catalog && hub && pt && (
          <div className="sticky top-24">
            <h2 className="px-8 pb-8 flex items-center justify-between font-semibold text-md capitalize">
              <div className="flex items-center mt-0 text-muted-foreground">
                {/* Top {hub.replace(/[-_]/g, ", ")} Profiles */}
                {t3 && (
                  <>
                    Top Profiles <SlashIcon className="h-4 w-4 mx-4" /> Results
                  </>
                )}
                {!t3 && (
                  <>
                    Top Profiles
                    <SlashIcon className="h-4 w-4 mx-4" />
                    <span>{hub.replace(/[-_]/g, ", ")}</span>
                  </>
                )}
                {false && t3 && (
                  <>
                    <SlashIcon className="h-4 w-4 mx-4" />
                    <span>{pt || "..."}</span>
                    <SlashIcon className="h-4 w-4 mx-4" />
                    <span>{t3 || "Top 10"}</span>
                  </>
                )}
              </div>
              {!t3 && (
                <span className="text-sm">
                  <Link href={`?catalog=true`}>View All Profiles</Link>
                </span>
              )}
            </h2>
            {/* <div className=" px-8 text-xl font-semibold capitalize grid grid-cols-12 gap-4">
              {Object.keys(profileMap).map((id, i) => (
                <Link
                  href={`/profile/${id}`}
                  key={i}
                  className="col-span-3  min-h-36 w-full h-full text-sm flex items-start justify-center"
                >
                  {profileMap[id].parentPhotoUrl && (
                    <div className="w-full h-auto flex flex-col items-center gap-2 rounded-md">
                      <Image
                        width="120"
                        height="120"
                        className="w-full h-full object-cover min-w-full min-h-full rounded-md"
                        src={profileMap[id].parentPhotoUrl}
                        alt=""
                      />
                      <div className=" text-balance text-center">
                        {profileMap[id].name}
                      </div>
                    </div>
                  )}
                  {!profileMap[id].parentPhotoUrl && (
                    <div className="text-xl text-white h-full w-full text-center bg-black text-balance p-4 flex items-center justify-center">
                      {profileMap[id].name}
                    </div>
                  )}
                </Link>
              ))}
            </div> */}
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <ExcellenceItems
        profileMap={profileMap}
        hub={hub}
        pt={pt}
        st={st}
        t3={t3}
        isStacked
      />
    </>
  );
}
