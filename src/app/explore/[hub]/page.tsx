import { PropsWithChildren } from "react";

export default function Page({
  params: { hub },
  searchParams: { pt, st },
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  return <div>hello page</div>;
}
