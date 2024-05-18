import { fetchProfile } from "@/lib/firebase";
import MapPosition from "../../explore/[hub]/[pt]/[t3]/[distance]/[pg]/MapPosition";
import Marker from "@/app/(group)/@map/explore/[hub]/Marker";
import { getHubTagsFromTags } from "@/lib/tags";
import Breadcrumb from "@/app/(foobargroup)/foobar/explore/[hub]/[pt]/[t3]/[distance]/[pg]/Breadcrumb";

const bgColor = "bg-[#4c98fd]";

export default async function Page({ params: { profileId } }: any) {
  const hit = await fetchProfile(profileId, false);
  const hub = getHubTagsFromTags(hit?.tags);
  const marker = {
    ...hit,
    objectID: profileId,
    isCity: false,
    zoom: 12,
    reason: (
      <div className="flex items-center gap-2 flex-wrap">{profileId}</div>
    ),
  };
  return (
    <>
      {" "}
      <Breadcrumb>
        <div className="capitalize text-lg font-semibold flex items-center gap-4"></div>
      </Breadcrumb>
      <div className="capitalize border border-gray-100/0 shadow-sm opacity-100 bg-blue-500 flex gap-2 items-center text-base text-white px-3 py-1 absolute top-4 right-4 z-10 rounded-full">
        {hit?.name || hit.id}
      </div>
      <MapPosition
        hub={typeof hub === "string" ? hub : ""}
        distance={0}
        hubName={hit?.name || hit.id}
        markers={[marker]}
      >
        <Marker
          key={hit.id}
          id={hit.id}
          size={36}
          position={hit._geoloc}
          title={hit?.name || hit.id}
          photoUrl={hit.pic}
          parentPhotoUrl={hit.pic}
          excellence={hit.description}
        >
          <div
            style={{
              width: 36,
              height: 36,
            }}
            className={`relative z-[999] animate-fadeIn drop-shadow-md_ border-4 ${true ? bgColor + "  rounded-full" : "bg-black rounded-md"}  border-white origin-bottom-right transition-all duration-500  flex gap-0.5 items-center justify-center `}
          ></div>
        </Marker>
      </MapPosition>
    </>
  );
}
