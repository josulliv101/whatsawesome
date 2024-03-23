"use client";

import { ChevronDown, Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export function BreadcrumbSide() {
  const params = useParams();
  const searchParams = useSearchParams();
  const hub = Array.isArray(params.hub) ? params.hub[0] : params.hub ?? "";
  return (
    <Breadcrumb className="px-4 pt-6 pb-4">
      <BreadcrumbList>
        {" "}
        <BreadcrumbItem className="capitalize">
          <BreadcrumbPage>Blue Mushroom Most Backed</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink
            className="capitalize font-semibold"
            href={`/explore/${hub}`}
          >
            {hub}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {/* <BreadcrumbItem>
          <BreadcrumbLink className="capitalize" href={`/${hub}`}>
            {hub.replace("-", " ")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator> */}
        {/* <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
              {searchParams.get("pt") ?? "All"}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href={`/explore/${hub}`}>All</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/explore/${hub}?pt=coffeehouse`}>Coffeehouse</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/explore/${hub}?pt=college`}>College</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/explore/${hub}?pt=comedian`}>Comedian</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/explore/${hub}?pt=hotel`}>Hotel</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem> */}
        <BreadcrumbItem className="capitalize">
          <BreadcrumbPage>{searchParams.get("pt") ?? "All"}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
