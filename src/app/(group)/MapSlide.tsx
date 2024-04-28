"use client";

import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

export default function MapSlide({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();
  const pt = searchParams.get("pt");
  return (
    <div
      className={`bg-gray-50 relative ${false ? "top-[-360px]" : "top-0"} transition-all duration-500`}
    >
      {children}
    </div>
  );
}
