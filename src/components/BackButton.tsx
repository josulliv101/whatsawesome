"use client";

import { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  BadgeCheckIcon,
  CheckIcon,
  ChevronLeftIcon,
  SlashIcon,
} from "lucide-react";
import { SideNav } from "@/app/(group)/@sidebar/explore/[hub]/ExcellenceItems";
import { getPlural } from "@/lib/tags";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default function BackButton({ hub }: any) {
  const router = useRouter();
  const params = useParams();
  const paramSearch = useSearchParams();
  const catalog = paramSearch.get("catalog");
  const handleClick = () => router.back();

  if (!params.id && !paramSearch.get("pt") && !paramSearch.get("catalog")) {
    return (
      <div className="relative w-full top-[48px]">
        <div className="w-full relative flex items-end justify-between gap-2 pt-0 mt-0 pb-4 px-4 flex-wrap capitalize">
          <div className="w-full flex flex-col items-start gap-1">
            <div className="w-full capitalize text-lg font-medium text-muted-foreground mb-1">
              Discover excellence in{" "}
              {(params.hub as string)?.replaceAll("-", " ")}
            </div>
            <div className="capitalize text-4xl font-bold flex items-center mb-[32px]">
              {/* {(params.hub as string)?.replaceAll("-", " ")} */}
              <BadgeCheckIcon className="h-8 w-8 mr-2 text-blue-500 opacity-80 hidden" />
              {!catalog ? `Choose a Category` : `Browse Profiles`}
            </div>
          </div>
        </div>
        <div className="text-muted-foreground absolute h-10 border-0 bottom-12 right-8 z-10 flex flex-row-reverse items-center gap-2"></div>
        <nav className="flex_ hidden items-center flex-row justify-between gap-2 px-4 pt-4 pb-1">
          <h4 className="relative rounded-sm text-xl bg-muted px-4 pt-2 mt-4 pb-2 font-normal text-muted-foreground mb-0 w-full flex items-center justify-between">
            <strong className="font-[500] text-balance_ flex-1 block whitespace-nowrap">
              Browse Catalog
            </strong>
            <div className="flex items-center gap-2"></div>
            <div className="flex_ items-center gap-4 shrink-0 hidden">
              {/* <Separator
                orientation="vertical"
                className="bg-gray-300 h-6 ml-3"
              />
              <AnalyticsButton /> */}
            </div>
          </h4>
        </nav>
      </div>
    );
  }
  return (
    <Button
      variant={"link"}
      onClick={handleClick}
      size="sm"
      className="h-8 relative_ top-4 absolute right-8"
    >
      <ChevronLeftIcon className="h-6 w-6" />
      Back
    </Button>
  );
}
