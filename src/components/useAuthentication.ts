"use client";

import { useState, useEffect } from "react";
import { User, auth } from "@/lib/firebase";
import { User as SimpleUser } from "@/lib/auth";

export default function useAuthentication(): SimpleUser | null {
  const [authUser, setAuthUser] = useState<SimpleUser | null>(null);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async (user: User | null) => {
      console.log("onAuthStateChanged!!!", user);
      const getSimpleUser = async (
        authUser: User | null
      ): Promise<SimpleUser | null> => {
        const userData = await user?.getIdTokenResult();
        return userData
          ? {
              displayName: userData.claims.name as string,
              photoUrl: userData.claims.picture as string | undefined,
              id: userData.claims.user_id as string,
              isAdmin: userData.claims.admin as boolean | undefined,
            }
          : null;
      };

      const simpleUser = await getSimpleUser(user);

      user ? setAuthUser(simpleUser) : setAuthUser(null);
    });
    return () => unlisten();
  }, []);

  return authUser;
}
