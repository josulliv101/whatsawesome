import { PropsWithChildren, Suspense } from "react";
import Image from "next/image";
import RatingButton from "./RatingButton";

export default function ExcellenceItem({
  children,
  name,
  rating,
  profileId,
  excellenceId,
  photoUrl,
}: PropsWithChildren<{
  name: string;
  rating: number;
  profileId?: string;
  excellenceId?: string;
  photoUrl?: string;
}>) {
  return (
    <div className="flex items-stretch gap-8 w-full">
      {photoUrl && (
        <Image
          className="w-[240px] h-[240px] object-cover"
          alt={name}
          src={photoUrl}
          width="240"
          height="240"
        />
      )}
      <div className="relative w-full">
        <div className="absolute top-0 left-0">
          <span className="font-semibold text-lg">{name}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
