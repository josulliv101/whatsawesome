"use client";

import Image from "next/image";
import { useMapContext } from "@/components/MapContext";
import { useEffect } from "react";
// import MapContext from "@/components/MapContext";
// import { use } from "react";

export default function SearchResultLogos({ hits }: any) {
  // const activeMapHover = use(MapContext);
  const { mapState, setMapState } = useMapContext();

  return (
    <div className="grid grid-cols-5 px-8 py-4 gap-4">
      {hits.map((hit: any) => {
        return (
          <div className="col-span-1 text-white bg-black text-balance rounded-md  text-center flex items-center justify-center">
            {hit.parent?.parentPhotoUrl && (
              <Image
                key={hit.parentId}
                alt={hit.parent?.name}
                src={hit.parent?.parentPhotoUrl}
                width="240"
                height="240"
                className="rounded-md border"
                onMouseOver={() => setMapState(hit.objectID)}
                onMouseOut={() => setMapState("")}
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
