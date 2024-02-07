"use client";

import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter } from "next/navigation";
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
  CommandItemLink,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCallback, useEffect, useState } from "react";
import { fetchSearchResults } from "@/lib/search";
import { config } from "@/lib/config";
import { CreditCard, LinkIcon, Settings, User } from "lucide-react";

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
  const pathname = usePathname();
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

  useEffect(() => {
    console.log(`Route changed to: ${pathname}`);
    setOpen(false);
    clearState();
  }, [pathname]);

  useEffect(() => {
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

  const clearState = () => {
    setValue("");
    setResults([]);
  };
  const handleSelect = React.useCallback(
    (item: { name: string; id: string }) => {
      setOpen(false);
      clearState();
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
        onClick={() => {
          clearState();
          setOpen(true);
        }}
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
          placeholder="Search for people & places"
          // value={value}
          defaultValue={value}
          onValueChange={debouncedSetValue}
        />
        <CommandList>
          {value && !results.length && (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
            </>
          )}

          {!!results.length && (
            <>
              <CommandGroup heading={`Results: ${results.length}`}>
                {results.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center gap-3"
                  >
                    <img
                      className="h-3.5  w-auto grayscale"
                      src={config.logoPath}
                      alt="whatsawesome"
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          <CommandGroup heading="Hubs">
            <CommandItemLink
              href="/view/all/place/city"
              // onClickCapture={clearState}
            >
              <LinkIcon className="mr-2 h-3 w-3" />
              <span>Cities</span>
            </CommandItemLink>
            <CommandItemLink href="/view/all/place/college">
              <LinkIcon className="mr-2 h-3 w-3" />
              <span>Colleges & Universities</span>
            </CommandItemLink>
          </CommandGroup>
          {/* <CommandSeparator /> */}
          <CommandGroup heading="Company">
            <CommandItemLink href="/about">
              <LinkIcon className="mr-2 h-3 w-3" />
              <span>About</span>
            </CommandItemLink>
            <CommandItemLink href="/faq">
              <LinkIcon className="mr-2 h-3 w-3" />
              <span>FAQ</span>
            </CommandItemLink>
            <CommandItemLink href="/suggest">
              <LinkIcon className="mr-2 h-3 w-3" />
              <span>Suggest</span>
            </CommandItemLink>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
