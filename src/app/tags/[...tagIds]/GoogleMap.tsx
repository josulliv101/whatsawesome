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
import mapStyleSimple from "./mapStyleSimple";
import { config } from "@/lib/config";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";

let map;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export { APIProvider as ClientAPIProvider } from "@vis.gl/react-google-maps";

export default function GoogleMap({
  activeItemId,
  setActiveItemId,
  markers = [],
}: {
  activeItemId: string | null;
  setActiveItemId: Dispatch<SetStateAction<string | null>>;
  markers: Array<any>;
}) {
  const map = useMap();

  const coreLib = useMapsLibrary("core");

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngLiteral>();

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

    const initialBounds = bounds.getCenter().toJSON();
    // debugger;
    setInitialBounds(initialBounds);
  }, [coreLib, markers]);

  // const bounds: google.maps.LatLngBounds =
  //   mapsLib && new mapsLib.LatLngBounds();

  // if (bounds) {
  //   markers.forEach((marker) => bounds.extend(marker.latlng));
  // }

  console.log("bounds", initialBounds);

  // const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [markerRef, markerAdvanced] = useAdvancedMarkerRef();

  const handleMarkerClick = (ev: any) => {
    const id = ev.domEvent?.target?.id;
    console.log("click", id);
    if (id) {
      setActiveItemId(id);
    }
  };

  if (!initialBounds) {
    // return null;
  }

  return (
    <>
      <div
        id="map"
        className="opacity-100 sticky flex items-center top-[72px] z-[1] w-full h-[420px] mb-12 border bg-gray-100 rounded-md p-2"
      >
        {initialBounds && (
          <Map
            defaultZoom={13}
            defaultCenter={initialBounds}
            // defaultBounds={initialBounds}
            gestureHandling={"greedy"}
            // disableDefaultUI={true}
            mapTypeId={"roadmap"}
            // mapId={"739af084373f96fe"}
            mapId={"bf51a910020fa25a"}
            // styles={mapStyleSimple}
          >
            {markers.map((marker, i) => {
              const isActiveMarker = marker.id === activeItemId;
              const ll = coreLib ? new coreLib.LatLng(marker.latlng) : null;
              const size = isActiveMarker ? 24 : 24;
              if (!ll) return null;
              console.log(
                "is active m",
                isActiveMarker,
                marker.id,
                activeItemId
              );
              return (
                <Fragment key={marker.id}>
                  <AdvancedMarker
                    key={i}
                    ref={isActiveMarker ? markerRef : null}
                    position={ll}
                    title={"AdvancedMarker with custom html content."}
                    onClick={handleMarkerClick}
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
                        transform: "translate(-50%, -50%)",
                      }}
                      className={`drop-shadow-md_ transition-all duration-500  flex gap-0.5 items-center ${!isActiveMarker ? "grayscale-0 rounded-full" : "grayscale rounded-none"}`}
                    >
                      <Image
                        // key={i}
                        id={marker.id}
                        alt="vote"
                        src={config.logoPath}
                        width={size}
                        height={size}
                        className={`relative ${i === 0 ? "animate-rubberBandJumpNoDelay" : "grayscale-0"} _top-[-3px] opacity-100 transition-all duration-500 `}
                      />
                    </div>
                  </AdvancedMarker>
                  {isActiveMarker && (
                    <InfoWindow
                      anchor={markerAdvanced}
                      maxWidth={200}
                      pixelOffset={{
                        width: 0,
                        height: -12,
                        equals: () => true,
                      }}
                      onCloseClick={() => setActiveItemId(null)}
                    >
                      {marker.parentId}
                    </InfoWindow>
                  )}
                </Fragment>
              );
            })}
          </Map>
        )}
        {!initialBounds && <div className="bg-gray-100 w-full h-full"></div>}
        <Command className="max-w-96">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Discover Excellence: Burgers North of Boston">
              {markers.map((item) => {
                return (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={(id) => !!id && setActiveItemId(item.id)}
                    className={`w-full flex items-center justify-between py-1 ${item.id === activeItemId ? "bg-primary text-primary-foreground" : ""} hover:bg-inherit_ aria-selected:bg-primary aria-selected:text-primary-foreground`}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        width="28"
                        height="28"
                        alt={item.parentId}
                        src={`/${item.parentId}.jpg`}
                      />
                      {item.parentId}
                    </div>
                    <span className="flex flex-row-reverse items-center gap-1">
                      <Image
                        // key={i}
                        id={item.id}
                        alt="vote"
                        src={config.logoPath}
                        width={16}
                        height={16}
                        className={`relative ${false ? "animate-rubberBandJumpNoDelay" : "grayscale-0"} _top-[-3px] opacity-100 transition-all duration-500 `}
                      />{" "}
                      {item.rating}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </>
  );
}
