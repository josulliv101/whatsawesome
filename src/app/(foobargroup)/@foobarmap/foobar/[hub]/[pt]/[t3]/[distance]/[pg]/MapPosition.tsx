"use client";

import { Button } from "@/components/ui/button";
import { formatHubIdToName } from "@/lib/format";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";

export default function MapPosition({
  markers = [],
  hub,
  distance,
  hubName,
  children,
}: PropsWithChildren<{ hub?: string; hubName?: string; markers: Array<any> }>) {
  const map = useMap();

  const coreLib = useMapsLibrary("core");

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBoundsLiteral>();

  useEffect(() => {
    if (!coreLib || !map) return;

    const { LatLng, LatLngBounds } = coreLib;
    const bounds = new coreLib.LatLngBounds();
    // const sw = new LatLng(bounds.sw.latitude, bounds.sw.longitude);
    // const ne = new LatLng(bounds.ne.latitude, bounds.ne.longitude);

    if (bounds) {
      markers.forEach((marker) =>
        bounds.extend(new coreLib.LatLng(marker._geoloc))
      );
    }
    if (markers.length === 1 && markers[0].isCity) {
      map.setCenter(markers[0]._geoloc);
      const z = getHubMapZoom(markers[0].mapZoom, distance);
      return map.setZoom(z);
    }
    if (true) {
      map.fitBounds(bounds);
    }

    //const initialBounds = bounds.toJSON();

    // setInitialBounds(bounds.toJSON());
  }, [coreLib, markers, map]);
  return <>{children}</>;
}

function getHubMapZoom(defaultZoom = 13, distance = 0) {
  const d = Number(distance);
  if (d === 0) {
    return defaultZoom;
  }
  if (d === 4) {
    return defaultZoom - 1;
  }
  return defaultZoom - 2;
}
