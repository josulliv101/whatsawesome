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
import { tagDefinitions } from "@/lib/tags";

export function BreadcrumbWithDropdown() {
  const params = useParams();
  const searchParams = useSearchParams();
  const hub = Array.isArray(params.hub) ? params.hub[0] : params.hub ?? "";
  return (
    <Breadcrumb className="px-4 py-4 mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="capitalize font-semibold" href={`/`}>
            Blue Mushroom Catalog
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
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
              {hub.replace("-", " ")}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem disabled asChild>
                <Link href="/arlington-ma/place">Arlington, MA</Link>
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
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
              {searchParams.get("pt") ?? "All"}
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
        {/* <BreadcrumbItem>
          <BreadcrumbPage>Coffeehouse</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
