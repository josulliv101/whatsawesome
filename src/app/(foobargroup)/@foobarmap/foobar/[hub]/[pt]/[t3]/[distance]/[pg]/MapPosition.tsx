"use client";

import {
  MapMarkerContext,
  useMapMarkerContext,
} from "@/components/MapMarkerContext";
import { Button } from "@/components/ui/button";
import { formatHubIdToName } from "@/lib/format";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import Link from "next/link";
import { PropsWithChildren, use, useEffect, useState } from "react";
import ResetMapButton from "./ResetMapButton";
import { useMapContext } from "@/components/MapContext";

export default function MapPosition({
  markers = [],
  hub,
  distance,
  hubName,
  children,
}: PropsWithChildren<{ hub?: string; hubName?: string; markers: Array<any> }>) {
  const map = useMap();

  const coreLib = useMapsLibrary("core");
  const { mapState, setMapState } = useMapContext();
  const [markerStatusMap, setMarkerStatusMap] = use(MapMarkerContext);
  const [initalMapPosition, setInitialMapPosition] = useState<any>(null);
  const [initalZoom, setInitialZoom] = useState<any>(null);
  const [currentMapPosition, setCurrentMapPosition] = useState<any>(null);
  const [initialMarkers, setInitialMarkers] = useState(markers);

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBoundsLiteral>();

  const requestToResetId: any = Object.values(markerStatusMap).find(
    (item: any) => !!item.pan
  );

  useEffect(() => {
    if (!coreLib || !map || !initialMarkers || initialMarkers.length == 0)
      return;

    const { LatLng, LatLngBounds } = coreLib;
    const bounds = new coreLib.LatLngBounds();
    // const sw = new LatLng(bounds.sw.latitude, bounds.sw.longitude);
    // const ne = new LatLng(bounds.ne.latitude, bounds.ne.longitude);

    // const initialMarkerStatusMap: Record<
    //   string,
    //   { isWithinMapBounds: boolean }
    // > = {};

    if (bounds) {
      initialMarkers.forEach((marker) => {
        bounds.extend(new coreLib.LatLng(marker._geoloc));
        // if (marker.id) {
        //   initialMarkerStatusMap[marker.id] = {
        //     isWithinMapBounds: true,
        //   };
        // }
      });
    }

    if (initialMarkers.length === 1 && initialMarkers[0].isCity) {
      map.setCenter(initialMarkers[0]._geoloc);
      const z = getHubMapZoom(initialMarkers[0].mapZoom, distance);
      return map.setZoom(z);
    }
    if (true) {
      map.fitBounds(bounds);
    }

    // setInitialMapPosition(bounds.getCenter().toString());

    // setMarkerStatusMap(initialMarkerStatusMap);

    //const initialBounds = bounds.toJSON();

    // setInitialBounds(bounds.toJSON());
  }, [coreLib, initialMarkers, map]);

  useEffect(() => {
    if (!coreLib || !map || !markers || !markers.length) return;

    map.addListener("idle", () => {
      console.log("add idle listener", markers);
      const tmp: Record<string, any> = {};
      for (let i = 0; i < markers.length; i++) {
        const latlng = new coreLib.LatLng(markers[i]._geoloc);
        const isWithinBounds = map?.getBounds()?.contains(latlng);
        console.log("markers[i]", markers[i]);
        tmp[markers[i].objectID || markers[i].id] = { isWithinBounds };
      }
      setMarkerStatusMap(tmp);
      const mapBounds = map.getBounds();
      console.log(
        "update map positions",
        initalMapPosition,
        currentMapPosition
      );
      mapBounds && setCurrentMapPosition(mapBounds);
      mapBounds && setInitialZoom(map.getZoom());
      // !initalMapPosition && center && setInitialMapPosition(center.toString());
    });

    // TODO remove listener
  }, [coreLib, map, markers]);

  useEffect(() => {
    if (currentMapPosition && !initalMapPosition) {
      setInitialMapPosition(currentMapPosition);
    }
  }, [currentMapPosition]);

  useEffect(() => {
    const marker = markers.find(
      (marker) => marker.objectID === requestToResetId?.pan
    );
    if (requestToResetId && marker && map) {
      google.maps.event.addListenerOnce(map, "idle", function () {
        setTimeout(() => setMapState(marker.objectID), 400);
      });
      setMapState("");
      map?.panTo(marker._geoloc);
    }
  }, [requestToResetId, markers]);

  return (
    <>
      {initalMapPosition !== currentMapPosition && (
        <ResetMapButton
          onReset={() => {
            console.log(
              "initalMapPosition",
              initalZoom,
              initalMapPosition?.toString(),
              currentMapPosition?.toString()
            );
            initalMapPosition && map?.fitBounds(initalMapPosition);
            initalMapPosition && setCurrentMapPosition(initalMapPosition);
          }}
          position={initalMapPosition}
        >
          {initalMapPosition?.toString()} / {currentMapPosition?.toString()}
        </ResetMapButton>
      )}

      {children}
    </>
  );
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
