import { Button } from "@/components/ui/button";
import { fetchProfile } from "@/lib/firebase";
import { searchTopAoeByCategory, searchTopAoeByRadius } from "@/lib/search";
import { isHubHomepage } from "@/lib/utils";
import Link from "next/link";

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
          5,
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

  console.log("parentMap", parentMap);

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
    <aside className="w-[28vw] min-w-[320px] flex flex-col items-center justify-between p-8 relative bg-gray-200 border-r border-gray-300">
      {true && (
        <>
          <p>
            <span className="font-semibold">Blue Mushroom</span> — the leading
            platform in discovering excellence in the world around you.
            {hits.length}
          </p>
          {hubProfile.name && (
            <Button size="lg" className="text-2xl px-4 py-10 w-full" asChild>
              <Link href={`/foobar/${hub}`}>{hubProfile.name}</Link>
            </Button>
          )}
        </>
      )}
      {false && !isHubHomepage({ hub, pt, t3 }) && (
        <div className=" w-full h-full grid grid-cols-12 gap-x-1 gap-y-1">
          {[...new Array(9)].map((_) => (
            <div className="bg-gray-50 col-span-4 aspect-square"></div>
          ))}
        </div>
      )}
    </aside>
  );
}
