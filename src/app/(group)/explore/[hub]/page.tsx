import { PropsWithChildren } from "react";
import ProfilesByCategory from "./ProfilesByCategory";
import ExcellenceItems from "@/app/(group)/@sidebar/explore/[hub]/ExcellenceItems";
import SponsorRack from "@/components/SponsorRack";
import {
  searchProfiles,
  searchProfilesByCategory,
  searchTopAoeByCategory,
} from "@/lib/search";
import AoeByCategory from "./AoeByCategory";
import { Separator } from "@/components/ui/separator";

// export function generateStaticParams() {
//   return [];
// }

export default async function Page({
  params: { hub },
  searchParams: { pt, st, t3, catalog, searchMapBounds },
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  // return (
  //   <div className="px-8 pt-8">
  //     {categories.map(({ nbHits, hits, query }) => {
  //       return (
  //         <div className="mb-8">
  //           <h2>
  //             <strong className="text-xl">{query}</strong> ({nbHits})
  //           </h2>
  //           {hits.map((hit) => {
  //             return <div className="mb-2">{JSON.stringify(hit)}</div>;
  //           })}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
  return (
    <>
      {catalog && (
        <ProfilesByCategory hub={hub} pt={pt} st={st} t3={t3} catalog={""} />
      )}

      {!catalog && hub && pt && (
        <ExcellenceItems
          searchMapBounds={searchMapBounds}
          hub={hub}
          pt={pt}
          st={st}
          t3={t3}
        />
      )}

      {!catalog && hub && !st && <AoeByCategory hub={hub} />}
      {!catalog && hub && !st && !t3 && (
        <Separator className="my-5 h-px bg-muted-foreground/20" />
      )}

      {!catalog && hub && !pt && !st && !t3 && (
        <div className="mt-[60px]">
          <ExcellenceItems hub={hub} pt={pt} st={st} t3={t3} isStacked isGrid />
          {/* <br />
          <br />
          <ProfilesByCategory
            hub={hub}
            pt={pt}
            st={st}
            t3={t3}
            catalog={catalog}
          />

          <div className="pt-14 pb-6 px-8">
            <SponsorRack hub={hub} />
          </div> */}
        </div>
      )}
    </>
  );
}
