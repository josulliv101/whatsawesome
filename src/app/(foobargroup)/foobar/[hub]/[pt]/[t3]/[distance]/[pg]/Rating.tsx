import { unstable_noStore } from "next/cache";
import {
  fetchMushroomMapForUser,
  getExcellenceRating,
  isMushroomPresentByUser,
} from "@/lib/firebase";
import RatingButton from "./RatingButton";
import { getCurrentUser } from "@/lib/auth";
import MushroomButton from "@/components/MushroomButton2";

export default async function Rating({
  // rating,
  profileId,
  excellenceId,
  cacheTag,
}: any) {
  unstable_noStore();
  const user = await getCurrentUser();
  const uid = user?.uid;
  const rating = await getExcellenceRating(profileId, excellenceId);
  const userMushroomMap = await fetchMushroomMapForUser(uid);
  const isMushroomPresent = userMushroomMap[excellenceId]?.mushroom === true;

  console.log("Rating...", user?.uid, uid, isMushroomPresent);
  return (
    <MushroomButton
      // key={isMushroomPresent}
      rating={rating}
      profileId={profileId}
      excellenceId={excellenceId}
      // mushroomPromise={promise}
      isLeaveMushroom={!isMushroomPresent}
      userId={uid}
      cacheTag={cacheTag}
    />
  );
}
