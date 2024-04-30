"use client";

import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function Marker({ id = "", ...props }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  function handleClick() {
    const pt = searchParams.get("pt");
    const t3 = searchParams.get("t3");
    const tokens = id.split("/");
    console.log("*", tokens[1]);
    router.push(
      `/explore/${params.hub}?activeId=${tokens[1]}${t3 ? "&t3=" + t3 : ""}${pt ? "&pt=" + pt : ""}`
    );
  }
  return <AdvancedMarker {...props} onClick={handleClick} />;
}
