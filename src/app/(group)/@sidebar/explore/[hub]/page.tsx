import { PropsWithChildren, Suspense } from "react";
import ExcellenceItems from "./ExcellenceItems";
import ProfilesByCategory from "@/app/(group)/explore/[hub]/ProfilesByCategory";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { searchProfilesByCategory } from "@/lib/search";
import CategorySelector from "./CategorySelector";

export default async function Page({
  params: { hub },
  searchParams: { pt, st, t3, catalog },
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  const profilesByCategory = await searchProfilesByCategory(hub);
  const neighbors = [
    "arlington-ma",
    "boston",
    "cambridge-ma",
    "medford-ma",
    "somerville-ma",
  ];

  if (hub) {
    // && pt
    return (
      <div className="mt-8">
        <div className="px-8 mb-8">
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
        <div className="px-8 text-xl font-semibold capitalize">
          {hub} Profiles
        </div>
        {<ProfilesByCategory hub={hub} st={st} t3={t3} isShowAll={false} />}
      </div>
    );
  }
  return (
    <>
      <ExcellenceItems hub={hub} pt={pt} st={st} t3={t3} isStacked />
    </>
  );
}
