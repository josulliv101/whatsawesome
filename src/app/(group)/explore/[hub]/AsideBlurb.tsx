"use client";

import { config } from "@/lib/config";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

export default function AsideBlurb() {
  const params = useParams();
  const searchParams = useSearchParams();

  return (
    <p>
      <span className="font-semibold">Blue Mushroom</span> is your resource for
      discovering excellence in the world around you.
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
