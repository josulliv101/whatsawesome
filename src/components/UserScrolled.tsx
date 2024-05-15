"use client";

import { useState, createContext, useContext, PropsWithChildren } from "react";

const Context = createContext<any>(false);

export function UserScrolledContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const list = useState(false);

  return <Context.Provider value={list}>{children}</Context.Provider>;
}

export function useUserScrolledContext() {
  return useContext(Context);
}
