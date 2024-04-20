import { PropsWithChildren, Suspense } from "react";
import Image from "next/image";
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
import { SlashIcon } from "lucide-react";

export default async function Page({
  params: { hub },
  searchParams: { pt, st, t3, catalog },
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
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
            {/* <p className="text-muted-foreground w-[240px] mb-4 -mr-2">
              <CommandMenu />
            </p> */}
            <div className="grid md:grid-cols-12 gap-1">
              {neighbors.map((neighbor: any) => (
                <Button
                  key={neighbor}
                  className="col-span-3 relative"
                  size="sm"
                  variant="outline"
                  asChild
                >
                  <Link
                    href={`/explore/${neighbor}?${ptUrlParam}${t3UrlParam}`}
                  >
                    {neighbor}
                  </Link>
                </Button>
              ))}
            </div>
            <Separator className="h-px bg-gray-300 my-6" />
            <Suspense>
              <CategorySelector profilesByCategory={profilesByCategory} />
            </Suspense>
            <Separator className="h-px bg-gray-300 my-6" />
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
        {!catalog && hub && pt && (
          <div className="sticky top-24">
            <h2 className="px-8 pb-6 flex items-center justify-start font-semibold text-lg capitalize">
              {hub.replace(/[-_]/g, ", ")} Profiles
              <SlashIcon className="h-4 w-4 mx-4" />
              <span>{pt || "..."}</span>
              <SlashIcon className="h-4 w-4 mx-4" />
              <span>{t3 || "Top 10"}</span>
            </h2>
            <div className=" px-8 text-xl font-semibold capitalize grid grid-cols-12 gap-4">
              {Object.keys(profileMap).map((id, i) => (
                <div
                  key={i}
                  className="col-span-4  min-h-36 w-full h-full text-sm flex items-center justify-center"
                >
                  {profileMap[id].parentPhotoUrl && (
                    <div className="w-full h-auto flex flex-col items-center gap-2">
                      <Image
                        width="120"
                        height="120"
                        className="w-full h-full object-cover min-w-full min-h-full"
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
