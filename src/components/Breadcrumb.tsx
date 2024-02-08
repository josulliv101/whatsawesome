"use client";

import { config } from "@/lib/config";
import { Badge } from "./ui/badge";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const [history, setHistory] = useState([pathname]);

  useEffect(() => {
    setHistory([...history, pathname]);
  }, [pathname]);

  const [tokenGroup, tokenHub] = useSelectedLayoutSegments();
  const isHub = tokenGroup === "(group)" && tokenHub?.split?.("/")[0] !== "all";
  return (
    <div
      className={`${isHub ? "bg-muted" : ""} border-dashed text-muted-foreground h-[58px]`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-start  gap-4 p-4 lg:px-8 overflow-x-auto">
        {isHub && (
          <Badge
            variant={"default"}
            className="flex items-center gap-2 whitespace-nowrap py-1"
          >
            <Globe className="h-3 w-3" /> {tokenHub?.split?.("/")[0]}
          </Badge>
        )}
        {/* <Badge variant={"default"} className="">
          home
        </Badge>
        {pathname.startsWith("/view/") &&
          pathname.split("/").map((token) => (
            <Badge variant={"default"} className="">
              {token}
            </Badge>
          ))}
        {segments?.[0].startsWith("(group)") &&
          segments?.[1].split("/").map((token) => (
            <Badge variant={"default"} className="">
              {token}
            </Badge>
          ))} */}
      </div>
    </div>
  );
}
