import FoobarMap from "@/app/(foobargroup)/foobar/[hub]/[pt]/[t3]/[distance]/FoobarMap";
import { Button } from "@/components/ui/button";
import { searchTopAoeByCategory, searchTopAoeByRadius } from "@/lib/search";
// import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import Link from "next/link";
import Marker from "./FoobarMarker";
import MapPosition from "./MapPosition";
import { fetchProfile } from "@/lib/firebase";

export function generateStaticParams() {
  // TODO: may not be needed
  return [];
}

const bgColor = "bg-[#4c98fd]";

export default async function Page({ params: { hub, pt, t3, distance } }: any) {
  const hubProfile = await fetchProfile(hub);
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
      : await searchTopAoeByCategory(hub, [[t3, pt]]);
  const { hits } = topProfiles?.[0];
  const uniqueMarkersMap = hits?.reduce((acc: any, hit: any) => {
    return { ...acc, [hit.parentId]: hit };
  }, {});

  const markers = Object.values(uniqueMarkersMap || {}) || [];
  console.log("uniqueMarkersMap", distance, uniqueMarkersMap);

  return (
    <>
      <MapPosition markers={markers}>
        {markers.map((hit: any, index: number) => {
          const size = getMarkerSizeFromRating(Number(hit.rating));
          return (
            <Marker
              key={hit.objectID}
              id={hit.objectID}
              position={hit._geoloc}
              title={hit.parent.name}
              photoUrl={hit.photoUrl}
              excellence={hit.reason}
            >
              <div
                style={{
                  width: size,
                  height: size,
                }}
                className={`relative z-[999] animate-fadeIn drop-shadow-md_ ${true ? bgColor + " border-4" : ""}  border-white ${false ? "rounded-md" : "rounded-full"} origin-bottom-right transition-all duration-500  flex gap-0.5 items-center justify-center `}
              ></div>
            </Marker>
          );
        })}
      </MapPosition>
    </>
  );
}

function getMarkerSizeFromRating(rating: number) {
  if (rating > 10 && rating < 40) {
    return 32;
  }
  if (rating >= 40) {
    return 40;
  }
  return 24;
}
