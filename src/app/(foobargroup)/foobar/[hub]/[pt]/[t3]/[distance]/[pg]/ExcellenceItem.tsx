import { PropsWithChildren, Suspense } from "react";
import Image from "next/image";
import RatingButton from "./RatingButton";
import { SlashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";

export default function ExcellenceItem({
  children,
  name,
  rating,
  profileId,
  excellenceId,
  photoUrl,
  tags,
  rank,
}: PropsWithChildren<{
  name: string;
  rating: number;
  profileId?: string;
  excellenceId?: string;
  photoUrl?: string;
  tags: Array<string>;
  rank?: number;
}>) {
  return (
    <div className="bg-white shadow-sm border animate-fadeIn__ flex border-b md:border-b-0 mb-8 md:mb-0 flex-col md:flex-row items-stretch gap-6 w-full h-max md:h-[240px]">
      {photoUrl && (
        <Image
          className="w-full md:w-[240px] md:min-w-[240px] h-72 min-h-88 md:h-full object-cover px-4 md:px-0 rounded-l-md"
          alt={name}
          src={photoUrl}
          width="240"
          height="240"
        />
      )}
      <div className="relative w-full">
        <div className="px-4 md:px-0 static md:absolute top-3 left-0 flex flex-col md:flex-row items-start md:items-center gap-4">
          <span className="font-semibold text-lg">{name}</span>
          {!!tags.length && <SlashIcon className="w-4 h-4 hidden md:block" />}
          <div className="flex items-center gap-2">
            {tags?.map((tag) => (
              <Badge key={tag} variant={"outline"} className="py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {children}
        <div className="absolute bottom-2 left-0 flex items-center gap-6 text-sm text-muted-foreground">
          {/* {!!rank && (
            <span className="-mt-0">
              rank{" "}
              <Badge variant={"default"} className="-mt-1 scale-[.9] ml-1">
                {rank}
              </Badge>
            </span>
          )} */}
          <div className="flex items-center gap-2 border-0 rounded-full px-0 py-1 text-sm ">
            {rating}{" "}
            <img
              className={cn(
                "relative -top-0 transition-all",
                "w-4 h-4  opacity-100 grayscale-0"
              )}
              src={config.logoPath}
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
