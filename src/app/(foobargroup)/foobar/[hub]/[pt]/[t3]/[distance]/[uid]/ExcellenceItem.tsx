import { PropsWithChildren, Suspense } from "react";
import RatingButton from "./RatingButton";

export default function ExcellenceItem({
  children,
  name,
  rating,
  profileId,
  excellenceId,
}: PropsWithChildren<{
  name: string;
  rating: number;
  profileId?: string;
  excellenceId?: string;
}>) {
  return (
    <div>
      <h2 className="text-lg font-semibold flex items-center justify-between">
        {name}
      </h2>
      <div>{children}</div>
    </div>
  );
}
