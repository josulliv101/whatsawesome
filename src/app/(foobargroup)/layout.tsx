import { PropsWithChildren, ReactNode } from "react";
import FoobarMap from "./foobar/[hub]/[pt]/[t3]/[distance]/FoobarMap";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootFoobarLayout({
  children,
  foobarmap,
  foobarsidebar,
  params: { hub, pt, t3, distance },
}: PropsWithChildren<{
  foobarmap: ReactNode;
  foobarsidebar: ReactNode;
  params: any;
}>) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-8">
        <FoobarMap>{foobarmap}</FoobarMap>
        {children}
      </div>
      <div className="bg-gray-100 hidden md:block md:col-span-4">
        {foobarsidebar}
      </div>
    </div>
  );
}
