"use client";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { isMushroomPresentByUser } from "@/lib/firebase";
import { use } from "react";

export default function RatingButton({
  rating,
  profileId,
  excellenceId,
  mushroomPromise,
}: any) {
  const isMushroomAdd = use(mushroomPromise);
  console.log("MushroomButton user", isMushroomAdd, excellenceId, profileId);
  return (
    <Button size={"sm"}>
      {rating} {!isMushroomAdd ? "Remove" : "Add"}
    </Button>
  );
}
