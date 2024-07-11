import { PropsWithChildren, ReactNode } from "react";

import FoobarMap from "./foobar/explore/[hub]/[pt]/[t3]/[distance]/[pg]/FoobarMap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Sidebar from "./Sidebar";

export default function RootFoobarLayout({
  children,
  foobarmap,
  foobarmapaside,
  foobarsidebar,
  params: { hub, pt, t3, distance },
}: PropsWithChildren<{
  foobarmap: ReactNode;
  foobarmapaside: ReactNode;
  foobarsidebar: ReactNode;
  params: any;
}>) {
  return (
    <>
      <div className="bg-gray-300">
        <div className="container mx-auto max-w-[1080px] py-6">
          <div className="grid grid-cols-12 rounded-lg">
            <div className="col-span-12 md:col-span-12 rounded-lg">
              <div className="flex w-full sticky_ top-[64px] gap-2">
                {foobarmapaside}
                <FoobarMap>{foobarmap}</FoobarMap>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-12">
          <div className="bg-gray-50 relative z-10">{children}</div>
        </div>
      </div>
      <div className="bg-gray-100 hidden md:block md:col-span-4">
        <Sidebar>{foobarsidebar}</Sidebar>
      </div>
    </>
  );
}
