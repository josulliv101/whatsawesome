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
import { tagDefinitions } from "@/lib/tags";
import { Badge } from "@/components/ui/badge";

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
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !selectedValue && "text-muted-foreground"
            )}
          >
            {selectedValue ? selectedValue : "Select tag"}
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
                      option === selectedValue ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="cursor-pointer" onClick={() => onMinorTagChange("")}>
          all
        </Badge>
        {tagDefinitions[selectedValue]?.tags.map((tag: string) => (
          <Badge
            key={tag}
            className="cursor-pointer"
            onClick={() => onMinorTagChange(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </>
  );
}
