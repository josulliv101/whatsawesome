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
import { config } from "@/lib/config";
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

import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Rating from "@/components/Rating";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { compareByLabel } from "./GoogleMapMain";
import BubbleAvatars from "@/components/BubbleAvatars";

let map;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const data = [
  { id: "kg", name: "Kevin Garnett", size: 22, pic: "/kevin-garnett.png" },
];

export default function BubbleChart({
  activeItemHoverId,
  setActiveItemHoverId,
  markers = [],
  tag,
  profilesByTag = [],
}: {
  activeItemHoverId: string | null;
  setActiveItemHoverId?: Dispatch<SetStateAction<string | null>>;
  markers: Array<any>;
  tag?: string;
  profilesByTag: Array<any>;
}) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const activeItemRef = useRef<HTMLDivElement | null>(null);
  const map = useMap();

  const coreLib = useMapsLibrary("core");

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBoundsLiteral>();

  useEffect(() => {
    // const {current} = activeItemRef
    if (activeItemId !== null) {
      document.getElementById(activeItemId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [activeItemId]);

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

  const bubbleChartData = profilesByTag
    // .filter((item) => (!activeItemId ? true : item.label === activeItemId))
    .map((item) => item.profiles)
    .flat()
    .map((item, i) => ({
      id: item.id,
      name: item.name,
      pic: item.pic,
      size: (i % 3) * 9 + 30,
    }));

  console.log("bubble zz ChartData", bubbleChartData, profilesByTag);

  return (
    <>
      <div
        id="map"
        className=" opacity-100 sticky flex items-center top-[70px] z-[1] w-full h-[420px] mb-12 border bg-gray-100 rounded-md p-2"
      >
        <div className="bg-gray-600 w-full h-full">
          <BubbleAvatars data={bubbleChartData} />
        </div>
        <Command className="max-w-96">
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <CommandList className="relative">
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            <CommandGroup
              className="text-right pr-0"
              heading={
                <div className="flex items-center justify-between">
                  <span className="opacity-100 text-primary relative capitalize">{`People by category`}</span>
                  <span className="opacity-100 text-primary relative left-[-12px] hidden">{`#${tag} `}</span>
                </div>
              }
            >
              {profilesByTag.sort(compareByLabel).map((item) => {
                return (
                  <CommandItem
                    key={item.tags.join("-")}
                    value={item.label}
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
                      setActiveItemId(id);
                    }}
                    className={`w-full cursor-pointer flex items-center justify-between py-1 ${item.id === activeItemId || item.id === activeItemHoverId ? "bg-muted text-secondary-foreground" : ""} hover:bg-inherit_ aria-selected:bg-muted aria-selected:text-secondary-foreground`}
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
        <div className="absolute flex_ hidden items-center bottom-0 right-0 bg-gray-100 w-full">
          <Button size="sm" variant={"secondary"} asChild>
            <Link href={`/compare/${tag}`}>Enable head-to-head</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
