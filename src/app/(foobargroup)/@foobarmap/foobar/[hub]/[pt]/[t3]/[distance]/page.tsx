import FoobarMap from "@/app/(foobargroup)/foobar/[hub]/[pt]/[t3]/[distance]/FoobarMap";
import { Button } from "@/components/ui/button";
import { searchTopAoeByCategory } from "@/lib/search";
// import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import Link from "next/link";
import Marker from "./FoobarMarker";
import MapPosition from "./MapPosition";

// export function generateStaticParams() {
//   return [];
// }

export default async function Page({ params: { hub, pt, t3, distance } }: any) {
  const topProfiles = await searchTopAoeByCategory(hub, [[t3, pt]]);
  const { hits } = topProfiles?.[0];
  const uniqueMarkersMap = hits.reduce((acc: any, hit: any) => {
    return { ...acc, [hit.parentId]: hit };
  }, {});

  const markers = Object.values(uniqueMarkersMap);

  return (
    <MapPosition markers={markers}>
      {Object.values(markers).map((hit: any, index: number) => (
        <Marker
          key={hit.objectID}
          position={hit._geoloc}
          title={hit.parent.name}
        />
      ))}
    </MapPosition>
  );
}
