import { PropsWithChildren } from "react";

export default function Page({
  params: { hub },
  searchParams: { pt, st },
}: {
  params: any;
  searchParams: any;
}) {
  return <div>hello page</div>;
}
