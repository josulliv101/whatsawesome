import { PropsWithChildren } from "react";

export default function Template({
  children,
  params: { hub } = {},
  searchParams: { pt, st } = {},
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  return children;
}
