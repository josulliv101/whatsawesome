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
  ShoppingCart,
  Users2,
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
  console.log("segments", hub);

  useEffect(() => {
    async function getData() {
      const tmp: Array<any> = [];
      const whereClause = [hub].map((tag) =>
        where(`tagMap.${tag}`, "==", true)
      );
      const reasons = query(
        collectionGroup(db, "whyawesome"),
        //where("tagMap.wings", "==", true),
        and(...whereClause),
        limit(3),
        orderBy("rating", "desc")
      );
      const querySnapshot = await getDocs(reasons);

      const promises = [];
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
  }, [hub]);

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
        <div className="grid md:grid-cols-12 gap-4 p-0 m-0">
          <aside className="sticky top-[82px]  self-start md:col-span-3 md:pt-0 p-0 border-0 border-blue-600 bg-gray-100">
            <div className="px-2 py-4">
              <LocationSwitcher accounts={accounts} isCollapsed={false} />
            </div>
            <Tabs defaultValue="all">
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
            </Tabs>
            <PageContentSmall hub={hub} results={data} title="" hideMap />
          </aside>
          <main className="md:col-span-9 p-0 border-0 border-green-600">
            {content}
            <main className="flex min-h-screen relative max-w-7xl mx-auto flex-col items-start justify-start px-0 py-4 mt-0">
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
