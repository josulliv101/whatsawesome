import Image from "next/image";
import SmallMap from "@/app/@sidebar/explore/[hub]/SmallMap";
import { fetchClaimsForHub, fetchProfile } from "@/lib/firebase";
import { tagDefinitions } from "@/lib/tags";

import { config } from "@/lib/config";
import Foobar from "../../explore/[hub]/Foobar";
import { AdvancedMarker } from "../../explore/[hub]/Marker";

export default async function Page({
  params: { id },
  searchParams: { pt, st },
}: {
  params: any;
  searchParams: any;
}) {
  const profile = await fetchProfile(id);
  // const data = await fetchClaimsForHub(hub, [pt], [st]);
  const items = tagDefinitions[pt]?.tags || [];
  const markers = [profile].filter((m) => m.latlng?.lat && m.latlng?.lng);
  console.log("markers profile [id]", markers);
  const size = 24;

  return (
    <Foobar markers={markers}>
      {markers.map((marker, index) => (
        // <Marker key={index} position={marker.latlng} />
        <AdvancedMarker
          key={marker.id}
          // ref={isActiveMarker ? markerRef : null}
          position={marker.latlng}
          title={"AdvancedMarker with custom html content."}
          // onClick={handleMarkerClick}
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
