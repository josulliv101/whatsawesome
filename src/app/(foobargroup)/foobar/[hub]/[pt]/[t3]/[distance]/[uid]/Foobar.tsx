import { collectionGroup, query, where, getDocs } from "firebase/firestore";

import { getCurrentUser } from "@/lib/auth";
import { db, fetchProfile } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default async function Foobar({
  uid,
  excellenceId,
  profileId,
  rating,
}: {
  uid?: string;
  excellenceId: string;
  profileId: string;
  rating: number;
}) {
  // const data = [];
  // const mushrooms = query(
  //   collectionGroup(db, "mushrooms")
  //   // where("userId", "==", uid)
  // );
  // const querySnapshot = await getDocs(mushrooms);

  // querySnapshot.forEach((doc) => {
  //   console.log("mushroom", doc.id, " => ", doc?.ref?.parent?.parent?.id);
  //   data.push({
  //     ...doc.data(),
  //     excellenceId: doc?.ref?.parent?.parent?.id,
  //     profileId: doc?.ref?.parent?.parent?.parent?.parent?.id,
  //   });
  // });

  // const dataMap = data.reduce((acc, item) => {
  //   return { ...acc, [item.excellenceId]: item };
  // }, {});

  await new Promise((r) => setTimeout(r, 4000));
  const hubProfile = await fetchProfile("arlington-ma");

  const isAdd = true; // dataMap[excellenceId].mushroom !== true;
  return (
    <div className="flex items-center gap-1">
      <Button size={"sm"} onClick={undefined}>
        {rating} {isAdd ? "Add" : "Remove"}
      </Button>
    </div>
  );
}
