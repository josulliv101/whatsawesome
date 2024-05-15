"use client";

import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
} from "react";

const Context = createContext<any>(false);

export const defaultHelpText = "Logo/Map Icon Rollovers";

export function UserScrolledContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const stateIsScrolled = useState(false);
  const stateHelpText = useState("");

  const list = useMemo(() => {
    return [...stateIsScrolled, ...stateHelpText];
  }, [stateIsScrolled, stateHelpText]);

  return <Context.Provider value={list}>{children}</Context.Provider>;
}

export function useUserScrolledContext() {
  return useContext(Context);
}
