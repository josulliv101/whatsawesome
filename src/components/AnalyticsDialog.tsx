"use client";

import Image from "next/image";
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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart2Icon,
  BarChartIcon,
  MehIcon,
  ThumbsDownIcon,
} from "lucide-react";
import { PropsWithChildren } from "react";
import { config } from "@/lib/config";
import { generateRandomDecimal } from "@/lib/utils";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function AnalyticsDialog({
  description,
  ratings: ratingsProp = {},
}: PropsWithChildren<{
  description: string;
  ratings?: Record<string, number>;
}>) {
  const ratings = [
    {
      name: "disagree",
      value: ratingsProp["-1"] || generateRandomDecimal(1, 20),
    },
    {
      name: "no experience",
      value: ratingsProp["0"] || generateRandomDecimal(1, 20),
    },
    {
      name: "accurate",
      value: ratingsProp["1"] || generateRandomDecimal(1, 20),
    },
    { name: "major", value: ratingsProp["2"] || generateRandomDecimal(1, 20) },
    {
      name: "one of many",
      value: ratingsProp["3"] || generateRandomDecimal(1, 20),
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-sm font-normal">
          <BarChart2Icon className="mr-1 h-4 w-4" />
          View Analytics
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full min-h-[640px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 mb-3">
            <BarChart2Icon className="h-5 w-5" /> Analytics
          </DialogTitle>
          <DialogDescription className="bg-muted text-muted-foreground text-lg px-4 py-3">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4 pb-0 min-h-[400px] max-w-[220px]">
          <ResponsiveContainer width="100%" height="100%" maxHeight={200}>
            <BarChart
              width={220}
              height={200}
              data={ratings}
              layout="vertical"
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
              // barSize={8}
              // barCategoryGap={40}
              // barGap={40}
            >
              <CartesianGrid strokeDasharray="3 3" />
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
              <Bar dataKey="value" maxBarSize={20}>
                {data.map((entry, index) => (
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
          <div className=" w-full grid grid-cols-5 gap-6 px-3 ml-4">
            <div className=" flex flex-col items-center justify-start">
              <ThumbsDownIcon className="h-5 w-5 text-muted-foreground ml-4" />
            </div>
            <div className=" flex flex-col items-center justify-start">
              <MehIcon className="h-5 w-5 text-muted-foreground ml-2" />
            </div>
            <div className=" flex items-center justify-start grayscale ml-6 pl-0.5">
              <Image alt="vote" src={config.logoPath} width={16} height={16} />
            </div>
            <div className=" flex items-center justify-start gap-2 ml-2.5">
              <Image alt="vote" src={config.logoPath} width={16} height={16} />
              <Image alt="vote" src={config.logoPath} width={16} height={16} />
            </div>
            <div className=" flex items-center justify-start gap-2 -ml-2">
              <Image alt="vote" src={config.logoPath} width={16} height={16} />
              <Image alt="vote" src={config.logoPath} width={16} height={16} />
              <Image alt="vote" src={config.logoPath} width={16} height={16} />
            </div>
          </div>
        </div>
        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
