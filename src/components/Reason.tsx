"use client";

import {
  ChatBubbleIcon,
  ChevronDownIcon,
  CircleIcon,
  HeartFilledIcon,
  PlusIcon,
  StarFilledIcon as StarIcon,
} from "@radix-ui/react-icons";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import {
  ThumbsDownIcon,
  NetworkIcon,
  BarChart3Icon,
  BarChart2Icon,
  BarChartIcon,
  // MehIcon,
  MessageCircleQuestion as MehIcon,
  BanIcon,
  BadgeIcon,
  BanknoteIcon,
  // StarIcon,
  // CrownIcon as Heart,
  CircleDotIcon,
  Map,
  Heart,
  MessageSquareTextIcon as MessageCircle,
  SlashIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import RateReason from "./RateReason";
import { AnalyticsDialog } from "./AnalyticsDialog";
import {
  generateRandomDecimal,
  roundToDecimal,
  roundToInteger,
  roundToNearestHalf,
} from "@/lib/utils";
import { PropsWithChildren, useState } from "react";
import { config } from "@/lib/config";
import { useAnalyticsContext } from "./useAnalytics";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Rating from "./Rating";
import { ReasonEdit } from "./ReasonEdit";
import { profile } from "console";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { getPrimaryTagsFromTags, tagDefinitions } from "@/lib/tags";
import { toast } from "sonner";
import MushroomHoverCard from "./MushroomHoverCard";

export function Reason({
  id,
  description,
  name,
  rating,
  photoUrl: photoUrlProp,
  photoUrlAside,
  profileId,
  userRating,
  ratings: ratingsProp = {},
  isAnalytcisView,
  userId,
  tags = [],
  children,
  isForceRatingToShow,
  isEditable = false,
  latlng,
  showExtraPassion,
  latestBacker,
  showLinkToProfile = true,
}: PropsWithChildren<{
  id?: string;
  description: string;
  name: string;
  rating: number;
  photoUrl?: string;
  photoUrlAside?: string;
  profileId: string;
  userRating?: number;
  ratings?: Record<string, number>;
  isAnalytcisView?: boolean;
  userId?: string;
  tags: string[];
  isForceRatingToShow?: boolean;
  isEditable?: boolean;
  latlng?: {
    lat: number;
    lng: number;
  };
  showExtraPassion?: boolean;
  latestBacker?: string;
  showLinkToProfile?: boolean;
}>) {
  const [mushroomCount, setMushroomCount] = useState(
    roundToInteger(rating < 10 ? rating * 10 : rating)
  );
  const photoUrl = photoUrlProp; // || config.logoPath;
  const isDefaultImage = !photoUrlProp;
  const [isEdit, setIsEdit] = useState(false);
  const { state: isAnalyticsView } = useAnalyticsContext();
  const [isMushroomAnimating, setIsMushroomAnimating] = useState(false);

  const ratings = [
    {
      name: "disagree",
      value: ratingsProp["-1"],
      rank: -1,
    },
    {
      name: "no experience",
      value: ratingsProp["0"],
      rank: 1,
    },
    {
      name: "1 mushroom",
      value: ratingsProp["1"],
      rank: 2,
    },
    { name: "2 mushrooms", value: ratingsProp["2"] },
    {
      name: "3 mushrooms",
      value: ratingsProp["3"],
      rank: 3,
    },
  ];
  const totalPeople = ratings.reduce((acc, item) => {
    return acc + item.value;
  }, 0);
  const score =
    ratings
      .filter((item) => (item?.rank || 0) > -1)
      .reduce((acc, item) => {
        return acc + item.value * Math.max(1, item?.rank || 1);
      }, 0) / totalPeople;
  const passionateBackers = Math.max(0, roundToInteger(rating / 8 - 1));
  return (
    <Card className="group border-l-[1px]  relative w-full min-h-[222px] flex flex-col md:flex-row-reverse items-center gap-0 py-0 ">
      {photoUrlAside && (
        <div className="hidden shadow-sm rounded-tl-md rounded-bl-md border-0 border-gray-200 bg-gray-100_ min-w-[200px] flex_ items-center absolute -bottom-2.5 -right-0 z-[10]  rounded-tr-md rounded-br-md">
          <Image
            className={` border rounded-md  w-[60px] h-[60px] object-cover`}
            width="60"
            height="60"
            src={photoUrlAside}
            alt=""
          />
          <Button
            variant={"ghost"}
            className="hidden text-muted-foreground min-w-[160px] justify-start -mt-2"
          >
            {name}
          </Button>
        </div>
      )}
      {
        <div className=" w-full md:w-auto">
          {isAnalyticsView && photoUrl && !isDefaultImage && (
            <img
              className="object-cover shadow-md absolute top-[-18px] right-[-6px] rounded-md w-[68px] h-[68px]"
              src={photoUrl}
              width="80"
              height="80"
            />
          )}
          {!userId && photoUrl && (
            <Image
              className={`${isDefaultImage ? "grayscale opacity-5 bg-gray-500 object-contain" : ""} hover:grayscale-0__ object-cover w-full h-full max-h-[300px] max-w-full block min-w-full md:h-[220px] md:max-w-[220px] md:w-auto min-h-full md:min-w-[220px] overflow-hidden opacity-80 border-r`}
              width="180"
              height="135"
              src={photoUrl}
              alt=""
              style={{
                padding: isDefaultImage ? "4rem" : "",
              }}
            />
          )}
          {userId && (
            <img
              className="p-4 grayscale__ hover:grayscale-0__ object-cover w-full h-full max-h-[300px] max-w-full block min-w-full md:h-[220px] md:max-w-[220px] md:w-auto min-h-full md:min-w-[220px] overflow-hidden opacity-80"
              width="180"
              height="135"
              src={"https://avatars.githubusercontent.com/u/1703430?v=4"}
              alt={userId}
            />
          )}
          {!userId && !photoUrl && (
            <div
              className={`grayscale__ hover:grayscale-0__ object-cover w-full h-full max-h-[300px] ${isAnalyticsView ? "max-w-full" : "max-w-0"}  ${isAnalyticsView ? "md:max-w-[220px]" : "md:max-w-0"} block ${isAnalyticsView ? "min-w-full" : "min-w-0"} md:h-[220px]  ${isAnalyticsView ? "md:w-auto" : "md:w-0"} min-h-full ${isAnalyticsView ? "md:min-w-[220px]" : "md:min-w-0"} overflow-hidden opacity-80 transition-all duration-500 ease-in-out`}
            />
          )}
          <div
            className={`${isAnalyticsView ? "bg-gray-50" : "bg-transparent"} ${!photoUrl && isAnalyticsView ? "delay-500" : "delay-0"} transition-all absolute top-0 left-0 h-[220px] w-[220px]`}
          >
            {isAnalyticsView && (
              <>
                <div className="absolute left-[-62px] top-0 w-full grid grid-cols-1 gap-6 px-0 max-w-[44px]">
                  <div className=" flex flex-col items-end justify-start">
                    <ThumbsDownIcon className="h-5 w-5 text-muted-foreground relative top-[9px]" />
                  </div>
                  <div className=" flex flex-col items-end justify-start">
                    <MehIcon className="h-5 w-5 text-muted-foreground relative top-[3px]" />
                  </div>
                  <div className=" flex items-center justify-end grayscale">
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className=" flex items-center justify-end gap-0.5">
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={16}
                      height={16}
                    />
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className=" flex items-center justify-end gap-0.5">
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={16}
                      height={16}
                    />
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={16}
                      height={16}
                    />
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  maxHeight={220}
                  className={"relative left-[2px]"}
                >
                  <BarChart
                    width={220}
                    height={220}
                    data={ratings}
                    layout="vertical"
                    margin={{
                      top: 0,
                      right: 10,
                      left: 0,
                      bottom: 0,
                    }}

                    // barSize={8}
                    // barCategoryGap={40}
                    // barGap={40}
                  >
                    <XAxis
                      // offset={"20px"}
                      type="number"
                      // alignmentBaseline="after-edge"
                      className="mt-10 relative top-10 animate-fadeIn"
                      // cy={200}
                      // dy={10}
                      // horizOriginX={100}
                      // padding={{ top: 20 }}
                      spacing={20}
                      // y={20}
                      // style={{ paddingTop: 100 }}
                    />
                    <YAxis type="category" width={0} dataKey="name" />
                    <ChartTooltip />
                    <Bar
                      dataKey="value"
                      maxBarSize={12}
                      animationEasing="ease-out"
                      animationBegin={!photoUrl ? 400 : 0}
                    >
                      {ratings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={"black"} />
                      ))}
                    </Bar>
                  </BarChart>
                  {/* <BarChart
              width={300}
              height={300}
              data={ratings}
              margin={{
                top: 5,
                right: 0,
                left: -30,
                bottom: 5,
              }}
              layout="horizontal"
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" />
              
              <YAxis />
              <Tooltip />
            
              <Bar
                dataKey="value"
                fill="#000"
                activeBar={<Rectangle fill="lightblue" stroke="gray" />}
              />
            </BarChart> */}
                </ResponsiveContainer>
              </>
            )}
          </div>
        </div>
      }

      <CardHeader className="relative z-10 flex-1 px-16 pt-0 pb-0 pr-0 grid grid-cols-[1fr] items-start gap-0s space-y-0">
        <div className="space-y-1">
          {/* <CardTitle>whats awesome about {name}</CardTitle> */}

          <CardDescription className="text-xl -mt-4_ text-balance_ text-center_ pr-8 lg:text-xl leading-relaxed first-letter:text-4xl first-letter:pr-0.5 fir lg:leading-[2.25rem]">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-1 ml-8">
        <div className="flex__ hidden space-x-6 text-sm text-muted-foreground">
          {/* <div className="flex items-center">
            <img
              className="h-4 w-auto  opacity-100 pr-1.5"
              src="/cute-mushroom.png"
              alt="whatsawesome"
            />
            {rating} rating
          </div> */}
          <div className="hidden flex__ items-center w-20">
            <StarIcon className="mr-1 h-3 w-3 text-yellow-500" />
            {rating} rating
          </div>
          <div className="w-44 whitespace-nowrap md:whitespace-normal">
            created by{latestBacker}
          </div>
        </div>

        <div
          className={`flex flex-row gap-2 items-center justify-center absolute bottom-2 ${photoUrl ? "right-[250px]" : "right-[20px]"}`}
        >
          {id && !isAnalyticsView && (
            <>
              <Button
                key="source"
                className={`text-muted-foreground/50 font-normal border-muted-foreground rounded-md py-0 max-h-[30px]`}
                variant={"ghost"}
                size="sm"
                asChild
              >
                <Link href={`#`}>source: business owner</Link>
              </Button>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      toast(
                        <pre className="mt-0 w-[340px] rounded-md bg-slate-950 p-4">
                          <code className="text-white">
                            Functionality not yet implemented.
                          </code>
                        </pre>
                      )
                    }
                    className="flex py-2  gap-4  w-12  bg-gray-50_ origin-bottom-right scale-[1.0] transition-all duration-500 border_"
                  >
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={40}
                      height={40}
                      className="grayscale_ ml-2 hidden"
                    />
                    {true && (
                      <div className="w-6 h-6 z-[9999] text-xs flex items-center justify-center absolute right-[0px] top-[-9px] border stroke-1 rounded-sm text-muted-foreground bg-gray-50">
                        2
                      </div>
                    )}

                    <span className="flex flex-col items-center px-2">
                      <MessageCircle className="w-6 h-6 z-[999] stroke-1 text-gray-400 fill-gray-300__" />{" "}
                      <span></span>
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Comments</p>
                </TooltipContent>
              </Tooltip>
              {/* <MushroomHoverCard
                mushroomCount={roundToInteger(
                  rating < 10 ? rating * 10 : rating
                )}
                peopleCount={roundToInteger(
                  rating < 10 ? rating * 10 - 2 : rating - 1
                )}
              /> */}
              <Tooltip open={false} delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    onClick={
                      () => {
                        setIsMushroomAnimating(!isMushroomAnimating);
                        setMushroomCount(
                          mushroomCount + (isMushroomAnimating ? -1 : 1)
                        );
                      }
                      // toast(
                      //   <pre className="mt-0 w-[340px] rounded-md bg-slate-950 p-4">
                      //     <code className="text-white">
                      //       Functionality not yet implemented.
                      //     </code>
                      //   </pre>
                      // )
                    }
                    className={`group/btn _flex grayscale_  hover:grayscale-0 gap-2 transition-all duration-500 relative`}
                  >
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={16}
                      height={16}
                      className={`${isMushroomAnimating ? "scale-150 grayscale-0 animate-mushroomLove_ opacity-100" : "grayscale opacity-75"} origin-center transition-all _duration-500`}
                    />
                    <Heart
                      className={`w-4 h-4 animate-fadeIn absolute ${isMushroomAnimating ? "" : "hidden"} right-[7px] top-[1px] stroke-[2.5px] text-white fill-red-500 opacity-100`}
                    />
                    {!isMushroomAnimating && (
                      <Image
                        className="animate-bounce  absolute -top-8 -right-6 scale-90 hidden group-hover/btn:block"
                        src="/watercan3.png"
                        alt="can"
                        width="200"
                        height="170"
                      />
                    )}
                    {false && (
                      <Image
                        className=" absolute -top-12 -left-4 scale-50 hidden group-hover/btn:block"
                        src="/sun.png"
                        alt="can"
                        width="200"
                        height="173"
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="w-40_">Water the mushroom</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="relative hidden left-0 flex_ py-2 gap-4 w-12 bg-gray-50_  transition-all duration-500 border_"
                  >
                    <span className="flex flex-col items-center px-0">
                      <Map className="w-6 h-6 z-[10] stroke-1 text-gray-400 fill-gray-300__" />{" "}
                      <span></span>
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View {name} on Map</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="flex_ hidden relativen pr-4 gap-2 bg-gray-50_  transition-all duration-500 border_"
                  >
                    {true && (
                      <div className="w-6 h-6 z-[9999] flex items-center justify-center absolute right-[-6px] top-[-9px] border stroke-1 rounded-full text-muted-foreground bg-gray-50">
                        {passionateBackers}
                      </div>
                    )}

                    <span className="flex flex-col items-center justify-center">
                      <Image
                        alt="vote"
                        src={config.logoPath}
                        width={18}
                        height={18}
                        className="grayscale_"
                      />
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Power Backers</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
        <div
          className={` absolute bottom-4 right-[144px]- ${!isAnalyticsView && !photoUrl && !userId ? "left-[60px]" : "left-[260px]"} transition-all duration-500 hidden_ group-hover:block`}
        >
          {!isAnalyticsView && (
            <span className="hidden text-muted-foreground">{`${rating} / 3`}</span>
          )}
          <div
            className={`${isAnalyticsView || isForceRatingToShow ? "flex hidden__" : "hidden"} items-center flex-row space-x-0 text-sm text-muted-foreground`}
          >
            {/* <Button
              onClick={() => setIsAnalyticsView(!isAnalyticsView)}
              className="flex items-center font-normal mr-2"
              variant={"ghost"}
              size="icon"
            >
              <BarChart2Icon className="mr-1 h-4 w-4 fill-blue-500 text-gray-900" />
            </Button>
            <Separator
              orientation="vertical"
              className="h-4 bg-gray-300 mx-4 hidden"
            /> */}
            <div className="pl-0 flex_ items-center pr-8 hidden">
              <ChatBubbleIcon className="mr-1 h-4 w-4 text-gray-900" />
              {roundToInteger(totalPeople)} comments
            </div>
            <span className="pr-2 hidden">/</span>
            {/* <Rating rating={rating} /> */}
            {!isAnalyticsView && (
              <div className="pl-4 inline-block_ text-muted-foreground hidden">
                #{tags.join(" / ")} excellence ({rating})
              </div>
            )}
            {!isAnalyticsView && passionateBackers > 0 && (
              <div className="pl-4 relative top-2 inline-block_ text-muted-foreground">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        toast(
                          <pre className="mt-0 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                              Functionality not yet implemented.
                            </code>
                          </pre>
                        )
                      }
                      className="hidden _flex gap-2 transition-all duration-500 relative"
                    >
                      {latestBacker}{" "}
                      {passionateBackers > 1
                        ? `and ${passionateBackers - 1} other${passionateBackers - 1 === 1 ? "" : "s"}`
                        : ""}{" "}
                      super-charged this item with {passionateBackers} mushroom
                      {passionateBackers === 1 ? "" : "s"}
                      <Image
                        alt="vote"
                        src={config.logoPath}
                        width={16}
                        height={16}
                        className="opacity-80"
                      />
                      <Heart className="w-4 h-4 absolute__ hidden right-[12px] top-[3px] stroke-[0px] text-white fill-gray-300 opacity-100" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Super-charged this item</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            {!isAnalyticsView && passionateBackers === -1 && (
              <div className="pl-4 relative top-2 inline-block_ text-muted-foreground">
                <Button
                  variant={"ghost"}
                  className="flex gap-2 transition-all duration-500 relative"
                >
                  More on including extra{" "}
                  <Heart className="w-4 h-4 absolute__ hidden_ right-[12px] top-[3px] stroke-[0px] text-white fill-gray-300 opacity-100" />
                </Button>
              </div>
            )}
            <span className={`px-3 ${isAnalyticsView ? "inline" : "hidden"}`}>
              /
            </span>
            <span className={isAnalyticsView ? "inline" : "hidden"}>
              {rating < 0.249 && "no"}
              {rating > 0.249 && rating < 0.749 && "low"}
              {rating > 0.749 && rating < 1.249 && "low"}
              {rating > 1.249 && rating < 1.749 && "medium"}
              {rating > 1.749 && rating < 2.249 && "medium"}
              {rating > 2.249 && rating < 2.749 && "high"}
              {rating > 2.749 && "high"} excellence
              {isAnalyticsView && ` /  ${rating} average  /  99 responses`}
            </span>
            <div className="hidden pl-1 pr-8">
              {roundToInteger(totalPeople)} people
            </div>
            <div className="hidden text-muted-foreground _flex items-center gap-1.5 pl-6">
              <ThumbsDownIcon className="h-3.5 w-3.5 text-muted-foreground relative top-px" />
              {roundToInteger(ratings[0].value)}
            </div>
          </div>

          {/* <AnalyticsDialog ratings={ratingsProp} description={description} /> */}
        </div>

        {/* <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            
            Analytics
          </div>
          <div className="hidden _flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            20k
          </div>
        </div> */}
        {!isAnalyticsView && (
          <>
            <div
              className={`absolute hidden_ top-2 ${false ? "right-[54px]" : "left-2"} flex items-center gap-1`}
            >
              {tags

                .filter(
                  (tag) =>
                    !!tagDefinitions[tag] &&
                    !tagDefinitions.all.children.includes(tag) &&
                    tagDefinitions[tag]?.level === 3
                )
                .sort((a: string, b: string) => {
                  return (
                    (tagDefinitions[b]?.level || 0) -
                    (tagDefinitions[a]?.level || 0)
                  );
                })
                .map((tag) => (
                  <Button
                    key={tag}
                    className={`text-muted-foreground border-muted-foreground rounded-md py-0 max-h-[30px]`}
                    variant={"ghost"}
                    size="sm"
                    asChild
                  >
                    <Link
                      href={`?pt=${getPrimaryTagsFromTags(tags)[0]}&t3=${tag}`}
                    >
                      #{tag}
                    </Link>
                  </Button>
                ))}
              <SlashIcon className="h-4 w-4 text-muted-foreground/50" />
              <Button
                key={"place"}
                className={`text-muted-foreground border-muted-foreground rounded-md py-0 max-h-[30px]`}
                variant={"ghost"}
                size="sm"
                asChild
              >
                <Link href={`/profile/${profileId}`}>{name}</Link>
              </Button>
              {isEditable && id && (
                <ReasonEdit
                  id={id}
                  profileId={profileId}
                  description={description}
                  latlng={latlng}
                  rating={rating}
                  photoUrl={photoUrl}
                  tags={tags}
                />
              )}
            </div>
          </>
        )}
        <Separator
          orientation="vertical"
          className="h-20 absolute left-[154px] -mt-4_ top-[50%] -translate-y-1/2"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() =>
                toast(
                  <pre className="mt-0 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      Functionality not yet implemented.
                    </code>
                  </pre>
                )
              }
              variant={"ghost"}
              className="-mt-4_ flex opacity-80 hover:opacity-80 flex-col-reverse min-w-10 items-center px-1 py-2 gap-0 w-12 transition-all duration-500 text-muted-foreground"
            >
              {/* <span className=" px-4 scale-80">Backers</span> */}

              <span className="flex text-sm flex-col _flex-row-reverse items-center justify-center px-2 gap-0">
                <span className="text-4xl mt-2 font-bold pb-0">
                  {mushroomCount}
                </span>
                <span className="text-sm scale-[.8] origin-bottom flex-row-reverse absolute_ bottom-[0px] whitespace-nowrap gap-2 relative flex items-center">
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={16}
                    height={16}
                    className="opacity-80 hidden"
                  />{" "}
                  blue mushrooms
                </span>
                {!!passionateBackers && false && (
                  <>
                    <span>/</span>
                    <div className="flex items-center gap-1 text-md_ flex-row-reverse ">
                      <Image
                        alt="vote"
                        src={config.logoPath}
                        width={16}
                        height={16}
                        className="opacity-80"
                      />
                      <span>{passionateBackers}</span>
                    </div>
                  </>
                )}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back this item</p>
          </TooltipContent>
        </Tooltip>
        {false && showLinkToProfile && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                key={"id"}
                className={`absolute top-4 right-[256px] text-muted-foreground_ border-muted-foreground_ text-primary-foreground rounded-md py-0 max-h-[30px]`}
                variant={"default"}
                size="sm"
                asChild
              >
                <Link href={`/profile/${profileId}`}>{name}</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View profile</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardContent>
    </Card>
  );
}

function HalfMushroom({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        alt="vote"
        src={"/cute-mushroom-blue-half2.png"}
        width={24}
        height={24}
        className="opacity-100 relative z-10"
      />
      <Image
        // key={i}
        alt="vote"
        src={config.logoPath}
        width={24}
        height={24}
        className="opacity-5 hidden grayscale absolute top-0 left-0 z-0"
      />
    </div>
  );
}
