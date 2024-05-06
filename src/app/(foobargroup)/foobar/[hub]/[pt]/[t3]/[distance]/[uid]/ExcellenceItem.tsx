import { PropsWithChildren, Suspense } from "react";
import Image from "next/image";
import RatingButton from "./RatingButton";
import { SlashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ExcellenceItem({
  children,
  name,
  rating,
  profileId,
  excellenceId,
  photoUrl,
  tags,
}: PropsWithChildren<{
  name: string;
  rating: number;
  profileId?: string;
  excellenceId?: string;
  photoUrl?: string;
  tags: Array<string>;
}>) {
  return (
    <div className="flex items-stretch gap-8 w-full h-[240px]">
      {photoUrl && (
        <Image
          className="w-[240px] h-full object-cover rounded-md"
          alt={name}
          src={photoUrl}
          width="240"
          height="240"
        />
      )}
      <div className="relative w-full">
        <div className="absolute top-0 left-0 flex items-center gap-4">
          <span className="font-semibold text-lg">{name}</span>
          {!!tags.length && <SlashIcon className="w-4 h-4" />}
          {tags?.map((tag) => (
            <Badge key={tag} variant={"outline"}>
              {tag}
            </Badge>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
