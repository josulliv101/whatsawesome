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

export default async function Page({
  params: { hub, pt, t3, distance, uid },
}: any) {
  const hubProfile = await fetchProfile(hub);

  async function deleteUidCookie() {
    "use server";

    cookies().delete("uid");
  }

  const topProfiles =
    typeof distance !== "undefined" && Number(distance) !== 0
      ? await searchTopAoeByRadius(
          hub,
          Number(distance),
          [pt, t3],
          10,
          10,
          true,
          `${hubProfile._geoloc.lat}, ${hubProfile._geoloc.lng}`
        )
      : await searchTopAoeByRadius(
          hub,
          Number(1),
          [pt, t3],
          10,
          10,
          true,
          `${hubProfile._geoloc.lat}, ${hubProfile._geoloc.lng}`
        );
  // : await searchTopAoeByCategory(hub, [[t3, pt]]);
  const { hits } = topProfiles?.[0];
  console.log("generateStaticParams()", { hub, pt, t3, distance });

  if (pt === "catalog") {
    return <div>Catalog page</div>;
  }

  // const mushroomMapPromise = fetchMushroomMapForUser(uid);
  // console.log("mushroomMapPromise", mushroomMapPromise);

  return (
    <>
      <nav className="my-8 px-8 flex items-center gap-2">
        {[0, 1, 4, 8, 12, 20, 40].map((distance) => (
          <Button key={distance} variant={"outline"} asChild>
            <Link href={`/foobar/${hub}/${pt}/${t3}/${distance}`}>
              {distance}
            </Link>
          </Button>
        ))}
      </nav>
      <nav className="flex items-center gap-2 px-8">
        {navItems.map(([pt, t3]) => {
          return (
            <Button key={`${pt}-${t3}`} asChild>
              <Link href={`/foobar/${hub}/${pt}/${t3}`}>
                {pt} / {t3}
              </Link>
            </Button>
          );
        })}
      </nav>
      <div className="p-12">
        foobar: {hub} / {pt} / {t3} / {distance} / {uid}
      </div>
      <div className="p-12 flex flex-col gap-4">
        {hits.map(
          (
            { objectID: excellenceId, parent, reason, rating }: any,
            index: number
          ) => {
            return (
              <ExcellenceItem
                key={excellenceId}
                name={parent.name}
                rating={rating}
              >
                <p>{reason}</p>
                <Suspense
                  fallback={<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                >
                  <Rating
                    // rating={rating}
                    profileId={parent?.id}
                    uid={uid}
                    excellenceId={excellenceId}
                    // mushroomMapPromise={mushroomMapPromise}
                    // deleteUidCookie={index === 0 ? deleteUidCookie : undefined}
                  />
                </Suspense>
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
      </div>
    </>
  );
}
