"use client";

import Image from "next/image";
import TabNav from "@/components/TabNav";
import { Reason as ReasonType } from "@/lib/profile";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import {
  AlertCircle,
  Archive,
  GlobeIcon,
  MessagesSquare,
  Globe,
  ShoppingCart,
  Users2,
  ArrowUpIcon,
  ArrowUpCircleIcon,
} from "lucide-react";
import SponsorCard from "@/components/SponsorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SideNav } from "@/components/SideNav";
import { LocationSwitcher } from "@/components/LocationSwitcher";
import { generateRandomDecimal } from "@/lib/utils";
import {
  and,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import PageContent from "../tags/[...tagIds]/PageContent";
import PageContentSmall from "./PageContentSmall";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { config, isRootHub } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import HubLink from "@/components/HubLink";
import { BreadcrumbWithDropdown } from "@/components/BreadcrumbWithDropdown";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const accounts = [
  {
    label: "Massachusetts",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "California",
    email: "alicia@gmail.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "New York",
    email: "alicia@me.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function Layout({
  children,
  content,
  params,
}: PropsWithChildren<{ params: any; content: ReactNode }>) {
  // const data: Array<Partial<ReasonType>> = [];

  const [data, setData] = useState([]);
  const segments = useSelectedLayoutSegments();
  const hub = segments[0].split("/")[0] || "all";
  const tag = segments[0].split("/")[2];
  console.log("segments", hub, tag);

  useEffect(() => {
    async function getData() {
      const tmp: Array<any> = [];
      const whereClause = [hub].map((tag) =>
        where(`tagMap.${tag}`, "==", true)
      );
      if (tag) {
        // whereClause.push(where(`tagMap.${tag}`, "==", true));
      }
      const reasons = query(
        collectionGroup(db, "whyawesome"),
        //where("tagMap.wings", "==", true),
        and(...whereClause),
        limit(5),
        orderBy("rating", "desc")
      );
      const querySnapshot = await getDocs(reasons);

      querySnapshot.forEach((docA) => {
        const refParent = docA.ref.parent.parent;

        console.log(docA.id, " => ", docA.data());
        console.log("parent id", refParent?.id);

        // const docRef = doc(db, "entity", refParent?.id || "");
        // const docSnap = getDoc(docRef).then((data) => data.data());
        // const parentLatLng = docSnap?.data()?.latlng as GeoPoint;

        // console.log("profile", profile);
        tmp.push({
          ...docA.data(),
          id: docA.id,
          parentId: refParent?.id,
          ratings: docA.data().ratings || {
            "-1": generateRandomDecimal(1, 99),
            0: generateRandomDecimal(1, 99),
            1: generateRandomDecimal(1, 99),
            2: generateRandomDecimal(1, 99),
            3: generateRandomDecimal(1, 99),
          },
          tags: Object.keys(docA.data().tagMap || {}),
          latlng: !!docA?.data()?.latlng ? docA?.data()?.latlng : undefined,
        });
        // console.log("data...", data[0]);
      });
      return tmp;
    }

    getData().then((d: any) => setData(d));
  }, [hub, tag]);

  // console.log("LOOP");
  // const ps = data.map((item) => {
  //   const docRef = doc(db, "entity", item.parentId || "");
  //   return getDoc(docRef);
  // });
  // const parentData: Array<any> = (await Promise.all(ps)).map((item) => ({
  //   ...(item.data() || {}),
  //   id: item.id,
  // }));
  const results: Array<any> = []; // data
  //   .map((item) => {
  //     const pdata = parentData.find((obj) => obj.id === item.parentId);
  //     console.log("pdata", pdata);
  //     return {
  //       ...item,
  //       photoUrl: item.photoUrl,
  //       parentPhotoUrl: pdata?.pic,
  //       latlng: pdata?.latlng
  //         ? {
  //             lat: pdata?.latlng.latitude || pdata?.latlng.lat,
  //             lng: pdata?.latlng.longitude || pdata?.latlng.lng,
  //           }
  //         : null,
  //     };
  //   })
  //   .filter((o) => !!o.latlng);
  // console.log("results", results);

  return (
    <>
      {/* <div>params: {JSON.stringify(content)}</div> */}

      <section className="w-full mx-auto px-0 m-0 border-0 border-red-600">
        <div className="grid md:grid-cols-12 gap-0 p-0 m-0">
          <aside className="sticky top-[0px] z-[90] h-screen bg-muted  self-start md:col-span-4 md:pt-0 px-2 border-r border-blue-200/20 ">
            <div className="absolute top-0 right-0 -translate-y-full h-[72px] w-px border-r border-dotted"></div>
            <div className="px-2 py-4 hidden">
              <LocationSwitcher accounts={accounts} isCollapsed={false} />
            </div>
            <div className="bg-white -mx-2 px-4 py-3 absolute bottom-0 border-r w-full flex gap-0 items-center justify-between z-50">
              <div className="flex items-center justify-center">
                <Image
                  alt="vote"
                  src={config.logoPath}
                  width={30}
                  height={30}
                  className="grayscale_  relative -top-px"
                />
                <div className="relative flex lg:flex-0 items-center">
                  {
                    <>
                      <span className="px-3 ml-1">/</span>
                      <Badge
                        variant={"default"}
                        className="w-auto rel top-[0px] left-[54px] transition-all duration-0 delay-0 ease-out rounded-sm z-20  whitespace-nowrap"
                      >
                        <HubLink
                          hub={hub}
                          className="flex items-center -m-1.5 px-1.5 py-2 gap-3"
                        >
                          <span
                            className={`capitalize font-semibold flex items-center gap-2 ${hub !== config.rootHub ? "pr-[0px]" : "pr-0"}`}
                          >
                            {!isRootHub(hub) && (
                              <Globe className="h-3.5 w-3.5 text-gray-100 dark:text-gray-900" />
                            )}
                            {!isRootHub(hub) ? hub : config.org}
                          </span>
                        </HubLink>
                      </Badge>
                    </>
                  }
                </div>
              </div>
              <Button
                size="icon"
                variant={"ghost"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUpCircleIcon className="h-6 w-6 text-muted-foreground" />
              </Button>
            </div>
            {/* <Tabs defaultValue="all">
              <div className="flex items-center justify-start px-4 py-2">
                <TabsList className="">
                  <TabsTrigger value="all" className="aria-selected:bg-white">
                    By City/Town
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="aria-selected:bg-white"
                  >
                    By Radius
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="m-0">
                <SideNav
                  isCollapsed={false}
                  links={[
                    {
                      title: "Boston",
                      label: "972",
                      // icon: Users2,
                      variant: "ghost",
                      id: "boston",
                    },
                    {
                      title: "Cambridge",
                      label: "342",
                      // icon: AlertCircle,
                      variant: "ghost",
                      id: "cambridge-ma",
                    },
                    {
                      title: "Arlington",
                      label: "128",
                      // icon: MessagesSquare,
                      variant: "ghost",
                      id: "arlington-ma",
                    },
                    {
                      title: "Lexington",
                      label: "8",
                      // icon: ShoppingCart,
                      variant: "ghost",
                      id: "lexington-ma",
                    },
                    {
                      title: "Somerville",
                      label: "21",
                      // icon: Archive,
                      variant: "ghost",
                      id: "somerville-ma",
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                ...
              </TabsContent>
            </Tabs> */}
            <PageContentSmall hub={hub} results={data} title="" hideMap />
          </aside>
          <main className="md:col-span-8 p-0 border-0 border-green-600">
            <div className="sticky top-[-14px] flex items-center justify-between pb-4 pt-6 mb-0 mx-0 px-4 rounded-md z-[99] bg-gray-50 w-full">
              <BreadcrumbWithDropdown hub={hub} />
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Hide Map</Label>
              </div>
            </div>
            {content}
            <main className="flex min-h-screen relative max-w-7xl mx-auto flex-col items-start justify-start px-0 pb-4 mt-0">
              {/* <div className="sticky__ top-20_ _left-16 z-0_">
          <TabNav />
        </div>
        <br /> */}

              {children}
            </main>
          </main>
        </div>
      </section>
    </>
  );
}
