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
  Map,
  Marker,
} from "@vis.gl/react-google-maps";
import mapStyleSimple from "./mapStyleSimple";
import { config } from "@/lib/config";

let map;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function GoogleMap({ markers = [] }: { markers: Array<any> }) {
  return (
    <>
      <div
        id="map"
        className="sticky flex items-center top-[72px] z-[1] w-full h-[420px] mb-12 border bg-gray-100 rounded-md p-2"
      >
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultZoom={12}
            defaultCenter={{ lat: markers[0][0], lng: markers[0][1] }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapTypeId={"roadmap"}
            // mapId={"739af084373f96fe"}
            mapId={"bf51a910020fa25a"}
            styles={mapStyleSimple}
          >
            {markers.map((marker, i) => (
              <AdvancedMarker
                key={i}
                position={{ lat: marker[0], lng: marker[1] }}
                title={"AdvancedMarker with custom html content."}
                onClick={() => alert("marker was clicked!")}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    // background: "#1dbe80",
                    // border: "2px solid #0e6443",
                    // borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  className="flex gap-0.5 items-center"
                >
                  <Image
                    // key={i}
                    alt="vote"
                    src={config.logoPath}
                    width={24}
                    height={24}
                    className={`relative ${i === 0 ? "animate-rubberBandJumpNoDelay" : "grayscale-0"} _top-[-3px] opacity-100 `}
                  />
                </div>
              </AdvancedMarker>
            ))}
          </Map>
          <Command className="max-w-96">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Discover Excellence: Burgers North of Boston">
                <CommandItem>Capital Grille</CommandItem>
                <CommandItem>The Bancroft</CommandItem>
                <CommandItem>Tony C&#39;s</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Eddie Vs</CommandItem>
                <CommandItem>Not Your Average Joe&#39;s</CommandItem>
                <CommandItem>Burtons Grille & Bar</CommandItem>
                <CommandItem>Row 34</CommandItem>
                <CommandItem>Buffalo Wild Wings</CommandItem>
                <CommandItem>Tavern In The Squae</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </APIProvider>
      </div>
    </>
  );
}
