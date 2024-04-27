"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function ProfileList({ profileMap }: any) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div ref={ref} className="bg-blue-100 absolute top-[270px]">
      &nbsp;
      <div
        className={`transition-all duration-700 ease-in_ ${!inView ? "translate-y-[74%] opacity-100 scale-100" : "translate-y-[85%] opacity-0 scale-95"} h-[calc(100%-64px)] fixed bottom-20 right-0 border z-50 bg-muted w-1/3  py-2 px-8 text-xl font-semibold capitalize flex flex-col gap-2`}
      >
        <h2 className="text-muted-foreground text-lg py-2 flex items-center justify-between">
          Restaurants / Results 1-10
          <Button size="sm" variant={"secondary"}>
            View All 10
          </Button>
        </h2>
        <div className="grid grid-cols-12 gap-x-2 gap-y-8">
          {true &&
            Object.keys(profileMap).map((id, i) => (
              <Link
                href={`/profile/${id}`}
                key={i}
                className="w-full aspect-square text-sm block col-span-4  max-h-48"
              >
                {profileMap[id].parentPhotoUrl && (
                  <div className="w-full aspect-square max-h-96 flex flex-col items-center gap-4 rounded-md">
                    <Image
                      width="120"
                      height="120"
                      className="w-full h-44 object-cover rounded-md"
                      src={profileMap[id].parentPhotoUrl}
                      alt=""
                    />
                    <div className=" text-balance text-center">
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
