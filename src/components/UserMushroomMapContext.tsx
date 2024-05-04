"use client";

import { CookiesProvider } from "react-cookie";
import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { User, auth, onAuthStateChanged } from "@/lib/firebase";
import { User as SimpleUser } from "@/lib/auth";
import useAuthentication from "./useAuthentication";

const Context = createContext<Record<string, any> | null>(null);

export function UserMushroomMapContextProvider({
  children,
}: PropsWithChildren<{}>) {
  const [userMushroomMap, setUserMushroomMap] = useState(null);

  return (
    <Context.Provider value={[userMushroomMap, setUserMushroomMap]}>
      {children}
    </Context.Provider>
  );
}

export function useUserMushroomMapContext() {
  return useContext(Context);
}
