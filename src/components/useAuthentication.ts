"use client";

import { useState, useEffect } from "react";
import { User, auth, fetchMushroomMapForUser } from "@/lib/firebase";
import { User as SimpleUser } from "@/lib/auth";
import { useUserMushroomMapContext } from "./UserMushroomMapContext";

export default function useAuthentication(): [
  SimpleUser | null,
  (user: any) => void,
] {
  // const [_, setUserMushroomMap] = useUserMushroomMapContext();
  const [authUser, setAuthUser] = useState<SimpleUser | null>(null);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async (user: User | null) => {
      console.log("onAuthStateChanged!!!", user);
      const getSimpleUser = async (
        authUser: User | null
      ): Promise<(SimpleUser & { userMushroomMap: any }) | null> => {
        const userData = await user?.getIdTokenResult();
        const userMushroomMap = await fetchMushroomMapForUser(user?.uid || "");
        // setUserMushroomMap(userMushroomMap);
        return userData
          ? {
              displayName: userData.claims.name as string,
              photoUrl: userData.claims.picture as string | undefined,
              id: userData.claims.user_id as string,
              isAdmin: userData.claims.admin as boolean | undefined,
              userMushroomMap,
            }
          : null;
      };

      const simpleUser = await getSimpleUser(user);

      user ? setAuthUser(simpleUser) : setAuthUser(null);
    });
    return () => unlisten();
  }, []);

  return [authUser, setAuthUser];
}
