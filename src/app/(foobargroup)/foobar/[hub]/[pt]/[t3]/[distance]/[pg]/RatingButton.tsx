"use client";

import { useAuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
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
  profileId,
  excellenceId,
  // mushroomPromise,
  isAdd,
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
        isAdd
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
      <Button
        className="animate-fadeInQuick bg-gray-100 hover:bg-gray-50 text-muted-foreground min-w-0 gap-2 disabled:opacity-100"
        disabled={isPending}
        size={"sm"}
        onClick={handleLeaveMushroom}
      >
        <div className="flex items-center gap-2">
          {isPending && (
            <div
              className={cn(
                "absolute animate-fadeInQuick opacity-60 flex items-center gap-2 text-sm text-muted-foreground",
                isRecalculatingOrder ? "-left-[160px]" : "-left-[60px]"
              )}
            >
              {isPending && !isRecalculatingOrder && (
                <span className="animate-fadeInAndOut opacity-0">Saving</span>
              )}
              {isPending && isRecalculatingOrder && (
                <span className="animate-fadeInQuick">
                  Recalculating rankings
                </span>
              )}
            </div>
          )}
          <div className="flex items-center gap-2">
            {isPending ? (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin z-50" />
            ) : (
              <>
                {rating}
                <img
                  className={cn(
                    "relative -top-0.5 transition-all",
                    isAdd
                      ? "w-4 h-4  opacity-70 grayscale"
                      : "w-5 h-5  opacity-100 grayscale-0"
                  )}
                  src={config.logoPath}
                  width="24"
                  height="24"
                />
              </>
            )}
          </div>
        </div>
      </Button>
    </div>
  );
}
