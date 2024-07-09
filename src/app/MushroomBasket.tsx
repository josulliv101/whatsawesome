import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { fetchMushroomMapForUser, fetchProfile } from "@/lib/firebase";
import { sleep } from "@/lib/utils";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

const MAX_MUSHROOM_COUNT = 20;

export default async function MushroomBasket() {
  unstable_noStore();
  // await sleep(5000);
  const user = await getCurrentUser();
  // await sleep(2000);
  const userMushroomMap = user?.uid
    ? await fetchMushroomMapForUser(user?.uid)
    : {};
  const mushroomsLeft =
    MAX_MUSHROOM_COUNT -
    Object.values(userMushroomMap).filter((item) => item?.mushroom === true)
      .length;
  return (
    <div className="absolute top-2 right-28 rel scale-95_ hidden_">
      <div className="hidden text-sm text-muted-foreground absolute left-0 w-[240px] -translate-x-full">
        Leave a mushroom to vouch for a business/area of excellence.
      </div>
      <Image
        src="/basket-low.png"
        width="400"
        height="211"
        alt="basket"
        className="w-[80px] h-auto"
      />

      <Badge
        variant={"default"}
        className="absolute -bottom-1 -right-2 font-normal_ rounded-full scale-[.75] px-1"
      >
        {mushroomsLeft < MAX_MUSHROOM_COUNT ? (
          <span>
            {mushroomsLeft} / {MAX_MUSHROOM_COUNT}
          </span>
        ) : (
          MAX_MUSHROOM_COUNT
        )}
      </Badge>
    </div>
  );
}
