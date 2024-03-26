"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";
import { config } from "@/lib/config";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const SmallMap = ({
  children,
  // markers = [],
}: PropsWithChildren<{}>) => {
  /*
  const map = useMap();
  const router = useRouter();

  const coreLib = useMapsLibrary("core");

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBoundsLiteral>();

  useEffect(() => {
    if (!coreLib || !initialBounds) return;

    const { LatLng, LatLngBounds } = coreLib;
    const bounds = new coreLib.LatLngBounds();
    // const sw = new LatLng(bounds.sw.latitude, bounds.sw.longitude);
    // const ne = new LatLng(bounds.ne.latitude, bounds.ne.longitude);

    if (bounds) {
      markers.forEach((marker) =>
        bounds.extend(new coreLib.LatLng(marker.latlng))
      );
    }

    map?.fitBounds(bounds);

    //const initialBounds = bounds.toJSON();

    // setInitialBounds(bounds.toJSON());
  }, [coreLib, markers]);

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
*/
  const size = 32;
  return (
    <Map
      defaultZoom={14}
      defaultCenter={{ lat: 0, lng: 0 }}
      // defaultBounds={initialBounds}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapTypeId={"roadmap"}
      mapId={"739af084373f96fe"}
      onCameraChanged={(ev, ...args) =>
        console.log("camera change", ev, ...args)
      }
      minZoom={1}
      maxZoom={19}
    >
      {children}
    </Map>
  );
};
export default SmallMap;
