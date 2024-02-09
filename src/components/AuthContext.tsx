"use client";

import { CookiesProvider } from "react-cookie";
import { useState, createContext, useContext, PropsWithChildren } from "react";
import { auth, User, onAuthStateChanged } from "@/lib/firebase";

const Context = createContext<User | null | undefined>(undefined);

export function AuthContextProvider({
  children,
  user,
}: PropsWithChildren<{ user?: any }>) {
  const [session, setSession] = useState<User | null | undefined>(user);

  onAuthStateChanged(auth, (u) => {
    console.log("onAuthStateChanged", u);
    setSession(!!u ? u : null);
  });

  return (
    <Context.Provider value={session}>
      <CookiesProvider>{children}</CookiesProvider>
    </Context.Provider>
  );
}

export function useAuthContext() {
  return useContext(Context);
}
