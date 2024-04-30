import Image from "next/image";
import {
  fetchClaimsForHub,
  fetchHubProfiles,
  fetchProfile,
} from "@/lib/firebase";
import { tagDefinitions } from "@/lib/tags";
import AdvancedMarker from "./Marker";
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
  searchParams: {
    pt,
    st,
    t3,
    bounds,
    catalog,
    searchRadius = 4,
    searchMapBounds,
    activeId,
  },
}: {
  params: any;
  searchParams: any;
}) {
  // return null;
  const query = [hub, pt, st, t3].filter((tag) => !!tag) as string[];
  let topAoe; // = [await searchTopAoeByRadius(hub, searchRadius, t3 ? [t3] : [])];
  if (!searchRadius || searchRadius === "0") {
    topAoe = !pt
      ? await searchTopAoeByCategory(hub)
      : await searchTopAoeByCategory(hub, [[t3, pt]]);
  } else {
    topAoe = [await searchTopAoeByRadius(hub, searchRadius, t3 ? [t3] : [])];
  }

  if (searchMapBounds) {
    topAoe = [await searchTopAoeByMapBounds(hub, [t3], searchMapBounds)];
    console.log("topAoe (map)", topAoe[0].hits.length);
  }
  const profilesByCategory = !pt
    ? await searchProfilesByCategory(hub)
    : await searchProfilesByCategory(hub, pt ? [pt, t3] : undefined);
  console.log("topAoe MAP", topAoe[0]?.hits);
  console.log("searchMapBounds", searchMapBounds);
  const profile = await fetchProfile(hub);
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
  const topMarkers = !pt
    ? [
        {
          _geoloc: profile._geoloc,
          _tags: profile._tags,
          id: profile.name,
          profileName: profile.name,
          size: getMarkerSizeFromRating(1),
          visible: true,
        },
      ]
    : topAoe[0]?.hits.map((hit: any) => {
        return {
          _geoloc: hit._geoloc,
          _tags: hit._tags,
          id: hit.path,
          profileName: hit.parentId + " " + hit.rating,
          size: getMarkerSizeFromRating(10 * Number(hit.rating) || 1),
          visible: true,
        };
      });

  return (
    <Foobar profileZoom={profile.mapZoom} markers={topMarkers.flat()}>
      {topMarkers.map((marker) => {
        const size = marker.size;
        const profileId = marker?.id?.split("/")?.[1];
        return (
          // <Marker key={index} position={marker.latlng} />
          <AdvancedMarker
            key={marker.id}
            id={marker.id}
            // ref={isActiveMarker ? markerRef : null}
            position={marker._geoloc}
            title={marker.profileName}
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
                opacity: marker.visible ? 1 : 0,
              }}
              className={`animate-fadeIn drop-shadow-md_ ${marker.visible ? "bg-[#4c98fd] border-4" : ""}  border-white rounded-full origin-bottom-right transition-all duration-500  flex gap-0.5 items-center `}
            >
              {marker.visible && activeId === profileId ? (
                <Image
                  // id={marker.id}
                  alt="vote"
                  src={config.logoPath}
                  width={size}
                  height={size}
                  className={`relative border border-muted-foreground/50 bg-white rounded-full p-[8px] origin-bottom-right _top-[-3px] opacity-100 transition-all duration-500 `}
                />
              ) : null}
            </div>
          </AdvancedMarker>
        );
      })}
    </Foobar>
  );
}
