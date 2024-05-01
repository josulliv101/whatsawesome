import { PropsWithChildren, ReactNode } from "react";
import FoobarMap from "./foobar/[hub]/[pt]/[t3]/[distance]/FoobarMap";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootFoobarLayout({
  children,
  foobarmap,
  params: { hub, pt, t3, distance },
}: PropsWithChildren<{
  foobarmap: ReactNode;
  params: any;
}>) {
  return (
    <>
      <FoobarMap>{foobarmap}</FoobarMap>

      {children}
    </>
  );
}
