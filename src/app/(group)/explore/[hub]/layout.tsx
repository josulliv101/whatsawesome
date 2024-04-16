import { PropsWithChildren } from "react";

export default function Page({
  children,
  params: { hub },
  // searchParams: { pt, st },
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  return children;
}
