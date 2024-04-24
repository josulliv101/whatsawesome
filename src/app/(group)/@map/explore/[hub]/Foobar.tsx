"use client";

import { Button } from "@/components/ui/button";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export default function Foobar({
  children,
  markers = [],
}: PropsWithChildren<{ markers: Array<any> }>) {
  const router = useRouter();
  const map = useMap();
  const searchParams = useSearchParams();
  const pt = searchParams.get("pt");
  const t3 = searchParams.get("t3");
  const coreLib = useMapsLibrary("core");

  const b = map?.getBounds();

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBoundsLiteral>();

  // map?.addListener("pan", (a: any) => console.log("pan", a));
  const handleSearchMapBounds = () => {
    const b = map?.getBounds();
    console.log(b?.toUrlValue());
    const ptUrlParams = pt ? `&pt=${pt}` : "";
    const t3UrlParams = t3 ? `&t3=${t3}` : "";
    router.push(
      `?${ptUrlParams}${t3UrlParams}&searchMapBounds=${b?.toUrlValue()}`
    );
  };

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
    if (markers.length === 1) {
      // map.setZoom(17);
    }
    if (!searchParams.get("searchMapBounds")) {
      map.fitBounds(bounds);
    }

    //const initialBounds = bounds.toJSON();

    // setInitialBounds(bounds.toJSON());
  }, [coreLib, markers, map]);

  return (
    <div className="relative">
      {children}
      <div className="z-50 absolute right-2 top-2 __translate-x-full">
        {/* <Button onClick={handleSearchMapBounds} variant={"secondary"} size="sm">
          Search map bounds
        </Button> */}
      </div>
    </div>
  );
}
