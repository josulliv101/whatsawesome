"use client";

import Image from "next/image";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

import { config } from "@/lib/config";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import Rating from "@/components/Rating";
import { Checkbox } from "@/components/ui/checkbox";
import { handleAddEntityToCompare } from "@/lib/actions";

let map;
export const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export { APIProvider as ClientAPIProvider } from "@vis.gl/react-google-maps";

export default function GoogleMap({
  latlng,
  onChange,
}: {
  latlng: any;
  onChange: any;
}) {
  const map = useMap();

  const coreLib = useMapsLibrary("core");

  const [markerRef, markerAdvanced] = useAdvancedMarkerRef();
  const ll = latlng?.lat && latlng?.lng ? latlng : { lat: 41.9, lng: -71.1 };
  return (
    <>
      <div
        id="map"
        className="opacity-100 sticky_ flex items-center top-[72px] z-[1] w-full h-[420px] mb-12 border bg-gray-100 rounded-md p-2"
      >
        <Map
          defaultZoom={13}
          defaultCenter={ll}
          // defaultBounds={initialBounds}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapTypeId={"roadmap"}
          // mapId={"739af084373f96fe"}
          // mapId={"bf51a910020fa25a"}
          // styles={mapStyleSimple}
        >
          <Marker
            draggable
            position={ll}
            onDragEnd={(arg) => {
              const latlng = arg.latLng?.toJSON();
              console.log("end", latlng);
              latlng && onChange("latlng", latlng);
            }}
          />
        </Map>
      </div>
    </>
  );
}
