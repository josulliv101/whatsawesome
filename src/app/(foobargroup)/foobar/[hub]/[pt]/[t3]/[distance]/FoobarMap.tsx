"use client";

import {
  APIProvider,
  AdvancedMarker,
  ControlPosition,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { PropsWithChildren } from "react";

export default function FoobarMap({ children }: PropsWithChildren) {
  return (
    <Map
      className="h-[400px]"
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
