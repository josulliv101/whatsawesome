"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProfileList({ profileMap }: any) {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(true);
  const pt = searchParams.get("pt");
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    initialInView: true,
  });

  useEffect(() => {
    // setTimeout(() => setIsMounted(true), 2500);
  }, []);
  // console.log("inView", inView);
  if (!ref || !isMounted || !pt || inView === null) {
    // return null;
  }

  return (
    <div
      // ref={ref}
      className={`sticky__ absolute_ z-20 p-4 mt-4 rounded-md mx-8 bg-muted top-[90px] ${false ? "none" : "block"}`}
    >
      <div
        className={`transition-all duration-700 ease-in_ ${true ? "__translate-y-[88%] opacity-100 scale-100 " : "__translate-y-[85%] opacity-0 scale-95"} __h-[calc(100%-64px)] __fixed __bottom-20 __left-0 border z-50 bg-muted w-2/3__  _py-2 px-0 text-xl font-semibold capitalize_ flex flex-col gap-2`}
      >
        <h2 className="hidden text-muted-foreground text-lg py-2 flex items-center justify-between">
          Top results belong to:
        </h2>
        <div className="grid grid-cols-5 gap-x-4 gap-y-4">
          {true &&
            Object.keys(profileMap).map((id, i) => (
              <Link
                href={`/profile/${id}`}
                key={i}
                className="w-full aspect-square text-sm block col-span-1"
              >
                {profileMap[id].parentPhotoUrl && (
                  <div className="w-full aspect-square max-h-96 flex flex-col items-center gap-4 rounded-md">
                    <Image
                      width="120"
                      height="120"
                      className="w-48 h-48 object-cover rounded-md"
                      src={profileMap[id].parentPhotoUrl}
                      alt=""
                    />
                    <div className="hidden text-balance text-center">
                      {profileMap[id].name}
                    </div>
                  </div>
                )}
                {!profileMap[id].parentPhotoUrl && (
                  <div className="text-xl text-white h-full w-full text-center bg-black text-balance p-4 flex items-center justify-center">
                    {profileMap[id].name}
                  </div>
                )}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
