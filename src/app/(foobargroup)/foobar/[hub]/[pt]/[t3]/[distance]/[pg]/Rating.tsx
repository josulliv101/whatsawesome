import { unstable_noStore } from "next/cache";
import {
  fetchMushroomMapForUser,
  getExcellenceRating,
  isMushroomPresentByUser,
} from "@/lib/firebase";
import RatingButton from "./RatingButton";
import { getCurrentUser } from "@/lib/auth";

export default async function Rating({
  // rating,
  profileId,
  excellenceId,
  // uid,
}: any) {
  unstable_noStore();
  const user = await getCurrentUser();
  const uid = user?.uid;
  const rating = await getExcellenceRating(profileId, excellenceId);
  const userMushroomMap = await fetchMushroomMapForUser(uid);
  const isMushroomPresent = userMushroomMap[excellenceId]?.mushroom === true;
  console.log("Rating...", user?.uid, uid, isMushroomPresent);
  return (
    <RatingButton
      key={isMushroomPresent}
      rating={rating}
      profileId={profileId}
      excellenceId={excellenceId}
      // mushroomPromise={promise}
      isAdd={!isMushroomPresent}
      userId={uid}
    />
  );
}
