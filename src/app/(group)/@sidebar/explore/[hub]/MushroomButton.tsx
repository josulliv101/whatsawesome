import MushroomButtonClient from "@/components/MushroomButtonClient";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { isMushroomPresentByUser } from "@/lib/firebase";

export default async function MushroomButton({ excellenceId, profileId }: any) {
  const user = await getCurrentUser();

  const isMushroomPresent = !user?.uid
    ? false
    : await isMushroomPresentByUser(user.uid, profileId, excellenceId);
  console.log("MushroomButton user", user?.uid, excellenceId, profileId);
  // const foo = await new Promise((r) => setTimeout(r, 8000));
  return (
    <MushroomButtonClient
      isMushroomPresent={isMushroomPresent}
      userId={user?.uid}
      profileId={profileId}
      excellenceId={excellenceId}
    />
  );
}
