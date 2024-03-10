import { Reason } from "@/components/Reason";
import { db, fetchProfile } from "@/lib/firebase";
import { Reason as ReasonType } from "@/lib/profile";
import { cn, generateRandomDecimal } from "@/lib/utils";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  collectionGroup,
  addDoc,
  and,
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
    limit(30),
    orderBy("rating", "desc")
  );
  const querySnapshot = await getDocs(reasons);
  console.log("querySnapshot", querySnapshot.size, tagIds);
  const promises = [];
  querySnapshot.forEach((docA) => {
    const refParent = docA.ref.parent.parent;

    console.log(docA.id, " => ", docA.data());
    console.log("parent id", refParent?.id);

    // const docRef = doc(db, "entity", refParent?.id || "");
    // const docSnap = getDoc(docRef).then((data) => data.data());
    // const parentLatLng = docSnap?.data()?.latlng as GeoPoint;

    if (!!refParent?.id) {
      // promises.push(await fetchProfile([refParent?.id]));
    }

    // console.log("profile", profile);
    data.push({
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
      // photoUrl: refParent?.id ? `/${refParent?.id}.jpg` : undefined,
    });
    console.log("data...", data[0]);
  });
  console.log("LOOP");
  const ps = data.map((item) => {
    const docRef = doc(db, "entity", item.parentId || "");
    return getDoc(docRef);
  });
  const parentData: Array<any> = (await Promise.all(ps)).map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  const results = data
    .map((item) => {
      const pdata = parentData.find((obj) => obj.id === item.parentId);
      console.log("pdata", pdata);
      return {
        ...item,
        photoUrl: item.photoUrl,
        parentPhotoUrl: pdata?.pic,
        latlng: pdata?.latlng
          ? {
              lat: pdata?.latlng.latitude || pdata?.latlng.lat,
              lng: pdata?.latlng.longitude || pdata?.latlng.lng,
            }
          : null,
      };
    })
    .filter((o) => !!o.latlng);

  return (
    <main
      className={cn(
        "relative flex min-h-screen max-w-7xl w-full mx-auto mt-0 flex-col items-start justify-start px-4 py-0"
      )}
    >
      <ClientAPIProvider apiKey={API_KEY}>
        <PageContent
          title={tagIds.join(" / ").replace(/[-_]/g, " ")}
          results={results}
          // onCompareChange={handleAddEntityToCompare}
        />
      </ClientAPIProvider>
    </main>
  );
}
