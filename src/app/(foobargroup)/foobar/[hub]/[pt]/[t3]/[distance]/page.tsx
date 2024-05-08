import { collectionGroup, query, where, getDocs } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { searchTopAoeByCategory, searchTopAoeByRadius } from "@/lib/search";
import Link from "next/link";
import FoobarMap from "./FoobarMap";
import {
  db,
  fetchMushroomMapForUser,
  fetchProfile,
  isMushroomPresentByUser,
} from "@/lib/firebase";
import ExcellenceItem from "./ExcellenceItem";
import { Suspense } from "react";
import RatingButton from "./RatingButton";
// import { getCurrentUser } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import Rating from "./Rating";
import Foobar from "./Foobar";
import { cookies } from "next/headers";
import { getLevel3TagsFromTags, getPrimaryTagsFromTags } from "@/lib/tags";
import Breadcrumb from "./Breadcrumb";
import { isHubHomepage } from "@/lib/utils";
import ProfilePageContent from "@/app__/profile/[...id]/ProfilePageContent";

// export const dynamic = "force-static";

export function generateStaticParams() {
  return [];
}

const navItems = [
  ["restaurant", "burger"],
  ["restaurant", "steak"],
  ["coffeehouse", "coffee"],
  ["coffeehouse", "pastries"],
];

export default async function Page({ params: { hub, pt, t3, distance } }: any) {
  const hubProfile = await fetchProfile(hub);

  const topProfiles =
    typeof distance !== "undefined" && Number(distance) !== 0
      ? await searchTopAoeByRadius(
          hub,
          Number(distance),
          ["place", pt, t3].filter((tag) => tag !== "index"),
          10,
          10,
          true,
          `${hubProfile._geoloc.lat}, ${hubProfile._geoloc.lng}`
        )
      : await searchTopAoeByCategory(hub, [
          ["place", t3, pt].filter((tag) => tag !== "index"),
        ]);
  const { hits = [] } = isHubHomepage({ hub, pt, t3 }) ? {} : topProfiles?.[0];
  console.log("generateStaticParams()", { hub, pt, t3, distance });

  if (pt === "catalog") {
    return <div>Catalog page</div>;
  }

  return (
    <>
      <Breadcrumb>
        <div className="capitalize">
          {hubProfile.name} /{" "}
          {pt !== "index" && t3 !== "index" ? `${pt} / ${t3}` : "Featured"}
        </div>
        <div>
          test {hub} {pt} {t3} {distance}
        </div>
      </Breadcrumb>

      {/* <nav className="flex flex-col md:flex-row items-center gap-2 px-8">
        {navItems.map(([pt, t3]) => {
          return (
            <Button className="w-full " key={`${pt}-${t3}`} asChild>
              <Link href={`/foobar/${hub}/${pt}/${t3}/${distance}`}>
                {pt} / {t3}
              </Link>
            </Button>
          );
        })}
      </nav> */}
      <div className="px-0 py-2 md:px-12 md:py-12 flex flex-col gap-4">
        {hits?.map(
          (
            {
              objectID: excellenceId,
              parent,
              photoUrl,
              reason,
              rating,
              _tags = [],
            }: any,
            index: number
          ) => {
            const tags = [
              ...getPrimaryTagsFromTags(_tags),
              ...getLevel3TagsFromTags(_tags),
            ];
            return (
              <ExcellenceItem
                key={excellenceId}
                name={parent.name}
                rating={rating}
                photoUrl={photoUrl}
                tags={tags}
              >
                <p className="w-full px-4 md:px-12 mt-24 md:mt-0 text-wrap md:text-balance text-left md:text-center relative top-1/2 -translate-y-1/2 text-xl md:text-2xl">
                  {reason || (
                    <span className="text-muted-foreground text-base">
                      &lt; empty item &gt;
                    </span>
                  )}
                </p>
                <div className="flex justify-center bg-black items-center mx-auto w-28 h-24 max-h-[36px] px-0 rounded-md absolute top-0 right-4 md:right-0">
                  <Suspense
                  // fallback={
                  //   <Loader2 className="h-4 w-4 animate-spin opacity-60 text-white" />
                  // }
                  >
                    <Rating
                      // rating={rating}
                      profileId={parent?.id}
                      // uid={uid}
                      excellenceId={excellenceId}

                      // mushroomMapPromise={mushroomMapPromise}
                      // deleteUidCookie={index === 0 ? deleteUidCookie : undefined}
                    />
                  </Suspense>
                </div>

                {/*<RatingButton
                rating={rating}
                profileId={parent?.id}
                excellenceId={excellenceId}
                // mushroomPromise={Promise.resolve(true)}
              /> */}
              </ExcellenceItem>
            );
          }
        )}
        {isHubHomepage({ hub, pt, t3 }) && (
          <ProfilePageContent params={{ id: hub }} isEmbed />
        )}
      </div>
    </>
  );
}
