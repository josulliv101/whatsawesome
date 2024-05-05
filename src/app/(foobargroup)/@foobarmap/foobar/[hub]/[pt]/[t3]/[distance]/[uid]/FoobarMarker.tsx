"use client";

import Image from "next/image";
import { Marker, AdvancedMarker } from "@vis.gl/react-google-maps";
import { config } from "@/lib/config";
import { CheckIcon } from "lucide-react";

const bgColor = "bg-[#4c98fd]";

export default function FoobarMarker(props: any) {
  const size = 24;
  const marker = {};
  return (
    <AdvancedMarker {...props}>
      <div
        style={{
          width: size,
          height: size,

          //  position: "absolute",
          // top: 0,
          // left: 0,
          // background: "#1dbe80",
          // border: "2px solid #0e6443",
          // borderRadius: "50%",
          // transform: "translate(-50%, -50%)",
          // opacity: isActiveMarker
          //   ? activeId === profileId
          //     ? 1
          //     : 0.5
          //   : 1,
        }}
        className={`relative z-10 animate-fadeIn drop-shadow-md_ ${marker ? bgColor + " border-4" : ""}  border-white ${marker.isCity ? "rounded-md" : "rounded-full"} origin-bottom-right transition-all duration-500  flex gap-0.5 items-center justify-center `}
      ></div>
    </AdvancedMarker>
  );
}
