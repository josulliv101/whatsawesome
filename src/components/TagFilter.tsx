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

type TagOptions = Array<{ value: string; label: string; active?: boolean }>;

interface DataTableFacetedFilterProps<TData, TValue> {
  // column?: Column<TData, TValue>;
  title?: string;
  // options?: {
  //   label: string;
  //   value: string;
  //   icon?: React.ComponentType<{ className?: string }>;
  // }[];
  activeTags: string[];
  hub: string;
  primaryTag: "person" | "place";
  //onFilterChange?: (tags: string[]) => void;
}

export function TagFilter<TData, TValue>({
  activeTags,
  // column,
  title,
  // options,
  hub,
  primaryTag,
  // onFilterChange,
}: // onChange,
DataTableFacetedFilterProps<TData, TValue>) {
  const [activeTagPendingCommit, onChange] = useState(activeTags);
  const params = useParams();

  const tagOptionsPlace = tagDefinitions.place.children.map((tag) => ({
    label: tag,
    value: tag,
    active: params.tags.includes(tag),
  }));

  const [storedPlaceFilteredOptions, setStoredPlaceFilteredOptions] =
    useLocalStorage<TagOptions>("placeFilterOptions", tagOptionsPlace);

  console.log("storedPlaceFilteredOptions@@", storedPlaceFilteredOptions);
  // const options = useFilterContext();
  // const facets = column?.getFacetedUniqueValues();
  const selectedValues = { size: activeTags.length, has: () => true }; //new Set(column?.getFilterValue() as string[]);
  const router = useRouter();
  const onFilterChange = (activeTagIds: string[]) => {
    const url = getHubUrl(hub, primaryTag, activeTagIds);
    console.log("activeTagOptions", activeTagIds);
    router.push(url);
  };

  // React.useEffect(() => {
  //   const url = `/${hub}/${tagPrimary}/${activeTagPendingCommit.join("/")}`;
  //   router.push(url);
  // }, [activeTagPendingCommit]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-10 border">
          <MixerVerticalIcon className="mr-2 h-4 w-4" />
          {/* {title} */}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-6" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 4 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal bg-transparent hover:bg-transparent"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  storedPlaceFilteredOptions
                    .filter(({ value, active }) => active === true)
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
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
              {storedPlaceFilteredOptions?.map((option) => {
                const isSelected = option.active;
                return (
                  <CommandItem
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
                    {true && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {null}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
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
