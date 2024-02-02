"use client";

import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { config } from "@/lib/config";
import { PrimaryTagType, getHubTags } from "@/lib/tags";
import useLocalStorage from "./useLocalStorage";
import { useParams } from "next/navigation";

const HubContext = createContext<PrimaryTagType>(config.defaultPrimaryTag);

export function HubContextProvider({
  children,
  initialValue,
}: PropsWithChildren<{ initialValue?: PrimaryTagType }>) {
  const params = useParams();
  console.log("params changes", params);

  const [storedPrimaryTag, setStoredPrimaryTag] =
    useLocalStorage<PrimaryTagType>(
      "primaryTag",
      initialValue || config.defaultPrimaryTag
    );

  console.log("HubContextProvider storedPrimaryTag", storedPrimaryTag);

  useEffect(() => {
    const { primaryTag = "" } = params.tags ? getHubTags(params.tags) : {};

    if (primaryTag) {
      console.log("setStoredPrimaryTag set to", primaryTag);
      setStoredPrimaryTag(primaryTag);
    }
  }, [params.tags]);

  return (
    <HubContext.Provider value={storedPrimaryTag}>
      {children}
    </HubContext.Provider>
  );
}

export function useHubContext() {
  return useContext(HubContext);
}
