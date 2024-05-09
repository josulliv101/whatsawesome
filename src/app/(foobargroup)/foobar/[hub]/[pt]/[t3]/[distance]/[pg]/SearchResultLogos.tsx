"use client";

import Image from "next/image";
import { useMapContext } from "@/components/MapContext";
import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
// import MapContext from "@/components/MapContext";
// import { use } from "react";

export default function SearchResultLogos({ hits }: any) {
  // const activeMapHover = use(MapContext);
  const map = useMap();
  const { mapState, setMapState } = useMapContext();

  // map?.addListener("mousemove", (...args) => console.log("m", ...args));
  return (
    <div className="grid grid-cols-5 px-8 py-4 gap-4">
      {hits.map((hit: any) => {
        return (
          <div
            key={hit.objectID}
            className={`col-span-1 transition-opacity duration-500 text-white bg-black text-balance rounded-md ${false && mapState && mapState !== hit.objectID ? "opacity-10 grayscale" : "opacity-90 grayscale-0"} text-center flex items-center justify-center`}
            onMouseOver={() => setMapState(hit.objectID)}
            onMouseOut={() => setMapState("")}
          >
            {hit.parent?.parentPhotoUrl && (
              <Image
                key={hit.parentId}
                alt={hit.parent?.name}
                src={hit.parent?.parentPhotoUrl}
                width="240"
                height="240"
                className={`rounded-md border`}
              />
            )}
            {!hit.parent?.parentPhotoUrl && (
              <div className="px-4">
                {!hit.parent?.parentPhotoUrl && hit.parent?.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
