"use client";

import { Button } from "@/components/ui/button";
import {
  APIProvider,
  AdvancedMarker,
  ControlPosition,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function FoobarMap({
  children,
  hubName,
  hub,
}: PropsWithChildren<any>) {
  return (
    <Map
      className="h-[320px] w-full"
      defaultZoom={3}
      defaultBounds={undefined}
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      clickableIcons={false}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      // zoomControlOptions={{ position: ControlPosition.LEFT_TOP }}
      mapTypeId={"roadmap"}
      mapId={"739af084373f96fe"}
    >
      {children}
    </Map>
  );
}
