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
} from "@/lib/search";

export default async function Page({
  params: { hub },
  searchParams: { pt, st, t3, bounds, catalog },
}: {
  params: any;
  searchParams: any;
}) {
  const query = [hub, pt, st, t3].filter((tag) => !!tag) as string[];
  const profilesByCategory = bounds
    ? await searchProfilesByMapBounds(bounds, 10)
    : await searchProfilesByCategory(hub, pt ? [pt] : undefined);
  console.log("bounds", profilesByCategory);
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

  const markers: Array<any> = profilesByCategory.reduce(
    (acc, category: any) => {
      console.log("...profile", category);
      const items =
        category?.profiles?.map((hit: any) => {
          return {
            latlng: hit._geoloc,
            id: hit.name,
            profileName: hit.name,
          };
        }) || [];
      return [...acc, ...items];
    },
    []
  );
  // const markers: any = [];

  const size = 24;
  return (
    <Foobar markers={markers.flat()}>
      {markers.map((marker, index) => (
        // <Marker key={index} position={marker.latlng} />
        <AdvancedMarker
          key={marker.id}
          // ref={isActiveMarker ? markerRef : null}
          position={marker.latlng}
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
      ))}
    </Foobar>
  );
}
