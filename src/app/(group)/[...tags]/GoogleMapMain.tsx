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
  APIProvider as ClientAPIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Marker,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { config } from "@/lib/config";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import Rating from "@/components/Rating";
import Link from "next/link";
import { Button } from "@/components/ui/button";

let map;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function GoogleMapMain({
  activeItemId,
  setActiveItemId,
  activeItemHoverId,
  setActiveItemHoverId,
  activeItemRef,
  markers = [],
  tag,
  profilesByTag = [],
}: {
  activeItemId?: string | null;
  setActiveItemId?: Dispatch<SetStateAction<string | null>>;
  activeItemHoverId?: string | null;
  setActiveItemHoverId?: Dispatch<SetStateAction<string | null>>;
  activeItemRef?: any;
  markers: Array<any>;
  tag?: string;
  profilesByTag: Array<any>;
}) {
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

    const initialBounds = bounds.toJSON();

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
    if (id && setActiveItemId) {
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
        className=" opacity-100 sticky flex items-center top-[70px] z-[1] w-full h-[420px] mb-12 border bg-gray-100 rounded-md p-2"
      >
        {initialBounds && (
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: 42.35998584895903, lng: -71.06132881413302 }}
            // defaultBounds={markers.length > 1 ? initialBounds : undefined}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapTypeId={"roadmap"}
            mapId={"739af084373f96fe"}
            // mapId={"bf51a910020fa25a"}
            // styles={mapStyleSimple}
          >
            {markers.map((marker, i) => {
              const isActiveMarker = marker.id === activeItemId;
              const isActivelyHoveredMarker = marker.id === activeItemHoverId;
              const ll = coreLib ? new coreLib.LatLng(marker.latlng) : null;
              const size = isActivelyHoveredMarker ? 32 : 24;
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
                    key={marker.id}
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
                        // transform: "translate(-50%, -50%)",
                      }}
                      className={`drop-shadow-md_ origin-bottom-right transition-all duration-500  flex gap-0.5 items-center ${!isActiveMarker ? "grayscale-0 rounded-full" : "grayscale-0 rounded-none"}`}
                    >
                      <Image
                        // onMouseOver={(ev) => console.log(ev)}
                        // key={i}
                        onMouseOver={() =>
                          setActiveItemHoverId &&
                          setActiveItemHoverId(marker.id)
                        }
                        onMouseOut={() =>
                          setActiveItemHoverId && setActiveItemHoverId(null)
                        }
                        id={marker.id}
                        alt="vote"
                        src={config.logoPath}
                        width={size}
                        height={size}
                        className={`relative origin-bottom-right ${isActivelyHoveredMarker || isActiveMarker ? "z-50 grayscale-0" : "grayscale-0"} _top-[-3px] opacity-100 transition-all duration-500 `}
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
                      onCloseClick={() =>
                        setActiveItemId && setActiveItemId(null)
                      }
                    >
                      {marker.parentId}
                    </InfoWindow>
                  )}
                </Fragment>
              );
            })}
          </Map>
        )}
        {!initialBounds && <div className="bg-gray-100_ w-full h-full"></div>}
        <Command className="max-w-96">
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <CommandList className="relative">
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            <CommandGroup
              className="text-right pr-0"
              heading={
                <div className="flex items-center justify-between">
                  <span className="opacity-100 text-primary relative capitalize">{`${tag} Roundup`}</span>
                  <span className="opacity-100 text-primary relative left-[-12px]">{`#${tag} `}</span>
                </div>
              }
            >
              {profilesByTag.sort(compareByLabel).map((item) => {
                return (
                  <CommandItem
                    key={item.tag}
                    value={item.tag}
                    onMouseOver={() =>
                      setActiveItemHoverId && setActiveItemHoverId(item.tag)
                    }
                    onMouseOut={() =>
                      setActiveItemHoverId && setActiveItemHoverId(null)
                    }
                    onSelect={(id) => {
                      console.log("id", id);
                      document.getElementById(`foobar-${id}`)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className={`w-full cursor-pointer flex items-center justify-between py-1 ${item.id === activeItemId || item.id === activeItemHoverId ? "bg-muted_ text-secondary-foreground" : ""} hover:bg-inherit_ aria-selected:bg-muted aria-selected:text-secondary-foreground`}
                  >
                    <div className="flex items-center gap-2 capitalize">
                      {/* <Image
                        width="36"
                        height="36"
                        alt={item.id}
                        src={item.pic}
                        className="border rounded-md w-[36px] h-[36px] object-cover"
                      /> */}
                      {item.label}
                    </div>
                    {/* <Rating rating={item.rating} size={16} /> */}
                    {/* <span className="flex flex-row-reverse items-center gap-1">
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
                    </span> */}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="absolute hidden _flex items-center bottom-0 right-0 bg-gray-100 w-full">
          <Button size="sm" variant={"secondary"} asChild>
            <Link href={`/compare/${tag}`}>Enable head-to-head</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export function compareByLabel(a: { label: string }, b: { label: string }) {
  return a.label.localeCompare(b.label);
}
