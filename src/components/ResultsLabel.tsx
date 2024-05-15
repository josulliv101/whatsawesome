"use client";

import { CookiesProvider } from "react-cookie";
import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  ReactNode,
} from "react";

const Context = createContext<any>(false);

export function ResultsLabelContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const list = useState<ReactNode>("");

  return <Context.Provider value={list}>{children}</Context.Provider>;
}

export function useResultsLabelContext() {
  return useContext(Context);
}
