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
    <div className="flex border-b md:border-b-0 mb-8 md:mb-0 flex-col md:flex-row items-stretch gap-8 w-full h-max md:h-[240px]">
      {photoUrl && (
        <Image
          className="w-full md:w-[240px] md:min-w-[240px] h-72 min-h-88 md:h-full object-cover px-4 md:px-0 rounded-md"
          alt={name}
          src={photoUrl}
          width="240"
          height="240"
        />
      )}
      <div className="relative w-full">
        <div className="px-4 md:px-0 static md:absolute top-0 left-0 flex flex-col md:flex-row items-start md:items-center gap-4">
          <span className="font-semibold text-lg">{name}</span>
          {!!tags.length && <SlashIcon className="w-4 h-4 hidden md:block" />}
          <div>
            {tags?.map((tag) => (
              <Badge key={tag} variant={"outline"}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
