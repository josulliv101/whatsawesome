"use client";

import { config } from "@/lib/config";
import { fetchProfile } from "@/lib/firebase";
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
      for discovering excellence in the world around you.
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
