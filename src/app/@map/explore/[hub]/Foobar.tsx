"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { PropsWithChildren, useEffect, useState } from "react";

export default function Foobar({
  children,
  markers = [],
}: PropsWithChildren<{ markers: Array<any> }>) {
  const map = useMap();

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

    map?.fitBounds(bounds);

    //const initialBounds = bounds.toJSON();

    // setInitialBounds(bounds.toJSON());
  }, [coreLib, markers]);
  return children;
}
