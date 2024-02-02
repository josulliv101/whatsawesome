"use client";

import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { config } from "@/lib/config";
import { PrimaryTagType, getHubTags, tagDefinitions } from "@/lib/tags";
import useLocalStorage from "./useLocalStorage";
import { useParams } from "next/navigation";

type TagOptions = Array<{ value: string; label: string; active?: boolean }>;
const FilterContext = createContext<TagOptions>([]);

export function FilterContextProvider({
  children,
  initialValue,
}: PropsWithChildren<{ initialValue?: TagOptions }>) {
  const params = useParams();
  console.log("params changes", params);

  const tagOptionsPlace = tagDefinitions.place.children.map((tag) => ({
    label: tag,
    value: tag,
    active: params.tags.includes(tag),
  }));

  const [storedPlaceFilteredOptions, setStoredPlaceFilteredOptions] =
    useLocalStorage<TagOptions>("placeFilterOptions", tagOptionsPlace);

  console.log("storedPlaceFilteredOptions", storedPlaceFilteredOptions);

  useEffect(() => {
    const { primaryTag = "", tags = [] } = params.tags
      ? getHubTags(params.tags)
      : {};

    if (primaryTag === "place") {
      console.log("setStoredPrimaryTag set to", primaryTag);
      const optionsPlace = tagDefinitions.place.children.map((tag) => ({
        label: tag,
        value: tag,
        active: tags.includes(tag),
      }));
      // setStoredPlaceFilteredOptions(optionsPlace);
    }
  }, [params.tags]);

  return (
    <FilterContext.Provider value={storedPlaceFilteredOptions}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  return useContext(FilterContext);
}
