import { PropsWithChildren, ReactNode } from "react";
import FoobarMap from "./foobar/explore/[hub]/[pt]/[t3]/[distance]/[pg]/FoobarMap";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-8">
        <div className="flex w-full sticky top-[64px]">
          {foobarmapaside}
          <FoobarMap>{foobarmap}</FoobarMap>
        </div>

        <div className="bg-gray-50 relative z-10">{children}</div>
      </div>
      <div className="bg-gray-100 hidden md:block md:col-span-4">
        {foobarsidebar}
      </div>
    </div>
  );
}
