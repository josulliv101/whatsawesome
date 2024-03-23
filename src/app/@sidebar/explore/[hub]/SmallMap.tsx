"use client";

import React, { useEffect, useState } from "react";

import {
  APIProvider,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const SmallMap = ({ markers = [] }: { markers: Array<any> }) => {
  const map = useMap();
  const router = useRouter();

  const coreLib = useMapsLibrary("core");

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBoundsLiteral>();

  useEffect(() => {
    if (!coreLib) return;

    const { LatLng, LatLngBounds } = coreLib;
    const bounds = new coreLib.LatLngBounds();
    // const sw = new LatLng(bounds.sw.latitude, bounds.sw.longitude);
    // const ne = new LatLng(bounds.ne.latitude, bounds.ne.longitude);

    if (bounds) {
      markers.forEach((marker) =>
        bounds.extend(new coreLib.LatLng(marker.latlng))
      );
    }

    //const initialBounds = bounds.toJSON();

    setInitialBounds(bounds.toJSON());
  }, [coreLib, markers]);
  console.log("@@@", initialBounds, coreLib);

  if (!initialBounds) {
    return null;
  }
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        // defaultZoom={14}
        // defaultCenter={markers[0].latlng}
        defaultBounds={initialBounds}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapTypeId={"roadmap"}
        mapId={"739af084373f96fe"}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.latlng} />
        ))}
      </Map>
    </APIProvider>
  );
};
export default SmallMap;
