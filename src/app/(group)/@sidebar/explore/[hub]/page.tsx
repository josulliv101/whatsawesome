import { PropsWithChildren, Suspense } from "react";
import ExcellenceItems from "./ExcellenceItems";
import ProfilesByCategory from "@/app/(group)/explore/[hub]/ProfilesByCategory";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { searchProfilesByCategory } from "@/lib/search";
import CategorySelector from "./CategorySelector";
import { CommandMenu } from "@/components/CommandMenu";

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
  // return null;
  if (hub) {
    // && pt
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
                  <Link href={`/explore/${neighbor}?${pt ? "pt=" + pt : ""}`}>
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

          {<ProfilesByCategory hub={hub} st={st} t3={t3} isShowAll={false} />}
        </div>
        <div className="sticky top-24">
          <div className=" px-8 text-xl font-semibold capitalize grid grid-cols-12 gap-4">
            {[...new Array(12)].map((_, i) => (
              <div
                key={i}
                className="col-span-4 bg-gray-200 min-h-36 text-sm flex items-center justify-center"
              >
                {hub} profile {i + 1}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <ExcellenceItems hub={hub} pt={pt} st={st} t3={t3} isStacked />
    </>
  );
}
