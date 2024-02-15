"use client";

import * as React from "react";
import {
  CheckIcon,
  PlusCircledIcon,
  MixerHorizontalIcon,
  MixerVerticalIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { getHubUrl, tagDefinitions } from "@/lib/tags";
import { useFilterContext } from "./FilterContext";
import useLocalStorage from "./useLocalStorage";
import { useCookies } from "react-cookie";
import { FilterOptions } from "@/lib/filters";

type TagOptions = Array<{ value: string; label: string; active?: boolean }>;

interface DataTableFacetedFilterProps<TData, TValue> {
  // column?: Column<TData, TValue>;
  title?: string;
  options?: {
    label: string;
    value: string;
    active?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  initialActiveTags: string[];
  hub: string;
  primaryTag: "person" | "place";
  filterOptions: FilterOptions;
  filterId: string;
  //onFilterChange?: (tags: string[]) => void;
}

const tagDisplayThreshold = 4;

export function TagFilter<TData, TValue>({
  initialActiveTags = [],
  // column,
  title,
  options, // for test & storybook stories
  hub,
  primaryTag,
  filterOptions,
  filterId,
  // onFilterChange,
}: // onChange,
DataTableFacetedFilterProps<TData, TValue>) {
  const params = useParams();

  const optionsToUse = filterOptions; // tagOptionsPlace; // || storedPlaceFilteredOptions;
  console.log("optionsToUse@@", filterOptions, optionsToUse);
  const cookieName = `filter-${filterId}-${primaryTag}`;
  const router = useRouter();
  const [cookies, setCookie] = useCookies([cookieName]);
  const activeTags =
    optionsToUse
      ?.filter((option) => option.active === true)
      .map((option) => option.value) || [];

  const [activeTagPendingCommit, onChange] = useState(activeTags);
  console.log("activeTags", activeTags, optionsToUse);
  console.log("activeTagPendingCommit", activeTagPendingCommit);

  const onFilterChange = (activeTagIds: string[]) => {
    const url = getHubUrl(hub, primaryTag, activeTagIds);
    console.log("activeTagOptions", activeTagIds);

    setCookie(cookieName, activeTagIds.join(","));
    console.log("client cookie", cookies);
    router.push(url);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-12 border">
          <MixerVerticalIcon className="mr-2 h-4 w-4 stroke-1" />
          <span className="hidden md:inline-block font-light">{title}</span>
          {activeTags.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-6" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {" "}
                {/* lg:hidden  */}
                {activeTags.length > tagDisplayThreshold
                  ? activeTags.length
                  : activeTags.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {activeTags.length > tagDisplayThreshold ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal bg-transparent hover:bg-transparent"
                  >
                    {/* {activeTags.length} selected */}
                    {activeTags.length} selected
                  </Badge>
                ) : (
                  activeTags.map((tag) => (
                    <Badge
                      variant="secondary"
                      key={tag}
                      className="rounded-sm px-1 font-light"
                    >
                      {tag}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          {/* <CommandInput placeholder={title} /> */}
          <CommandList>
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            <CommandGroup>
              {optionsToUse?.map((option) => {
                const isSelected = activeTagPendingCommit.includes(
                  option.value
                );
                return (
                  <CommandItem
                    className="py-4 md:py-2"
                    key={option.value}
                    onSelect={() => {
                      // router.push("/");

                      if (isSelected) {
                        onChange(
                          activeTagPendingCommit.filter(
                            (tag) => tag !== option.value
                          )
                        );
                      } else {
                        onChange(
                          activeTagPendingCommit.concat(option.value as string)
                        );
                      }
                      // const filterValues = Array.from(selectedValues);
                      // column?.setFilterValue(
                      //   filterValues.length ? filterValues : undefined
                      // );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {
                      //option.icon && (
                      // <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      //)
                    }

                    <span>{option.label}</span>
                    {option.active && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {null}A
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {true && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      !!onFilterChange &&
                        onFilterChange(activeTagPendingCommit);
                    }}
                    className="justify-center text-center aria-disabled:opacity-50 aria-disabled:cursor-not-allowed cursor-pointer"
                    disabled={
                      JSON.stringify(activeTagPendingCommit) ===
                      JSON.stringify(activeTags)
                    }
                  >
                    Apply
                    {/* {JSON.stringify(activeTagPendingCommit)} ::{" "}
                    {JSON.stringify(activeTags)} */}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
