"use client";

import { LockIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

export default function MapAside({}: {}) {
  const { hub } = useParams();
  if (!hub) {
    return null;
  }
  return (
    <div className="relative flex capitalize justify-center mt-12 py-4 px-4 text-white bg-black rounded-md font-semibold text-2xl">
      {typeof hub === "string" && hub.replaceAll("-", " ")}
      <LockIcon className="absolute top-2 right-2 w-4 h-4 text-white" />
    </div>
  );
}
