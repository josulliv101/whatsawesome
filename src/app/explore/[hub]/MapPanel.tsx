"use client";

import Image from "next/image";
import {
  APIProvider as ClientAPIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Fragment, useEffect, useState } from "react";
import { config } from "@/lib/config";
import { setIndexConfiguration } from "firebase/firestore";

export default function MapPanel({
  center,
  defaultZoom = 14,
  items = [],
}: {
  center?: any;
  defaultZoom?: number;
  items: Array<any>;
}) {
  const map = useMap();
  const coreLib = useMapsLibrary("core");
  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBoundsLiteral>();

  console.log("MAP", map, coreLib, initialBounds, items);

  useEffect(() => {
    console.log("@@@", coreLib, map);
    if (!coreLib || !map) return;

    const { LatLng, LatLngBounds } = coreLib;
    const bounds = new coreLib.LatLngBounds();
    // const sw = new LatLng(bounds.sw.latitude, bounds.sw.longitude);
    // const ne = new LatLng(bounds.ne.latitude, bounds.ne.longitude);

    if (bounds) {
      items.forEach((marker) =>
        bounds.extend(new coreLib.LatLng(marker.parent.latlng || null))
      );
    }

    const initialBounds = bounds.toJSON();

    setInitialBounds(initialBounds);
  }, [coreLib, map, items]);

  if (!initialBounds) return null;

  return (
    <Map
      defaultZoom={14}
      defaultCenter={{ lat: 42.35998584895903, lng: -71.06132881413302 }}
      // defaultBounds={items.length > 1 ? initialBounds : undefined}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapTypeId={"roadmap"}
      mapId={"739af084373f96fe"}
      // mapId={"bf51a910020fa25a"}
      // styles={mapStyleSimple}
    >
      {items.map((item, i) => {
        const latlng = item.parent?.latlng;
        console.log("ll", latlng);
        // const isActiveMarker = marker.id === activeItemId;
        // const isActivelyHoveredMarker = marker.id === activeItemHoverId;
        // const ll = item.parent?.latlng // coreLib ? new coreLib.LatLng(marker.latlng) : null;
        const size = 32; // isActivelyHoveredMarker ? 32 : 32;

        return (
          <AdvancedMarker
            key={item.id}
            // ref={isActiveMarker ? markerRef : null}
            position={latlng}
            // title={"AdvancedMarker with custom html content."}
            // onClick={handleMarkerClick}
          >
            <div
              style={{
                width: size,
                height: size,
                //  position: "absolute",
                top: 0,
                left: 0,
                // background: "#1dbe80",
                // border: "2px solid #0e6443",
                // borderRadius: "50%",
                // transform: "translate(-50%, -50%)",
              }}
              className={`drop-shadow-md_ bg-white rounded-full origin-bottom-right transition-all duration-500  flex gap-0.5 items-center`}
            >
              <Image
                // onMouseOver={(ev) => console.log(ev)}
                // key={i}
                // onMouseOver={() =>
                //   setActiveItemHoverId &&
                //   setActiveItemHoverId(marker.id)
                // }
                // onMouseOut={() =>
                //   setActiveItemHoverId && setActiveItemHoverId(null)
                // }
                id={item.id}
                alt="vote"
                src={config.logoPath}
                width={size}
                height={size}
                className={`relative border border-muted-foreground/50 bg-white rounded-full p-[4px] origin-bottom-right _top-[-3px] opacity-100 transition-all duration-500 `}
              />
            </div>
          </AdvancedMarker>
        );
      })}
    </Map>
  );
}
