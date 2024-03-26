"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getHubTags, tagDefinitions } from "@/lib/tags";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import Link from "next/link";

const OPTIONS = [
  ...tagDefinitions.person.children,
  ...tagDefinitions.place.children,
].sort();

export function FilterSelector({
  options = OPTIONS,

  selectedValue,
  minorTag,
  onChange,
  onMinorTagChange,
}: {
  options?: Array<string>;
  selectedValue: string;

  minorTag?: string;
  onChange: any;
  onMinorTagChange: any;
}) {
  const params = useParams();
  const [hub, primaryTag, secondaryTag] = params.tags || [];
  console.log("PPP", params);
  const tagsToUse = tagDefinitions[secondaryTag]?.tags || [];
  return (
    <>
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !secondaryTag && "text-muted-foreground"
            )}
          >
            {secondaryTag ? secondaryTag : "Select tag"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] max-h-[240px] overflow-auto p-0">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  className="py-2"
                  value={option}
                  key={option}
                  onSelect={() => {
                    onChange(option);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      option === secondaryTag ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover> */}
      <div className="flex items-center gap-2 mt-4 mb-3 ">
        {tagsToUse.map((tag: string) => (
          <Button
            key={tag}
            aria-selected={tag === minorTag}
            className="cursor-pointer aria-selected:bg-gray-100"
            onClick={() => onMinorTagChange(tag)}
            asChild
            size="sm"
            variant={"outline"}
          >
            <Link href={`/${hub}/place/${secondaryTag}/${tag}`}>{tag}</Link>
          </Button>
        ))}
      </div>
    </>
  );
}
