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
} from "firebase/firestore";

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
    limit(10)
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
      photoUrl: refParent?.id ? `/${refParent?.id}.jpg` : undefined,
    });
  });

  return (
    <main
      className={cn(
        "relative flex min-h-screen max-w-7xl mx-auto mt-0 flex-col items-start justify-start px-4 py-6 lg:px-8 lg:py-12"
      )}
    >
      <h2 className="text-3xl mb-12">{tagIds.join(" / ")}</h2>
      <div className="flex flex-col gap-4">
        {data.map((reason) => (
          <div
            key={reason.id}
            className="bg-muted text-muted-foreground px-2 pb-2 rounded-md border"
          >
            <div className="px-4 py-4 flex items-center justify-start">
              {reason.parentId}
            </div>
            <Reason
              description={reason?.reason || ""}
              name={reason.id || ""}
              {...reason}
              rating={1}
              tags={[]}
              profileId="1"
              isForceRatingToShow
              // photoUrl={profile?.pic}
            ></Reason>
          </div>
        ))}
      </div>
    </main>
  );
}
