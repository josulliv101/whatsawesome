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
import { BadgeCheckIcon, CheckIcon, SlashIcon } from "lucide-react";

export function toSearchParamsUrl(params: Record<string, string> = {}) {
  return Object.keys(params).reduce((acc, key) => {
    if (!!key) {
      return `${acc}&${key}=${params[key]}`;
    }
    return acc;
  }, "?");
}

export default async function Page({
  params: { hub },
  searchParams,
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  const { pt, st, t3, catalog, searchRadius = "5" } = searchParams;
  const topProfiles = await searchTopAoeByCategory(hub, [[t3, pt]]);

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
        <div className="mt-8">
          <div className="px-8 mb-8">
            {/* <p className="text-xl text-muted-foreground mb-4">Search</p> */}

            <p className="text-muted-foreground w-full mb-4">
              <CommandMenu />
            </p>
            <ToggleGroup
              className="mb-0 justify-start grid grid-cols-12"
              type="single"
              value={searchRadius}
            >
              {[0, 5, 20, 50].map((miles) => (
                <ToggleGroupItem
                  key={miles}
                  variant={"default"}
                  className="group relative col-span-3 text-center capitalize data-[state=on]:bg-blue-500_ data-[state=on]:text-white_ aria-checked:bg-blue-500_ border_ border-transparent_ "
                  value={String(miles)}
                  asChild
                >
                  <Link
                    className="block py-4  min-h-10 text-balance aria-checked:bg-blue-500_  aria-checked:text-white_ aria-checked:border-muted-foreground/50_"
                    href={toSearchParamsUrl({
                      ...searchParams,
                      searchRadius: miles,
                    })}
                  >
                    {miles === 0 && `only ${hub}`}
                    {miles === 5 && `near ${hub}`}
                    <span className="text-xs">
                      {miles > 5 && `within ${miles} miles`}
                    </span>
                    <div className="group-aria-checked:block hidden h-4 w-4 bg-[#4c98fd] absolute top-0 right-1 rounded-full  items-center justify-center">
                      <CheckIcon className="h-4 w-4 p-0.5 text-white" />
                    </div>
                  </Link>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Separator className="h-px bg-gray-300 my-6 mb-10" />

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

        {!catalog && hub && (
          <div className="sticky top-24">
            <h2 className="px-8 pb-8 flex items-center justify-between font-semibold text-2xl capitalize">
              <div className="flex items-center mt-4">
                {/* Top {hub.replace(/[-_]/g, ", ")} Profiles */}
                Top Profiles{" "}
                {!t3 && <span>&nbsp;in {hub.replace(/[-_]/g, ", ")}</span>}
                {t3 && (
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
                  <Link href={`?catalog=true`}>View All</Link>
                </span>
              )}
            </h2>
            <div className=" px-8 text-xl font-semibold capitalize grid grid-cols-12 gap-4">
              {Object.keys(profileMap).map((id, i) => (
                <div
                  key={i}
                  className="col-span-4  min-h-36 w-full h-full text-sm flex items-center justify-center"
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
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <ExcellenceItems hub={hub} pt={pt} st={st} t3={t3} isStacked />
    </>
  );
}
