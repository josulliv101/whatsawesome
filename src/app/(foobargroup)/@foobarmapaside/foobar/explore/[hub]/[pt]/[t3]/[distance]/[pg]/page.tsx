import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fetchProfile } from "@/lib/firebase";
import { searchTopAoeByCategory, searchTopAoeByRadius } from "@/lib/search";
import { isHubHomepage } from "@/lib/utils";
import Link from "next/link";
import { config } from "@/lib/config";
import {
  BadgeCheckIcon,
  SearchIcon,
  SparkleIcon,
  SparklesIcon,
  TelescopeIcon,
} from "lucide-react";
import MenuUserOptions from "./MenuUserOptions";
import SearchButton from "./SearchButton";

export default async function Page({
  params: { hub, pt, t3, distance, pg },
}: any) {
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

  const { hits } = topProfiles[0];
  const parentMap = hits?.reduce((acc, hit) => {
    return {
      ...acc,
      [hit.parentId]: hit,
    };
  }, {});

  // console.log("parentMap", parentMap);

  // if (hits.length && pt !== "index") {
  //   return (
  //     <aside className="w-[360px] flex flex-col flex-wrap gap-0 max-h-[360px] items-center justify-between p-0 relative bg-gray-200 border-r border-gray-300">
  //       {Object.values(parentMap).map((hit) => {
  //         return (
  //           <div className="w-1/2 h-1/3 ">
  //             <Image
  //               src={hit.parent?.parentPhotoUrl}
  //               alt={hit.parentId + " foo"}
  //               width="240"
  //               height="240"
  //               className="object-cover h-full"
  //             />
  //           </div>
  //         );
  //       })}
  //     </aside>
  //   );
  // }
  return (
    <aside className="w-[28vw] min-w-[320px] flex flex-col items-center justify-between pb-4 bg-gray-200 border-r border-gray-300">
      <div className="bg-gray-100 flex gap-2 items-center justify-between text-xs w-full border-b border-gray-300 pt-2 px-4 min-h-[36px] pb-2">
        <div className="flex items-center">
          <Link href="/">
            <img
              className="w-4 h-4 relative mr-0.5"
              src={config.logoPath}
              width="24"
              height="24"
            />
          </Link>{" "}
          <div className="flex items-center gap-2 opacity-75">
            <span className="opacity-20 pl-1.5">/</span>
            {/* <span className="opacity-70">20 Mushrooms</span>
          <span className="opacity-20">/</span> */}
            <span className="opacity-70">Boston, MA</span>
          </div>
        </div>
        <SearchButton />
      </div>
      <div className="px-4 h-full flex flex-col justify-between">
        {true && (
          <>
            <p className="text-gray-600 text-sm leading-relaxed pt-8">
              Discover what&#39;s good in the world around you with{" "}
              <span className="text-gray-700 opacity-100 font-semibold">
                20 Mushrooms &mdash;{" "}
              </span>
              is a leading AI-driven recommendation engine.
            </p>
            <MenuUserOptions />
            {false && hubProfile.name && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"default"}
                    size="lg"
                    className="text-2xl px-4 py-10 w-full"
                    asChild
                  >
                    <Link href={`/explore/foobar/${hub}`}>
                      {hubProfile.name}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={20}>
                  <p>View {hubProfile.name} Profile</p>
                </TooltipContent>
              </Tooltip>
            )}
          </>
        )}
      </div>

      {/* {false && !isHubHomepage({ hub, pt, t3 }) && (
        <div className=" w-full h-full grid grid-cols-12 gap-x-1 gap-y-1">
          {[...new Array(9)].map((_) => (
            <div className="bg-gray-50 col-span-4 aspect-square"></div>
          ))}
        </div>
      )} */}
    </aside>
  );
}
