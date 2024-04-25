"use client";

import {
  BadgeCheckIcon,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronLeftCircleIcon,
  ChevronRight,
  ChevronRightCircleIcon,
  Slash,
} from "lucide-react";

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
import { CommandMenu } from "./CommandMenu";
import { Separator } from "./ui/separator";
import { toast } from "sonner";

export function BreadcrumbSideContent() {
  const params = useParams();

  const searchParams = useSearchParams();
  const pt = searchParams.get("pt");
  const t3 = searchParams.get("t3");

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
    <Breadcrumb className="px-4 py-1.5 h-12 border-r font-semibold flex items-center justify-between w-full">
      <BreadcrumbList>
        {/* <BreadcrumbItem className="capitalize">
          <BreadcrumbPage>Discover Excellence</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator> */}

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
              {/* <DropdownMenuItem asChild>
                <Link href="/explore">All</Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <Link href="/explore/arlington-ma">Arlington, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/bedford-ma">Bedford, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/boston">Boston, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/burlington-ma">Burlington, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/cambridge-ma">Cambridge, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/lexington-ma">Lexington, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/medford-ma">Medford, MA</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore/somerville-ma">Somerville, MA</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink className="capitalize" asChild>
            <Link href={`/explore/${hub}`}>Categories</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pt && (
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
        )}
        {/* <BreadcrumbItem>
          <BreadcrumbLink className="capitalize" href={`/${hub}`}>
            {hub.replace("-", " ")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator> */}
        {pt && (
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
                  "restaurant",
                  "coffeehouse",
                  "hotel",
                  "museum",
                  // ...tagDefinitions.place.children,
                  // ...tagDefinitions.person.children,
                ]
                  .sort()
                  .map((tag) => {
                    return (
                      <DropdownMenuItem
                        key={tag}
                        asChild
                        className="capitalize"
                      >
                        <Link href={`/explore/${hub}?pt=${tag}`}>{tag}</Link>
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
        {/* {pt === "restaurant" && (
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
        )} */}
      </BreadcrumbList>
      {!params.id && pt && (
        <div className="flex justify-end items-center gap-2 pr-2 font-semibold text-muted-foreground text-sm">
          {t3 && (
            <>
              <BadgeCheckIcon
                className={`h-4 w-4 -mr-1 text-blue-500 opacity-80`}
              />{" "}
              <span className="capitalize">{t3}</span>
              Excellence
            </>
          )}
          {!pt && !t3 && <>Popular areas of excellence </>} in{" "}
          <span className="capitalize px-0">{hub}.</span>
          <Separator orientation="vertical" className="h-4 mx-2 bg-gray-300" />
          Showing results 1-10 of 100.
          <Separator orientation="vertical" className="h-4 mx-2 bg-gray-300" />
          <div className="flex items-center relative gap-0 ">
            <Button
              className="min-w-0 w-8 px-0"
              size="sm"
              variant="ghost"
              disabled
              onClick={() =>
                toast(
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      Functionality not yet implemented.
                    </code>
                  </pre>
                )
              }
            >
              <ChevronLeftCircleIcon className="h-6 w-6 mx-0 stroke-1" />
            </Button>
            <Button
              className="min-w-0 w-8 px-0"
              size="sm"
              variant="ghost"
              onClick={() =>
                toast(
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      Functionality not yet implemented.
                    </code>
                  </pre>
                )
              }
            >
              <ChevronRightCircleIcon className="h-6 w-6 mx-0 stroke-1" />
            </Button>
          </div>
        </div>
      )}
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
