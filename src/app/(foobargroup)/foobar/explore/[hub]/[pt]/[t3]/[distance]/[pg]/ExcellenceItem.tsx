import { PropsWithChildren, Suspense } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RatingButton from "./RatingButton";
import { BadgeCheckIcon, SlashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { config } from "@/lib/config";
import LogoSwatch from "@/components/LogoSwatch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getLevel2TagsFromTags,
  getLevel3TagsFromTags,
  getPrimaryTagsFromTags,
} from "@/lib/tags";

export default function ExcellenceItem({
  children,
  name,
  rating,
  profileId,
  excellenceId,
  photoUrl,
  photoAsideUrl,
  tags,
  tagsAll,
  parentTags,
  rank,
}: PropsWithChildren<{
  name: string;

  rating: number;
  profileId?: string;
  excellenceId?: string;
  photoUrl?: string;
  photoAsideUrl?: string;
  tags: Array<string>;
  tagsAll: Array<string>;
  parentTags: Array<string>;
  rank?: number;
}>) {
  const pic = photoUrl || photoAsideUrl;
  const excellencePromoLimit = 4;
  return (
    <div className="relative bg-white shadow-sm border animate-fadeIn__ flex border-b md:border-b-0 mb-8 md:mb-0 flex-col md:flex-row-reverse items-stretch gap-0 w-full h-max md:h-[240px]">
      <div className="peer relative w-full bg-white z-20 pl-6">
        <div className="peer/tags px-4 md:px-0 static z-10 md:absolute top-3 left-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* <span className="font-semibold text-lg">{name}</span> */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                className={cn(
                  "nav-btn",
                  "peer/badge",
                  "transition-all duration-500",
                  "text-blue-500",
                  photoAsideUrl ? "px-1 pr-3" : "px-3"
                )}
                asChild
              >
                <Link href={`/foobar/profile/${profileId}`}>
                  <LogoSwatch name={name} photoUrl={photoAsideUrl} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Profile</p>
            </TooltipContent>
          </Tooltip>

          {false && !!tags.length && (
            <SlashIcon className="w-4 h-4 hidden md:block" />
          )}
        </div>
        {children}
        <div className="peer-has-[a[data-state='delayed-open']]/tags:opacity-0 peer-has-[a[data-state='instant-open']]/tags:opacity-0 transition-all duration-300 absolute bottom-2 right-8 flex items-center gap-6 text-sm text-muted-foreground">
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
        <div
          className={cn(
            "peer-has-[[.nav-btn&:active]]/tags:opacity-0 peer-has-[.nav-btn[data-state='instant-open']]/tags:opacity-0 peer-has-[.nav-btn[data-state='delayed-open']]/tags:opacity-0",
            " transition-all duration-300 flex items-center gap-2",
            "absolute bottom-2 left-4 z-20"
          )}
          // className="peer-active/badge:opacity-0 peer-[[data-state='delayed-open']]/badge:opacity-0 peer-[[data-state='instant-open']]/badge:opacity-0 transition-all duration-300 flex items-center gap-2"
        >
          <Badge
            variant={"outline"}
            className="py-1 gap-2 border-0 rounded-md "
          >
            {tags?.map((tag, index) => (
              <>
                <span className="capitalize">{tag}</span>
                {index < tags.length - 1 && (
                  <BadgeCheckIcon
                    className={`h-4 w-4 mr-0 ml-2 text-blue-500 opacity-80`}
                  />
                )}
              </>
            ))}
          </Badge>
        </div>
        <div
          className={cn(
            "peer-has-[[.nav-btn&:active]]/tags:opacity-100 peer-has-[.nav-btn[data-state='instant-open']]/tags:opacity-100 peer-has-[.nav-btn[data-state='delayed-open']]/tags:opacity-100",
            "opacity-0 transition-all duration-300 flex items-center gap-0",
            "absolute bottom-2 left-4 z-20"
          )}
          // className="peer-active/badge:opacity-0 peer-[[data-state='delayed-open']]/badge:opacity-0 peer-[[data-state='instant-open']]/badge:opacity-0 transition-all duration-300 flex items-center gap-2"
        >
          <Badge
            variant={"outline"}
            className=" py-1  gap-3 border-0 rounded-md capitalize"
          >
            {
              [
                ...getPrimaryTagsFromTags(tagsAll),
                ...getLevel2TagsFromTags(tagsAll),
              ].map((tag) => (
                <span key={tag}>{tag}</span>
              ))
              // .join(" / ")
            }
          </Badge>
          {[...getLevel3TagsFromTags(tagsAll)]
            .slice(0, excellencePromoLimit)
            .map((tag) => (
              <Badge
                key={tag}
                variant={"outline"}
                className="py-1 gap-2 border-0 rounded-md "
              >
                <BadgeCheckIcon
                  className={`h-4 w-4 mr-0 ml-2 text-blue-500 opacity-80`}
                />
                <span className="capitalize">{tag}</span>
              </Badge>
            ))}
          {getLevel3TagsFromTags(tagsAll).length - excellencePromoLimit > 0 ? (
            <Badge
              variant={"outline"}
              className="text-blue-500 py-1 gap-2 pl-2 border-0 rounded-md "
            >
              & {getLevel3TagsFromTags(tagsAll).length - excellencePromoLimit}{" "}
              more
            </Badge>
          ) : (
            ""
          )}
        </div>
      </div>
      {pic && (
        <div className="border-r hidden md:block">
          <nav>
            <Image
              className=" w-full md:w-[240px] md:min-w-[240px] h-72 min-h-[240px] md:h-[240px] object-cover px-4 md:px-0 rounded-l-md"
              alt={name}
              src={pic}
              width="240"
              height="240"
            />
          </nav>
        </div>
      )}{" "}
      {photoAsideUrl && (
        <Image
          className="peer-has-[[.nav-btn&:active]]:translate-x-0 peer-has-[.nav-btn[data-state='instant-open']]:translate-x-0 peer-has-[.nav-btn[data-state='delayed-open']]:translate-x-0 z-0 transition-all ease-out bg-white duration-300 translate-x-full absolute top-0 left-0 w-full  md:w-[240px] md:min-w-[240px] h-72 min-h-88 md:h-full object-cover px-4 md:px-0 rounded-l-md"
          alt={name}
          src={photoAsideUrl}
          width="240"
          height="240"
        />
      )}
    </div>
  );
}
