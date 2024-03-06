import { Reason } from "@/components/Reason";
import { db, fetchProfile } from "@/lib/firebase";
import { Reason as ReasonType } from "@/lib/profile";
import { cn, generateRandomDecimal } from "@/lib/utils";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  limit,
  or,
  and,
  orderBy,
  GeoPoint,
} from "firebase/firestore";
import GoogleMap, { ClientAPIProvider } from "./GoogleMap";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageContent from "./PageContent";
import { APIProvider } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default async function Page({
  params: { tagIds },
}: {
  params: { tagIds: string[] };
}) {
  const data: Array<Partial<ReasonType>> = [];
  const whereClause = tagIds.map((tag) => where(`tagMap.${tag}`, "==", true));
  const reasons = query(
    collectionGroup(db, "whyawesome"),
    //where("tagMap.wings", "==", true),
    and(...whereClause),
    limit(10),
    orderBy("rating", "desc")
  );
  const querySnapshot = await getDocs(reasons);

  const promises = [];
  querySnapshot.forEach((doc) => {
    const refParent = doc.ref.parent.parent;
    console.log(doc.id, " => ", doc.data());
    console.log("parent id", refParent?.id);

    if (!!refParent?.id) {
      // promises.push(await fetchProfile([refParent?.id]));
    }

    // console.log("profile", profile);
    data.push({
      ...doc.data(),
      id: doc.id,
      parentId: refParent?.id,
      ratings: doc.data().ratings || {
        "-1": generateRandomDecimal(1, 99),
        0: generateRandomDecimal(1, 99),
        1: generateRandomDecimal(1, 99),
        2: generateRandomDecimal(1, 99),
        3: generateRandomDecimal(1, 99),
      },
      tags: Object.keys(doc.data().tagMap || {}),
      latlng: !!doc.data().latlng
        ? {
            lat: (doc.data().latlng as GeoPoint)?.latitude,
            lng: (doc.data().latlng as GeoPoint)?.longitude,
          }
        : undefined,
      // photoUrl: refParent?.id ? `/${refParent?.id}.jpg` : undefined,
    });
    console.log("data", data);
  });

  const results = data.filter((item) => !!item.latlng);
  // .map((item) => item.latlng);

  return (
    <main
      className={cn(
        "relative flex min-h-screen max-w-7xl mx-auto mt-0 flex-col items-start justify-start px-4 py-0"
      )}
    >
      <ClientAPIProvider apiKey={API_KEY}>
        <PageContent
          title={tagIds.join(" / ").replace(/[-_]/g, " ")}
          results={results}
        />
      </ClientAPIProvider>
    </main>
  );
}
