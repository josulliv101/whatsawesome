"use client";

import { config } from "@/lib/config";
import { fetchProfile } from "@/lib/firebase";
import { EqualIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStackedData } from "recharts/types/util/ChartUtils";

export default function AsideBlurb() {
  const params = useParams();
  const [profile, setProfile] = useState();
  const searchParams = useSearchParams();
  const activeId = searchParams.get("activeId");

  useEffect(() => {
    if (activeId) {
      async function getStackedData() {
        const p = await fetchProfile(activeId as string);
        setProfile(p);
      }
      getStackedData();
    } else {
      setProfile(undefined);
    }
  }, [activeId]);

  if (profile?.pic) {
    return (
      <Image
        className="w-[300px] aspect-square"
        src={profile.pic}
        alt=""
        width="200"
        height="200"
      />
    );
  }
  return (
    <p>
      <span className="font-semibold">Blue Mushroom</span> &mdash; your platform
      for discovering excellence in the world around you. &nbsp;More
      <img
        className="inline-block mr-1 ml-2 w-4 h-4 opacity-80 grayscale relative top-[-.5px]"
        src={config.logoPath}
        width="24"
        height="24"
      />{" "}
      <EqualIcon className="h-4 w-4 inline-block" /> more excellence.
    </p>
  );
  return (
    <>
      {/* <Separator className="my-5 h-px bg-muted-foreground/20" /> */}
      {searchParams.get("t3") || params.id ? (
        <p className="text-muted-foreground_">
          Vote below by leaving a
          <Image
            // id={marker.id}
            alt="vote"
            src={config.logoPath}
            width={15}
            height={15}
            className={`inline-flex ml-2 mr-1 grayscale opacity-80`}
          />{" "}
          on a company&apos;s area of excellence.
        </p>
      ) : (
        <p>
          <span className="font-semibold">Blue Mushroom</span> is your resource
          for discovering excellence in the world around you.
        </p>
      )}
    </>
  );
}
