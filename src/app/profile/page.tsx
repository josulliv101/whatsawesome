import { PropsWithChildren } from "react";

export default function Page({ params: { id } }: { params: any }) {
  return <div>main root profile {id}</div>;
}
