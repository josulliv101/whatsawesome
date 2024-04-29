"use client";

import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useParams, usePathname, useRouter } from "next/navigation";
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
import { fetchSearchResults, searchLocations } from "@/lib/search";
import { config } from "@/lib/config";
import {
  BadgeCheckIcon,
  CreditCard,
  LinkIcon,
  MapPinIcon,
  Settings,
  TextSearch,
  User,
} from "lucide-react";
import { tagDefinitions } from "@/lib/tags";

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

export function CommandMenu({
  placeHolderText = "Search by city/town, name of business or category",
  small,
  ...props
}: DialogProps & { placeHolderText?: string; small?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    Array<{ name: string; id: string; isCity?: boolean }>
  >([]);
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
      const results = await searchLocations(val);
      console.log("SEARCH", results);
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
    (item: { name: string; id: string; isCity?: boolean; isTag?: boolean }) => {
      setOpen(false);
      clearState();
      console.log(item);
      if (!item?.isCity && !item.isTag) {
        router.push(`/profile/${item.id}`);
      } else if (item?.isTag) {
        const pt = tagDefinitions[item.id].parentTag;
        router.push(`/explore/${params.hub || "all"}?pt=${pt}&t3=${item.id}`);
      } else {
        router.push(`/explore/${item.id}`);
      }
    },
    []
  );

  // const placeHolderText = ; // params.hub || "Search";
  const resultsCities = results.filter((item) => item.isCity);
  const resultsProfiles = results.filter((item) => !item.isCity);
  const tagsMatchingSearchValue = Object.keys(tagDefinitions)
    .filter((key) => !["all", "person", "place", "profile"].includes(key))
    .filter((key) => key.startsWith(value))
    .map((key) => ({ id: key, name: key, isTag: true }));
  return (
    <>
      <Button
        variant="outline"
        className={cn(
          `relative px-4 hover:bg-white   max-w-[320px]_ w-full  justify-between rounded-[0.5rem] bg-background font-normal text-muted-foreground shadow-none`,
          small ? "h-12 md:px-4 md:pr-10" : "h-16 text-lg md:px-6 md:pr-12"
        )}
        onClick={() => {
          clearState();
          setOpen(true);
        }}
        {...props}
      >
        <span className="hidden md:inline-flex capitalize_">
          <TextSearch
            className={`mr-0 md:mr-2 ${small ? "h-6 w-6" : "h-8 w-8"} shrink-0 opacity-100 md:opacity-50 relative left-0 md:left-[-6px]`}
          />
          <span className="pt-0.5">{placeHolderText}</span>
        </span>
        <span className="inline-flex md:hidden capitalize">
          <TextSearch className="mr-0 md:mr-2 h-6 w-6 shrink-0 opacity-100 md:opacity-50 relative left-0 md:left-[-6px]" />
          <span className="hidden md:block">{placeHolderText}</span>
        </span>
        <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-80 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          // ref={inputRef}
          placeholder="Search by city/town or name of business"
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

          {value.trim() && !!results.length && (
            <>
              <CommandGroup heading={`Results: ${results.length}`}>
                {[
                  ...resultsCities,
                  ...tagsMatchingSearchValue,
                  ...resultsProfiles,
                ].map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center gap-3"
                  >
                    {item.isCity && (
                      <MapPinIcon className="h-16  w-16 stroke-1" />
                    )}
                    {item.isTag && (
                      <BadgeCheckIcon className="h-16  w-16 stroke-2 text-blue-500" />
                    )}
                    {!item.isCity && !item.isTag && (
                      <CircleIcon className="scale-75 stroke-1" />
                    )}
                    {item.isCity ? "Explore " : ""}
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          {/* <CommandGroup heading="Hubs">
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
          </CommandGroup> */}
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
