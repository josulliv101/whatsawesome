"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import {
  APIProvider,
  AdvancedMarker,
  ControlPosition,
  Map,
  Marker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { config } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { BadgeCheckIcon, XCircleIcon, XIcon } from "lucide-react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const SmallMap = ({
  children,
  // markers = [],
}: PropsWithChildren<{}>) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [isShowingResults, setIsShowingResults] = useState(
    !!searchParams.get("t3")
  );
  /*
  const map = useMap();
  const router = useRouter();

  const coreLib = useMapsLibrary("core");

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBoundsLiteral>();

  useEffect(() => {
    if (!coreLib || !initialBounds) return;

    const { LatLng, LatLngBounds } = coreLib;
    const bounds = new coreLib.LatLngBounds();
    // const sw = new LatLng(bounds.sw.latitude, bounds.sw.longitude);
    // const ne = new LatLng(bounds.ne.latitude, bounds.ne.longitude);

    if (bounds) {
      markers.forEach((marker) =>
        bounds.extend(new coreLib.LatLng(marker.latlng))
      );
    }

    map?.fitBounds(bounds);

    //const initialBounds = bounds.toJSON();

    // setInitialBounds(bounds.toJSON());
  }, [coreLib, markers]);

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

    //const initialBounds = bounds.toJSON();

    setInitialBounds(bounds.toJSON());
  }, [coreLib, markers]);
  console.log("@@@", initialBounds, coreLib);

  if (!initialBounds) {
    return null;
  }
*/
  const size = 32;
  return (
    <Map
      // defaultZoom={14}
      defaultCenter={{ lat: 0, lng: 0 }}
      defaultBounds={undefined}
      gestureHandling={"greedy"}
      disableDefaultUI={false}
      mapTypeControl={false}
      streetViewControl={false}
      fullscreenControl={false}
      zoomControlOptions={{ position: ControlPosition.LEFT_TOP }}
      mapTypeId={"roadmap"}
      mapId={"739af084373f96fe"}
      onCameraChanged={(ev, ...args) => {
        console.log("camera change", ev.map.getBounds()?.toUrlValue(), ...args);
        // router.replace(`?bounds=${ev.map.getBounds()?.toUrlValue()}`);
      }}
      // minZoom={5}
      // maxZoom={16}
    >
      {children}

      {true && (
        <Button
          onClick={() => setIsShowingResults(!isShowingResults)}
          variant={"ghost"}
          className={`${searchParams.get("t3") ? "animate-fadeInDelayed_" : ""} absolute top-2 right-0 mr-2 z-50 bg-gray-50 shadow-md`}
          size={"icon"}
        >
          <BadgeCheckIcon className="h-8 w-8 my-1  mx-auto text-blue-500 opacity-80 " />
        </Button>
      )}
      {true && (
        <div
          className={`${isShowingResults ? "-translate-x-[120%]" : "translate-x-[110%]"} transition-all duration-500 absolute top-2 right-0 mr-2 z-50 border-0 border-white/50 w-64 h-[336px] rounded-md py-2 px-3 bg-gray-200/90`}
        >
          <div className="capitalize mb-4 hidden">{params.hub}</div>
          <div className="grid grid-cols-12 gap-2">
            {[
              ["restaurant", "burger"],
              ["restaurant", "steak"],
              ["coffeehouse", "coffee"],
              ["coffeehouse", "pastries"],
              ["restaurant", "wings"],
              ["restaurant", "wine"],
            ].map((item) => (
              <div className="col-span-6">
                <Button
                  asChild
                  onClick={() => setIsShowingResults(false)}
                  variant={"outline"}
                  className="block pt-4 bg-muted text-muted-foreground text-center w-full h-[101px] col-span-6"
                >
                  <Link
                    href={`/explore/${params.hub}?pt=${item[0]}&t3=${item[1]}`}
                  >
                    <div className="text-xs mb-1 capitalize">{item[0]}</div>
                    <BadgeCheckIcon className="h-5.5 w-5.5 my-1  mx-auto text-blue-500 opacity-80 " />
                    <div className="text-md capitalize">{item[1]}</div>
                  </Link>
                </Button>
              </div>
            ))}
            <Button
              onClick={() => setIsShowingResults(false)}
              size={"icon"}
              variant={"ghost"}
              className="absolute -top-2 -right-2 bg-gray-100 p-1 rounded-full h-6 w-6"
            >
              <XIcon className="h-6 w-6" />
            </Button>
            <div className="font-semibold mb-0 hidden">Popular</div>
          </div>
        </div>
      )}
    </Map>
  );
};
export default SmallMap;
