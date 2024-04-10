"use client";

import { Button } from "@/components/ui/button";
import { BuildingIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useRef } from "react";

export default function MapAside({}: {}) {
  const { hub } = useParams();
  const prevHub = usePreviousHub();

  const hubToUse = hub || prevHub;
  if (!hubToUse) {
    return null;
  }
  return (
    <Button
      className="w-full relative flex capitalize justify-center mt-12 h-16 rounded-md font-semibold text-2xl"
      asChild
    >
      <Link href={`/explore/${hubToUse}`}>
        {typeof hubToUse === "string" && hubToUse.replaceAll("-", " ")}
      </Link>
    </Button>
  );
}

const usePreviousHub = () => {
  const { hub } = useParams();

  const ref = useRef<string | null>(null);

  useEffect(() => {
    if (hub) {
      ref.current = hub as string;
    }
  }, [hub]);

  return ref.current;
};
