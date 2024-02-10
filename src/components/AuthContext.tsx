"use client";

import { CookiesProvider } from "react-cookie";
import {
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { User, auth, onAuthStateChanged } from "@/lib/firebase";
import { User as SimpleUser } from "@/lib/auth";
import useAuthentication from "./useAuthentication";

const Context = createContext<SimpleUser | null>(null);

export function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const user = useAuthentication();
  return (
    <Context.Provider value={user}>
      <CookiesProvider>{children}</CookiesProvider>
    </Context.Provider>
  );
}

export function useAuthContext() {
  return useContext(Context);
}
