"use client";

import { getCurrentUser } from "@/lib/auth";
import { isMushroomPresentByUser } from "@/lib/firebase";
import RatingButton from "./RatingButton";
import { useAuthContext } from "@/components/AuthContext";

let cacheMap: Record<string, string> = {};

export default function Rating({ rating, profileId, excellenceId }: any) {
  const { id: userId = "" } = useAuthContext() || {};
  const promise = fetchWithSuspense(userId, profileId, excellenceId);

  return (
    <RatingButton
      rating={rating}
      profileId={profileId}
      excellenceId={excellenceId}
      mushroomPromise={promise}
      // isAdd={!isMushroomPresent}
      // userId={user?.uid}
    />
  );
}

function fetchWithSuspense(
  userId: string,
  profileId: string,
  excellenceId: string
) {
  const cacheId = `${userId}-${profileId}-${excellenceId}`;
  if (cacheMap[cacheId]) return cacheMap[cacheId];

  let promise;
  try {
    promise = isMushroomPresentByUser(userId, profileId, excellenceId);
  } catch (error) {
    throw new Promise(function (resolver) {
      setTimeout(() => resolver(false), 1000);
    });
  }

  throw promise;
}
