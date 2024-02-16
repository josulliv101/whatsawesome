"use client";

import {
  ChatBubbleIcon,
  ChevronDownIcon,
  CircleIcon,
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
  Tooltip,
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
  MehIcon,
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
import { useState } from "react";
import { config } from "@/lib/config";

export function Reason({
  id,
  description,
  name,
  rating,
  photoUrl,
  profileId,
  userRating,
  ratings: ratingsProp = {},
  isAnalytcisView,
}: {
  id?: string;
  description: string;
  name: string;
  rating: number;
  photoUrl?: string;
  profileId: string;
  userRating?: number;
  ratings?: Record<string, number>;
  isAnalytcisView?: boolean;
}) {
  const [isAnalyticsView, setIsAnalyticsView] = useState(false);
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
      name: "accurate",
      value: ratingsProp["1"],
      rank: 2,
    },
    { name: "major", value: ratingsProp["2"] },
    {
      name: "one of many",
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

  return (
    <Card className="group relative w-full min-h-[222px] flex flex-col md:flex-row items-center gap-0 py-0 ">
      {
        <div className=" w-full md:w-auto">
          {photoUrl && (
            <Image
              className="grayscale__ hover:grayscale-0__ object-cover w-full h-full max-h-[300px] max-w-full block min-w-full md:h-[220px] md:max-w-[220px] md:w-auto min-h-full md:min-w-[220px] overflow-hidden opacity-80"
              width="180"
              height="135"
              src={photoUrl}
              alt=""
            />
          )}
          {!photoUrl && (
            <div
              className={`grayscale__ hover:grayscale-0__ object-cover w-full h-full max-h-[300px] ${isAnalyticsView ? "max-w-full" : "max-w-0"}  ${isAnalyticsView ? "md:max-w-[220px]" : "md:max-w-0"} block ${isAnalyticsView ? "min-w-full" : "min-w-0"} md:h-[220px]  ${isAnalyticsView ? "md:w-auto" : "md:w-0"} min-h-full ${isAnalyticsView ? "md:min-w-[220px]" : "md:min-w-0"} overflow-hidden opacity-80 transition-all duration-500 ease-in-out`}
            />
          )}
          {isAnalyticsView && (
            <div className="bg-gray-50 absolute top-0 left-0 h-[220px] w-[220px]">
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
                    className="mt-10 relative top-10"
                    // cy={200}
                    // dy={10}
                    // horizOriginX={100}
                    // padding={{ top: 20 }}
                    spacing={20}
                    // y={20}
                    // style={{ paddingTop: 100 }}
                  />
                  <YAxis type="category" width={0} dataKey="name" />
                  {/* <Tooltip /> */}
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
            </div>
          )}
        </div>
      }
      <CardHeader className="relative z-50 flex-1 px-16 pt-0 pb-0 pr-0 grid grid-cols-[1fr] items-start gap-0s space-y-0">
        <div className="space-y-1">
          {/* <CardTitle>whats awesome about {name}</CardTitle> */}
          <CardDescription className="text-xl mt-[-36px] lg:text-2xl leading-relaxed first-letter:text-4xl first-letter:pr-0.5 fir lg:leading-[2.25rem]">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-4 pt-1">
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
            created by @josulliv101
          </div>
        </div>
        <div className="absolute bottom-2 right-8">
          {id && (
            <RateReason
              profileId={profileId}
              reasonId={id}
              userRating={userRating}
            />
          )}
        </div>
        <div
          className={` absolute bottom-2 right-4_ ${!isAnalyticsView && !photoUrl ? "left-[60px]" : "left-[284px]"} transition-all duration-500 hidden_ group-hover:block`}
        >
          <div className="flex items-center flex-row space-x-0 text-sm text-muted-foreground">
            <Button
              onClick={() => setIsAnalyticsView(!isAnalyticsView)}
              className="flex items-center font-normal "
              variant={"ghost"}
              size="icon"
            >
              <BarChart2Icon className="mr-1 h-4 w-4 fill-blue-500 text-gray-900" />
            </Button>
            <Separator
              orientation="vertical"
              className="h-4 bg-gray-300 mx-4 hidden"
            />
            <div className="pl-1 flex_ items-center pr-8 hidden">
              <ChatBubbleIcon className="mr-1 h-4 w-4 text-gray-900" />
              {roundToInteger(totalPeople)} comments
            </div>
            <span className="pr-2 hidden">/</span>
            <div className="flex items-center gap-0.5 pl-4">
              {[...new Array(roundToInteger(Math.min(score, 3)))].map(
                (_, i) => (
                  <Image
                    key={i}
                    alt="vote"
                    src={config.logoPath}
                    width={16}
                    height={16}
                  />
                )
              )}
              <Image
                alt="vote"
                src={"/cute-mushroom-blue-half2.png"}
                width={16}
                height={16}
              />
            </div>
            <span>
              / {roundToNearestHalf(Math.min(score, 3))} of 3 rating /
            </span>
            <div className="pl-1 pr-8">
              {roundToInteger(totalPeople)} people
            </div>
            <Separator
              orientation="vertical"
              className="h-4 bg-gray-300 hidden"
            />
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
      </CardContent>
    </Card>
  );
}
