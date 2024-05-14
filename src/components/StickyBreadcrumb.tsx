"use client";

import { CookiesProvider } from "react-cookie";
import { useState, createContext, useContext, PropsWithChildren } from "react";

const Context = createContext<any>(false);

export function StickyBreadcrumbContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const list = useState(true);

  return <Context.Provider value={list}>{children}</Context.Provider>;
}

export function useStickyBreadcrumbContext() {
  return useContext(Context);
}
