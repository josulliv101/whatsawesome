"use client";

import { useAuthContext } from "@/components/AuthContext";
import MushroomButton from "@/components/MushroomButton2";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { leaveMushroom } from "@/lib/actions";
import { config } from "@/lib/config";
import { isMushroomPresentByUser } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function RatingButton({
  rating,

  // mushroomPromise,
  isLeaveMushroom,
  profileId,
  excellenceId,
  userId,
  cacheTag,
}: any) {
  const pathname = usePathname();
  const router = useRouter();
  // const [{ isPresent: isMushroomPresent }, setRatingDetails] = useState(
  //   {
  //     rating: 0,
  //     isPresent: false,
  //   }
  // );
  // console.log(isAdd, "isAdd RatingButton", pathname);
  const [isPending, setIsPending] = useState(false);
  const [isRecalculatingOrder, setIsRecalculatingOrder] = useState(false);

  // const isAdd = !isMushroomPresent;

  // useEffect(() => {
  //   async function getData() {
  //     if (!userId) {
  //       return;
  //     }
  //     const data = await isMushroomPresentByUser(
  //       userId,
  //       profileId,
  //       excellenceId
  //     );
  //     setRatingDetails(data);
  //   }
  //   getData();
  // }, [userId]);

  const handleLeaveMushroom = async () => {
    if (!userId) {
      toast(
        <pre className="mt-0  w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Please login to leave a mushroom.</code>
        </pre>
      );
    } else if (userId && profileId && excellenceId) {
      setIsPending(true);
      setTimeout(() => setIsRecalculatingOrder(true), 2200);
      // console.log("CLIENT", isAdd);
      const { isSuccess, rating: updatedRating } = await leaveMushroom(
        userId,
        profileId,
        excellenceId,
        pathname,
        !isLeaveMushroom
      );

      if (isSuccess) {
        setTimeout(async () => {
          await fetch(`/api/cache?tag=${cacheTag}`);
          router.refresh();
        }, 3000);
      }
      // setRatingDetails({
      //   isPresent: !isMushroomPresent,
      //   rating: updatedRating,
      // });
      // setIsPending(false);
      // console.log(updatedRating, "updatedRating", isAdd);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <MushroomButton
        isLeaveMushroom={isLeaveMushroom}
        profileId={excellenceId}
        excellenceId={excellenceId}
        userId={userId}
        cacheTag={cacheTag}
      />
      {/* <Button
        className={cn(
          "group animate-fadeInQuick  hover:bg-gray-100 justify-center transition-all duration-700 text-muted-foreground min-w-0 gap-2 disabled:opacity-100",
          isPending ? "bg-gray-50" : "bg-gray-100",
          isPending || isAdd ? "w-12" : "w-[166px]"
        )}
        disabled={isPending}
        size={"sm"}
        onClick={handleLeaveMushroom}
      >
        {!isAdd && isPending && (
          <span className="flex items-center gap-4 px-2">
            <Loader2 className="h-4 w-4 opacity-60 text-muted-foreground animate-spin z-50" />
          </span>
        )}
        {!isAdd && !isPending && "Leave a mushroom"}
        {isAdd && (
          <span>
            <img
              className={cn(
                "animate-rubberBandJumpNoDelay relative origin-bottom transition-all",
                "w-7 h-7  opacity-100 grayscale-0"
              )}
              src={config.logoPath}
              width="24"
              height="24"
            />
          </span>
        )}
      </Button> */}
    </div>
  );
}
