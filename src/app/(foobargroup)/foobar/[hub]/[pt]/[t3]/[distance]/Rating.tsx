import { getCurrentUser } from "@/lib/auth";
import { isMushroomPresentByUser } from "@/lib/firebase";
import RatingButton from "./RatingButton";

export default async function Rating({ rating, profileId, excellenceId }: any) {
  const user = await getCurrentUser();
  const isMushroomPresent = !user
    ? false
    : await isMushroomPresentByUser(user?.uid, profileId, excellenceId);
  return (
    <RatingButton
      rating={rating}
      profileId={profileId}
      excellenceId={excellenceId}
      isAdd={!isMushroomPresent}
      userId={user?.uid}
    />
  );
}
