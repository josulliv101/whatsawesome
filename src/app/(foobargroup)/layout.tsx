import { PropsWithChildren, ReactNode } from "react";
import FoobarMap from "./foobar/[hub]/[pt]/[t3]/[distance]/FoobarMap";

export default function RootFoobarLayout({
  children,
  foobarmap,
  params: { hub, tags = [] },
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
