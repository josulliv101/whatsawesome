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
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { tagDefinitions } from "@/lib/tags";
import { Suspense, useEffect, useState } from "react";

export function BreadcrumbSideContent() {
  const params = useParams();

  const searchParams = useSearchParams();
  const pt = searchParams.get("pt");
  const st = searchParams.get("st");

  const hub = Array.isArray(params.hub) ? params.hub[0] : params.hub ?? "";
  const [prevHub, setPrevHub] = useState(hub);
  const [prevPrimaryTag, setPrevPrimaryTag] = useState(pt);

  useEffect(() => {
    if (hub) {
      setPrevHub(hub);
    }
    if (pt) {
      setPrevPrimaryTag(pt);
    }
  }, [hub, pt]);
  return (
    <Breadcrumb className="px-4 pt-2 pb-2 border-r font-semibold">
      <BreadcrumbList>
        <BreadcrumbItem className="capitalize">
          <BreadcrumbPage>Discover Excellence</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {/* <BreadcrumbItem className="capitalize">
          <BreadcrumbPage>Most Backed</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator> */}
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
              {(hub || prevHub).replace("-", " ")}{" "}
              {hub === "all" ? "locations" : ""}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/explore">All</Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled asChild>
                <Link href="/arlington-ma">Arlington, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/boston">Boston, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/cambridge-ma">Cambridge, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled asChild>
                <Link href="/lexington-ma/place">Lexington, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled asChild>
                <Link href="/somerville-ma/place">Somerville, MA</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
              {(searchParams.get("pt") || prevPrimaryTag) ?? "all categories"}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild className="capitalize">
                <Link href={`/explore/${hub}`}>all</Link>
              </DropdownMenuItem>
              {[
                ...tagDefinitions.place.children,
                ...tagDefinitions.person.children,
              ]
                .sort()
                .map((tag) => {
                  return (
                    <DropdownMenuItem key={tag} asChild className="capitalize">
                      <Link href={`/explore/${hub}?pt=${tag}`}>{tag}</Link>
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        {pt === "restaurant" && (
          <>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="capitalize">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
                  {st ?? "All"}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild className="capitalize">
                    <Link href={`/explore/${hub}?pt=${pt}`}>all</Link>
                  </DropdownMenuItem>
                  {(tagDefinitions.restaurant.children as Array<string>)
                    .sort()
                    .map((tag) => {
                      return (
                        <DropdownMenuItem
                          key={tag}
                          asChild
                          className="capitalize"
                        >
                          <Link href={`/explore/${hub}?pt=${pt}&st=${tag}`}>
                            {tag}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function BreadcrumbSide() {
  return (
    <Suspense>
      <BreadcrumbSideContent />
    </Suspense>
  );
}
