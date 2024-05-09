import { searchTopAoeByCategory, searchTopAoeByRadius } from "@/lib/search";
// import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import Link from "next/link";
import Marker from "./FoobarMarker";
import MapPosition from "./MapPosition";
import { fetchProfile } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import { isHubHomepage } from "@/lib/utils";

export function generateStaticParams() {
  // TODO: may not be needed
  return [];
}

const bgColor = "bg-[#4c98fd]";

export default async function Page({
  params: { hub, pt, t3, distance, pg },
}: any) {
  const hubProfile = await fetchProfile(hub);
  const topProfiles =
    typeof distance !== "undefined" && Number(distance) !== 0
      ? await searchTopAoeByRadius(
          hub,
          Number(distance),
          ["place", pt, t3].filter((tag) => tag !== "index"),
          10,
          5,
          pg,
          true,
          `${hubProfile._geoloc.lat}, ${hubProfile._geoloc.lng}`
        )
      : await searchTopAoeByCategory(hub, [
          ["place", t3, pt].filter((tag) => tag !== "index"),
        ]);
  const { hits } = topProfiles?.[0];
  const uniqueMarkersMap = hits
    ?.filter((hit: any) => !!hit._geoloc)
    ?.filter((hit: any) => (pt !== "index" && t3 !== "index" ? true : false))
    ?.reduce(
      (acc: any, hit: any) => {
        return { ...acc, [hit.parentId]: hit };
      },
      {
        [hubProfile.id]: {
          ...hubProfile,
          objectID: hubProfile.id,
          isCity: true,
          reason: hubProfile?.neighbors ? (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="border-0 font-semibold">
                Neighboring Cities
              </Badge>
              {hubProfile?.neighbors.map((id: string) => (
                <Badge key={id} variant={"outline"}>
                  <Link href={`/foobar/${id}`}>{id}</Link>
                </Badge>
              ))}
            </div>
          ) : (
            ""
          ),
        },
      }
    );

  const markers = Object.values(uniqueMarkersMap || {}) || [];
  console.log("uniqueMarkersMap", distance, uniqueMarkersMap);

  return (
    <>
      {!isHubHomepage({ hub, pt, t3 }) && (
        <div className="border border-gray-100/0 shadow-sm opacity-100 bg-blue-500 flex gap-2 items-center text-base text-white px-3 py-1 absolute top-4 right-4 z-10 rounded-full">
          {pt} <span>/</span>{" "}
          <span className="flex items-center gap-1">
            <BadgeCheckIcon className="h-4 w-4 text-white" /> {t3}
          </span>
        </div>
      )}
      <MapPosition
        hub={hub}
        distance={distance}
        hubName={hubProfile?.name}
        markers={markers}
      >
        {markers.map((hit: any, index: number) => {
          const size = getMarkerSizeFromRating(Number(hit.rating));
          return (
            <Marker
              key={hit.objectID}
              id={hit.objectID}
              position={hit._geoloc}
              title={hit?.parent?.name || hit.name}
              photoUrl={hit.photoUrl}
              excellence={hit.reason}
            >
              <div
                style={{
                  width: size,
                  height: size,
                }}
                className={`relative z-[999] animate-fadeIn drop-shadow-md_ border-4 ${!hit.isCity ? bgColor + "  rounded-full" : "bg-black rounded-md"}  border-white origin-bottom-right transition-all duration-500  flex gap-0.5 items-center justify-center `}
              ></div>
            </Marker>
          );
        })}
      </MapPosition>
    </>
  );
}

export function getMarkerSizeFromRating(rating: number) {
  if (rating > 10 && rating < 40) {
    return 32;
  }
  if (rating >= 40) {
    return 40;
  }
  return 24;
}
