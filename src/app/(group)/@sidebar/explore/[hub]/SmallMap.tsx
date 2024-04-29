"use client";

import React, { PropsWithChildren, Suspense, useEffect, useState } from "react";
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
import { BadgeCheckIcon, SlashIcon, XCircleIcon, XIcon } from "lucide-react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const SmallMap = ({
  children,
  // markers = [],
}: PropsWithChildren<{}>) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const pt = searchParams.get("pt");
  const t3 = searchParams.get("t3");
  const ptUrlParams = pt ? `&pt=${pt}` : "";
  const t3UrlParams = t3 ? `&t3=${t3}` : "";
  const [isShowingResults, setIsShowingResults] = useState(false);
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
      clickableIcons={false}
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
      onClick={async (arg) => {
        const { latLng } = arg.detail || {};
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&result_type=locality&key=${API_KEY}`;
        const resp = await fetch(url);
        const data = await resp.json();
        const formattedAddress = data?.results?.[0]?.formatted_address;
        const tokens = formattedAddress?.toLowerCase()?.split(",");
        const city = tokens[0].replace(/\s/g, "-");
        const state = tokens[1].replace(/\s/g, "");
        const cityId = `${city}-${state.slice(0, 2)}`;
        console.log("args", cityId);
        // router.push(`/explore/${cityId}?zoom=off${ptUrlParams}${t3UrlParams}&`);
      }}
      // minZoom={5}
      // maxZoom={16}
    >
      {children}
      <Suspense>
        <>
          {true && (
            <Button
              onClick={() => setIsShowingResults(!isShowingResults)}
              variant={"ghost"}
              className={`${searchParams.get("t3") ? "animate-fadeInDelayed_" : ""} absolute top-2 right-0 mr-2 z-50 ${isShowingResults ? "" : "bg-gray-50 shadow-md"} `}
              size={"icon"}
            >
              {isShowingResults ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <BadgeCheckIcon className="h-8 w-8 my-1  mx-auto text-blue-500 opacity-80 " />
              )}
            </Button>
          )}
          {true && (
            <div
              className={`${isShowingResults ? "-translate-x-[0%]" : "translate-x-[110%]"} transition-all duration-500 absolute top-2 right-0 mr-2 z-10 border-0 border-white/50 w-[760px] h-[344px] rounded-md py-2 px-8 bg-gray-200/95`}
            >
              <div className="flex items-center capitalize mb-4 mt-2 font-semibold">
                Popular Categories <SlashIcon className="h-4 w-4 mx-3" />{" "}
                {params.hub}
              </div>
              <div className="grid grid-cols-12 gap-3">
                {[
                  ["restaurant", "burger"],
                  ["restaurant", "steak"],

                  ["restaurant", "wings"],
                  ["restaurant", "wine"],
                  ["coffeehouse", "coffee"],
                  ["coffeehouse", "pastries"],
                  ["hotel", "dining"],
                  ["hotel", "location"],
                ].map((item, i) => (
                  <div className="col-span-2" key={i}>
                    <Button
                      asChild
                      onClick={() => setIsShowingResults(false)}
                      variant={"outline"}
                      className="block pt-4 bg-muted text-muted-foreground text-center w-full h-[132px]"
                    >
                      <Link
                        className="flex flex-col gap-0.5"
                        href={`/explore/${params.hub}?pt=${item[0]}&t3=${item[1]}`}
                      >
                        <div className="text-md mb-1 capitalize">{item[0]}</div>

                        <BadgeCheckIcon className="h-7 w-7 my-1  mx-auto text-blue-500 opacity-80 " />
                        <div className="text-lg font-semibold capitalize">
                          {item[1]}
                        </div>
                      </Link>
                    </Button>
                  </div>
                ))}

                <div className="font-semibold mb-0 hidden">Popular</div>
              </div>
            </div>
          )}
        </>
      </Suspense>
    </Map>
  );
};
export default SmallMap;
