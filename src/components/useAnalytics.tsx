"use client";

import { CookiesProvider } from "react-cookie";
import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { User, auth, onAuthStateChanged } from "@/lib/firebase";
import { User as SimpleUser } from "@/lib/auth";
import useAuthentication from "./useAuthentication";

const Context = createContext<{
  state: boolean;
  setState?: Dispatch<SetStateAction<boolean>>;
}>({ state: false });

export function AnalyticsContextProvider({ children }: PropsWithChildren<{}>) {
  const [state, setState] = useState(false);
  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
}

export function useAnalyticsContext() {
  return useContext(Context);
}
