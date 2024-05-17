import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  getCacheTagFromParams,
  searchTopAoeByCategory,
  searchTopAoeByRadius,
} from "@/lib/search";
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
import {
  BadgeCheckIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2,
} from "lucide-react";
import Rating from "./Rating";
import Foobar from "./Foobar";
import { cookies } from "next/headers";
import { getLevel3TagsFromTags, getPrimaryTagsFromTags } from "@/lib/tags";
import Breadcrumb from "./Breadcrumb";
import { isHubHomepage } from "@/lib/utils";
import ProfilePageContent from "@/app__/profile/[...id]/ProfilePageContent";
import SearchResultLogos from "./SearchResultLogos";
import { Separator } from "@/components/ui/separator";
import NavBar from "./NavBar";
import SearchLogoTabs from "./SearchLogoTabs";
import AreasOfExcellenceBar from "./AreasOfExcellenceBar";
import { Badge } from "@/components/ui/badge";
import MapRolloversButton from "./MapRolloversButton";
import { ResultsLabelContextProvider } from "@/components/ResultsLabel";

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
  params: { hub, pt, t3, distance, pg },
}: any) {
  console.log("rendering page", { hub, pt, t3, distance, pg });
  const hubProfile = await fetchProfile(hub);
  const pageParam =
    (typeof pg === "number" && pg) ||
    (typeof pg === "string" && pg && pg !== "index")
      ? Number(pg)
      : 0;
  const topProfiles =
    typeof distance !== "undefined" && Number(distance) !== 0
      ? await searchTopAoeByRadius(
          hub,
          Number(distance),
          ["place", pt, t3].filter((tag) => tag !== "index"),
          10,
          10,
          pageParam,
          true,
          `${hubProfile._geoloc.lat}, ${hubProfile._geoloc.lng}`
        )
      : await searchTopAoeByCategory(hub, [
          ["place", t3, pt].filter((tag) => tag !== "index"),
        ]);
  const {
    hits = [],
    nbHits = 0,
    nbPages = 0,
    hitsPerPage = 0,
    page = 0,
  } = isHubHomepage({ hub, pt, t3 }) ? {} : topProfiles?.[0];
  // console.log("generateStaticParams()", { hub, pt, t3, distance });

  if (pt === "catalog") {
    return <div>Catalog page</div>;
  }
  const resultsText = `Showing results ${page * hitsPerPage + 1}-
${page * hitsPerPage + hitsPerPage} of ${nbHits}`;
  return (
    <div>
      <Breadcrumb>
        <div className="capitalize text-lg font-semibold flex items-center gap-4">
          {hubProfile.name} <span>/</span>
          {getDistanceLabel(Number(distance))}
          <span>/</span>
          {pt !== "index" && t3 !== "index" ? (
            <div className="flex items-center gap-2">
              <span>{pt}</span>
              <BadgeCheckIcon
                className={`h-5 w-5 mr-0 text-blue-500 opacity-80`}
              />
              <span>{t3}</span>
            </div>
          ) : (
            "Profile"
          )}
        </div>
        {!isHubHomepage({ hub, pt, t3 }) && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MapRolloversButton />
              {/* <Badge>Enabled</Badge> */}
            </div>

            <div className="flex items-center gap-6">
              <Button
                className={`font-semibold px-0 ${pageParam === 0 ? "opacity-50" : ""}`}
                disabled
                size="sm"
                variant={"ghost"}
                asChild
              >
                {pageParam === 99 ? (
                  <ChevronLeftIcon className="w-6 h-6 stroke-1" />
                ) : (
                  <Link
                    href={`/foobar/${hub}/${pt}/${t3}/${distance}/${Math.max(0, pageParam - 1)}`}
                  >
                    <ChevronLeftIcon className="w-6 h-6 stroke-1" />
                    Prev
                  </Link>
                )}
              </Button>
              <Button
                variant={"ghost"}
                size="sm"
                className={`font-semibold px-0 ${page < nbPages ? "opacity-100" : "opacity-50"}`}
                asChild
              >
                <Link
                  href={`/foobar/${hub}/${pt}/${t3}/${distance}/${pageParam + 1}`}
                >
                  Next <ChevronRightIcon className="w-6 h-6 stroke-1" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </Breadcrumb>
      {!isHubHomepage({ hub, pt, t3 }) && (
        <SearchResultLogos
          pg={pg}
          hits={hits}
          resultsText={resultsText}
        ></SearchResultLogos>
      )}

      {/* <NavBar>
        <div className="flex items-center gap-4 capitalize text-muted-foreground text-lg">
          <div>{hubProfile.name}</div>
          <span>/</span>
          <span>{pt}</span>
          <BadgeCheckIcon className={`h-6 w-6 mr-0 text-blue-500 opacity-80`} />
          <span>{t3}</span>
        </div>
      </NavBar> */}
      <div className="px-0 py-2 md:px-8 md:py-2 flex flex-col gap-0 rounded-lg">
        <AreasOfExcellenceBar areaOfExcellence={t3} />
        {!isHubHomepage({ hub, pt, t3 }) && (
          <div className="rounded-md bg-muted px-4 py-0 pb-6 flex flex-col gap-4">
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

                const cacheTag = getCacheTagFromParams(hub, [pt, t3], distance); // [hub, "place", pt, t3, distance].join("-");
                console.log("cache tag from page", cacheTag);
                return (
                  <ExcellenceItem
                    key={excellenceId + index}
                    name={parent.name}
                    rating={rating}
                    photoUrl={photoUrl}
                    parentTags={parent?.tags || []}
                    photoAsideUrl={parent?.parentPhotoUrl}
                    profileId={parent?.id}
                    tags={tags}
                    tagsAll={parent?.tagsAll || []}
                    rank={(pg === "index" ? 0 : Number(pg)) * 5 + index + 1}
                  >
                    <p className="peer-has-[a[data-state='delayed-open']]/tags:opacity-0 peer-has-[a[data-state='instant-open']]/tags:opacity-0 transition-all duration-300 text-muted-foreground w-full px-4 md:px-12 mt-24 md:mt-0 text-wrap md:leading-7 md:text-balance text-left md:text-center relative top-1/2 -translate-y-1/2 text-xl md:text-xl first-letter:text-4xl first-letter:pr-0.5">
                      {reason || (
                        <span className="text-muted-foreground text-base">
                          ( empty item )
                        </span>
                      )}
                    </p>
                    <p className="  z-0  top-0 left-0 absolute opacity-0 animate-fadeInQuick hidden peer-has-[a[data-state='delayed-open']]/tags:flex peer-has-[a[data-state='instant-open']]/tags:flex peer-has-[a[data-state='delayed-open']]/tags:opacity-100 peer-has-[a[data-state='instant-open']]/tags:opacity-100 transition-all duration-300 justify-center items-center  h-full text-muted-foreground w-full px-4 md:px-12 mt-24 md:mt-0 text-wrap md:leading-7 md:text-balance text-left md:text-center  text-xl md:text-xl first-letter:text-4xl first-letter:pr-0.5">
                      {parent?.description}
                    </p>
                    {/* flex justify-center bg-gray-100 items-center mx-auto min-w-0 h-24 max-h-[36px] px-0 */}
                    <div className="peer-has-[a[data-state='delayed-open']]/tags:opacity-0 peer-has-[a[data-state='instant-open']]/tags:opacity-0 transition-all duration-300 rounded-md absolute top-4 right-4 md:right-4">
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
                          cacheTag={cacheTag}
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
          </div>
        )}
        {isHubHomepage({ hub, pt, t3 }) && (
          <ProfilePageContent params={{ id: hub }} isEmbed />
        )}
      </div>
    </div>
  );
}

function getDistanceLabel(distance?: number) {
  if (distance === undefined || distance === null) {
    return "";
  }
  if (distance === 0) {
    return "in";
  }

  if (distance === 4) {
    return "near";
  }

  return `within ${distance} miles`;
}
