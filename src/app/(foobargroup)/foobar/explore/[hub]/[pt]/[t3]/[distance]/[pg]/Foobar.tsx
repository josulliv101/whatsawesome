"use client";

import { collectionGroup, query, where, getDocs } from "firebase/firestore";

import { getCurrentUser } from "@/lib/auth";
import { db, fetchProfile } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { useAuthContext } from "@/components/AuthContext";
import { leaveMushroom } from "@/lib/actions";
import { usePathname } from "next/navigation";
import useAuthentication from "@/components/useAuthentication";
import { useUserMushroomMapContext } from "@/components/UserMushroomMapContext";

export default function Foobar({
  uid,
  excellenceId,
  profileId,
  rating, // : ratingProp,
  mushroomMapPromise,
  deleteUidCookie,
}: {
  uid?: string;
  excellenceId: string;
  profileId: string;
  rating: number;
  mushroomMapPromise: Promise<any>;
  deleteUidCookie?: () => Promise<void>;
}) {
  // const [rating, setRating] = useState(ratingProp);
  const userMushroomMap = use(mushroomMapPromise);
  const [_, setUserMushroomMap] = useUserMushroomMapContext();
  const pathname = usePathname();
  const isAdd = userMushroomMap?.[excellenceId]?.mushroom !== true;
  const [user, setAuthUser] = useAuthentication();

  // console.log("Foobar render()", userMushroomMap);
  useEffect(() => {
    // console.log("Foobar useEffect", userMushroomMap);
    setUserMushroomMap(userMushroomMap);
  }, []);
  async function handleMushroomChange() {
    console.log(
      "handleMushroomChange",
      userMushroomMap,
      "foobar",
      user,
      userMushroomMap,
      excellenceId
    );
    if (user?.id) {
      const { rating: updatedRating } = await leaveMushroom(
        user?.id,
        profileId,
        excellenceId,
        pathname,
        isAdd
      );
      // setUserMushroomMap({
      //   ...userMushroomMap,
      //   [excellenceId]: {
      //     ...userMushroomMap[excellenceId],
      //     mushroom: !userMushroomMap[excellenceId]?.mushroom,
      //   },
      // });
      // setRating(updatedRating);
    }
  }
  return (
    <div className="flex items-center gap-1">
      <Button size={"sm"} onClick={handleMushroomChange}>
        {rating} {isAdd ? "Add" : "Remove"}
      </Button>
    </div>
  );
}
