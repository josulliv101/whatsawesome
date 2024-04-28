"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { BuildingIcon, FolderSearch, LockIcon } from "lucide-react";
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
      className="w-full relative flex capitalize justify-center mt-0 h-20 rounded-md font-semibold text-2xl gap-4"
      asChild
    >
      <Link className="flex items-center" href={`/explore/${hubToUse}`}>
        {typeof hubToUse === "string" && hubToUse.replaceAll("-", " ")}{" "}
        {/* <div className="text-xl border-t border-muted/40 pt-2 mt-2">
          Categories
        </div> */}
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
