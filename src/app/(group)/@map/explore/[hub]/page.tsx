import Image from "next/image";
import {
  fetchClaimsForHub,
  fetchHubProfiles,
  fetchProfile,
} from "@/lib/firebase";
import { tagDefinitions } from "@/lib/tags";
import { AdvancedMarker } from "./Marker";
import { config } from "@/lib/config";
import Foobar from "./Foobar";
import {
  searchProfilesByCategory,
  searchProfilesByMapBounds,
  searchTopAoeByCategory,
  searchTopAoeByMapBounds,
  searchTopAoeByRadius,
  searchTopAoeByTagFilter,
} from "@/lib/search";

function getMarkerSizeFromRating(rating: number) {
  if (rating > 10 && rating < 40) {
    return 32;
  }
  if (rating >= 40) {
    return 40;
  }
  return 24;
}

export default async function Page({
  params: { hub },
  searchParams: { pt, st, t3, bounds, catalog, searchMapBounds },
}: {
  params: any;
  searchParams: any;
}) {
  // return null;
  const query = [hub, pt, st, t3].filter((tag) => !!tag) as string[];
  let topAoe = [await searchTopAoeByRadius("hub")];
  // !pt
  //   ? await searchTopAoeByCategory(hub)
  //   : await searchTopAoeByCategory(hub, [[t3, pt]]);
  if (searchMapBounds) {
    topAoe = [await searchTopAoeByMapBounds(hub, [t3], searchMapBounds)];
    console.log("topAoe (map)", topAoe[0].hits.length);
  }
  const profilesByCategory = !pt
    ? await searchProfilesByCategory(hub)
    : await searchProfilesByCategory(hub, pt ? [pt, t3] : undefined);
  console.log("topAoe MAP", topAoe[0]?.hits);
  console.log("searchMapBounds", searchMapBounds);
  // const profile = await fetchProfile(hub);
  // const data = await fetchClaimsForHub(hub, [pt], [st], [t3]);
  // const profilesByTag = await fetchHubProfiles(
  //   hub,
  //   "place",
  //   pt ? [pt] : null,
  //   100
  // );
  // const items = tagDefinitions[pt]?.tags || [];

  // const markers = profilesByTag.profiles
  //   .filter((profile) => !!profile?.latlng && !!profile?.latlng?.latitude)
  //   .map((datum: any) => ({
  //     latlng: { lat: datum.latlng.latitude, lng: datum.latlng.longitude },
  //     id: datum.id,
  //     profileName: datum.name,
  //   }));
  const topMarkers = topAoe[0]?.hits.map((hit: any) => {
    return {
      _geoloc: hit._geoloc,
      _tags: hit._tags,
      id: hit.name,
      profileName: hit.parentId + " " + hit.rating,
      size: getMarkerSizeFromRating(10 * Number(hit.rating) || 1),
    };
  });
  // .filter((marker) => {
  //   return pt ? marker._tags.includes(t3 ? t3 : pt) : true;
  // });

  return (
    <Foobar markers={topMarkers.flat()}>
      {topMarkers.map((marker, index) => {
        const size = marker.size;
        return (
          // <Marker key={index} position={marker.latlng} />
          <AdvancedMarker
            key={marker.id}
            // ref={isActiveMarker ? markerRef : null}
            position={marker._geoloc}
            title={marker.profileName}
            // onClick={() => console.log(profile)}
          >
            <div
              style={{
                width: size,
                height: size,
                //  position: "absolute",
                top: 0,
                left: 0,
                // background: "#1dbe80",
                // border: "2px solid #0e6443",
                // borderRadius: "50%",
                // transform: "translate(-50%, -50%)",
              }}
              className={`animate-fadeIn drop-shadow-md_ bg-[#4c98fd] border-4 border-white rounded-full origin-bottom-right transition-all duration-500  flex gap-0.5 items-center `}
            >
              <Image
                // id={marker.id}
                alt="vote"
                src={config.logoPath}
                width={size}
                height={size}
                className={`relative hidden border border-muted-foreground/50 bg-white rounded-full p-[8px] origin-bottom-right _top-[-3px] opacity-100 transition-all duration-500 `}
              />
            </div>
          </AdvancedMarker>
        );
      })}
    </Foobar>
  );
}
