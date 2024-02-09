"use client";

import { CookiesProvider } from "react-cookie";
import { useState, createContext, useContext, PropsWithChildren } from "react";
import { auth, onAuthStateChanged } from "@/lib/firebase";
import { User } from "@/lib/auth";

const Context = createContext<User | null | undefined>(undefined);

export function AuthContextProvider({
  children,
  user,
}: PropsWithChildren<{ user?: any }>) {
  const [session, setSession] = useState<User | null | undefined>(user);

  onAuthStateChanged(auth, (u) => {
    // const us = await u?.getIdTokenResult();
    console.log("onAuthStateChanged", u);

    if (!u) {
      setSession(null);
      return;
    }
    u.getIdTokenResult().then((data) => {
      let userProps: null | User = null;
      if (data && data.claims) {
        userProps = {
          displayName: data.claims.name as string,
          photoUrl: data.claims.picture as string | undefined,
          id: data.claims.user_id as string,
          isAdmin: data.claims.admin as boolean | undefined,
        };
      }
      console.log("data", data);
      if (
        session &&
        userProps &&
        JSON.stringify(session) !== JSON.stringify(userProps)
      ) {
        setTimeout(() => setSession(userProps), 0);
      }
    });
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
