"use client";

import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

// import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCallback, useState } from "react";
import { fetchSearchResults } from "@/lib/search";

const docsConfig = {
  mainNav: [
    {
      href: "/",
      title: "title",
      external: false,
    },
  ],
  sidebarNav: [
    {
      title: "titlea",
      items: [
        {
          href: "/",
          title: "title",
          external: false,
        },
      ],
    },
  ],
};

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Array<{ name: string; id: string }>>(
    []
  );
  const [value, setValue] = useState("");
  const debouncedSetValue = useDebouncedCallback((value) => {
    setValue(value);
  }, 400);

  const { setTheme } = useTheme();

  // const debouncedSetValue = useCallback(debounce(setValue, 300), []);

  // const debouncedSetValue = useCallback(
  //   debounce((value: string) => {
  //     console.log("debouncedSetValue", value);
  //     setValue(value);
  //   }, 600),
  //   []
  // );

  React.useEffect(() => {
    const handleSearchChange = async (val: string = "") => {
      const results = await fetchSearchResults(val);
      console.log("handle search", val, results);
      setResults(results);
    };
    handleSearchChange(value);
  }, [value]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => {
          setValue("");
          setResults([]);
          return !open;
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = React.useCallback(
    (item: { name: string; id: string }) => {
      setOpen(false);
      setValue("");
      setResults([]);
      console.log(item);
      router.push(`/profile/${item.id}`);
    },
    []
  );

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-30 lg:w-60"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          // ref={inputRef}
          placeholder="Search..."
          // value={value}
          defaultValue={value}
          onValueChange={debouncedSetValue}
        />
        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
          <CommandGroup heading="Results">
            {results.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
                onSelect={() => handleSelect(item)}
              >
                <FileIcon className="mr-2 h-4 w-4" />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
