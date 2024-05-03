"use client";

import { Button } from "@/components/ui/button";
import { leaveMushroom } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";

export default function RatingButton({
  rating,
  profileId,
  excellenceId,
  isAdd,
  userId,
}: any) {
  const [ratingBasedOnVote, setRatingBasedOnVote] = useState(rating);
  console.log("RatingButton..", excellenceId, isAdd);
  console.log("MushroomButton user", isAdd, excellenceId, profileId);

  const handleLeaveMushroom = async () => {
    if (!userId) {
      toast(
        <pre className="mt-0  w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Please login to leave a mushroom.</code>
        </pre>
      );
    } else if (userId && profileId && excellenceId) {
      const { rating: updatedRating } = await leaveMushroom(
        userId,
        profileId,
        excellenceId,
        isAdd
      );
      setRatingBasedOnVote(updatedRating);
      console.log(updatedRating, "updatedRating");
    }
  };

  return (
    <Button size={"sm"} onClick={handleLeaveMushroom}>
      {ratingBasedOnVote} {!isAdd ? "Remove" : "Add"}
    </Button>
  );
}
