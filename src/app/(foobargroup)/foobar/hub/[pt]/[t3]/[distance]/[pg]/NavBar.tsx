import Image from "next/image";
import { useMapContext } from "@/components/MapContext";
import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function NavBar({ children }: any) {
  // map?.addListener("mousemove", (...args) => console.log("m", ...args));
  return (
    <div className="flex items-center justify-between mx-8 mt-8 mb-0 rounded-md px-6 py-2 bg-muted">
      {children}
    </div>
  );
}
