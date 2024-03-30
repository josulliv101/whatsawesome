"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Preset {
  id: string;
  name: string;
}

export const data: Array<Preset> = [
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Sort by recommended",
  },
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Sort by most backed",
  },
  {
    id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f",
    name: "Sort by profile name (asc)",
  },
];

export function PresetSelector({
  presets = data,
  ...props
}: {
  presets?: Array<Preset>;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<Preset>(data[0]);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[210px] lg:max-w-[210px]"
        >
          {selectedPreset ? selectedPreset.name : "Load a preset..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search presets..." />
          <CommandEmpty>No presets found.</CommandEmpty>
          <CommandGroup heading="Examples">
            {presets.map((preset) => (
              <CommandItem
                key={preset.id}
                onSelect={() => {
                  setSelectedPreset(preset);
                  setOpen(false);
                }}
              >
                {preset.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedPreset?.id === preset.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup className="pt-0">
            <CommandItem onSelect={() => router.push("/examples")}>
              More examples
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
