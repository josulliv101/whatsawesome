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
import Rating from "@/components/Rating";
import { Checkbox } from "@/components/ui/checkbox";
import { handleAddEntityToCompare } from "@/lib/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

let map;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export { APIProvider as ClientAPIProvider } from "@vis.gl/react-google-maps";

export default function GoogleMap({
  activeItemId,
  setActiveItemId,
  activeItemHoverId,
  setActiveItemHoverId,
  markers = [],
  tag,
  entities,
  setEntityIds,
}: {
  activeItemId: string | null;
  setActiveItemId: Dispatch<SetStateAction<string | null>>;
  activeItemHoverId: string | null;
  setActiveItemHoverId: Dispatch<SetStateAction<string | null>>;
  markers: Array<any>;
  tag?: string;
  entities: Array<any>;
  setEntityIds: Dispatch<SetStateAction<Array<any>>>;
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

  // console.log("bounds", initialBounds);

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
        className=" opacity-100 sticky flex items-center top-[75px] z-[1] w-full h-[420px] mb-12 border bg-gray-100 rounded-md p-2"
      >
        {initialBounds && (
          <Map
            defaultZoom={13}
            defaultCenter={initialBounds}
            // defaultBounds={initialBounds}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapTypeId={"roadmap"}
            // mapId={"739af084373f96fe"}
            mapId={"bf51a910020fa25a"}
            // styles={mapStyleSimple}
          >
            {markers
              .filter((marker) =>
                entities.map((e) => e.id)?.includes(marker.parentId)
              )
              .map((marker, i) => {
                const isActiveMarker = marker.id === activeItemId;
                const isActivelyHoveredMarker = marker.id === activeItemHoverId;
                const ll = coreLib ? new coreLib.LatLng(marker.latlng) : null;
                const size = isActivelyHoveredMarker ? 32 : 24;
                if (!ll) return null;

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
                          onMouseOver={() => setActiveItemHoverId(marker.id)}
                          onMouseOut={() => setActiveItemHoverId(null)}
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
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <CommandList>
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            <CommandGroup
              className="text-right pr-0"
              heading={
                <div className="flex items-center justify-between">
                  <span className="opacity-100 text-primary relative capitalize">{`Compare`}</span>
                  <span className="opacity-100 text-primary relative left-[-12px]">{`select atleast 2`}</span>
                </div>
              }
            >
              {markers.map((item) => {
                const entityIds = entities.map((e) => e.id);
                return (
                  <CommandItem
                    key={item.id}
                    value={item.parentId}
                    onMouseOver={
                      entityIds?.includes(item.parentId)
                        ? () => setActiveItemHoverId(item.id)
                        : undefined
                    }
                    onMouseOut={
                      entityIds?.includes(item.parentId)
                        ? () => setActiveItemHoverId(null)
                        : undefined
                    }
                    onSelect={async (id) => {
                      console.log("onSelect", id);
                      if (!id) {
                        return;
                      }
                      if (entityIds?.includes(id)) {
                        setEntityIds(
                          entities.filter((entity) => entity.id !== id)
                        );
                      } else {
                        const profile = await handleAddEntityToCompare(id);
                        console.log("p", profile);
                        setEntityIds(entities.concat(profile));
                      }
                    }}
                    className={`w-full cursor-pointer flex items-center justify-between py-1 ${item.id === activeItemId || item.id === activeItemHoverId ? "bg-muted text-secondary-foreground" : ""} hover:bg-inherit_ aria-selected:bg-muted aria-selected:text-secondary-foreground`}
                  >
                    <div className="flex items-center gap-2 capitalize">
                      <Image
                        width="36"
                        height="36"
                        alt={item.parentId}
                        src={item.parentPhotoUrl || item.photoUrl}
                        className="border rounded-md w-[36px] h-[36px] object-cover"
                      />
                      {item.parentId.replace(/[-_]/g, " ")}
                    </div>
                    <div className="pr-2">
                      <Checkbox
                        checked={
                          !!item.parentId && entityIds?.includes(item.parentId)
                        }
                      />
                    </div>
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
        <div className="absolute flex items-center bottom-0 right-0 bg-gray-100 w-full">
          <Button size="sm" variant={"secondary"} asChild>
            <Link href={`/tags/${tag}`}>Disable head-to-head</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
