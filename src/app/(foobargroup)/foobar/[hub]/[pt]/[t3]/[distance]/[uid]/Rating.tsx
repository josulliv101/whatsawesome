import { unstable_noStore } from "next/cache";
import {
  fetchMushroomMapForUser,
  getExcellenceRating,
  isMushroomPresentByUser,
} from "@/lib/firebase";
import RatingButton from "./RatingButton";

export default async function Rating({
  // rating,
  profileId,
  excellenceId,
  uid,
}: any) {
  unstable_noStore();
  const rating = await getExcellenceRating(profileId, excellenceId);
  const userMushroomMap = await fetchMushroomMapForUser(uid);
  const isMushroomPresent = userMushroomMap[excellenceId]?.mushroom === true;
  console.log("Rating...", uid, isMushroomPresent);
  return (
    <RatingButton
      rating={rating}
      profileId={profileId}
      excellenceId={excellenceId}
      // mushroomPromise={promise}
      isAdd={!isMushroomPresent}
      userId={uid}
    />
  );
}