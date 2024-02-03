import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
} from "firebase/firestore";
import { config } from "./config";
import { PrimaryTagType } from "./tags";
import { Profile } from "./profile";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  authDomain: "fir-abc-a965d.firebaseapp.com",
  projectId: "fir-abc-a965d",
  storageBucket: "fir-abc-a965d.appspot.com",
  messagingSenderId: "360517790730",
  appId: "1:360517790730:web:0488ed0f086ee54e26c3f3",
};

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

export async function fetchProfile(profileId: string, uid?: string) {
  if (!profileId) {
    throw new Error("profile id is required.");
  }

  const docRef = doc(db, "entity", profileId);
  const docSnap = await getDoc(docRef);

  return {
    ...(docSnap.data() as Profile),
    id: docSnap.id,
  };
  /*
  const profileSnapshot = await db.collection("entity").doc(profileId).get();
  const reasonsSnapshot = await db
    .collection(`entity/${profileId}/whyawesome`)
    .get();
  console.log("UID", uid, profileId);
  let userVotesSnapshot;
  if (uid) {
    userVotesSnapshot = await db
      .collection("entity")
      .doc(profileId)
      .collection("votes")
      .doc(uid)
      .get();
  }

  const reasons: Profile["reasons"] = [];
  reasonsSnapshot.forEach((doc: any) =>
    reasons.push({ id: doc.id, ...doc.data() })
  );

  const currentUserVotes = userVotesSnapshot ? userVotesSnapshot.data() : {};
  // console.log("...", JSON.stringify(currentUserVotes));
  const {
    description,
    name,
    tagMap = {},
    hubTagMap = {
      college: true,
      comedian: true,
      museum: true,
      musician: true,
      nature: true,
      sports: true,
      movie: false,
    },
    ...rest
  }: any = profileSnapshot.data() || {};
  return {
    ...rest,
    id: profileId,
    profileId,
    description: description,
    name: name,
    tags: Object.keys(tagMap).map((tag) => ({ label: tag, value: tag })),
    reasons: reasons.sort((a, b) => {
      return b.votes - a.votes;
    }),
    currentUserVotes: currentUserVotes,
    hubTagMap,
  };
  */
}

export async function fetchHubProfiles(
  hub: string,
  primaryTag: PrimaryTagType,
  tags: Array<string> = []
) {
  console.log("fetchHubProfiles", hub, primaryTag, tags);

  const normalizedTags =
    !tags || !tags.length ? config.defaultHubTags[primaryTag] : tags;

  const queryHub = ![config.rootHub, "index"].includes(hub)
    ? [where(`tagMap.${hub}`, "==", true)]
    : [];

  const queryTags = normalizedTags.map((tag) =>
    where(`tagMap.${tag}`, "==", true)
  );

  const args = [
    collection(db, "entity"),
    where("oinks", ">", 0),
    ...queryHub,
    where(`tagMap.${primaryTag}`, "==", true),
    ...queryTags,
    orderBy("oinks", "desc"),
    limit(config.maxNumberOfProfilesInRow),
  ];

  const q = query.apply(null, args as any);
  const docs: Array<Profile> = [];

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docs.push({ ...(doc.data() as Profile), id: doc.id });
    });
  } catch (err) {
    console.log("err", err);
  }

  return { tags: [], label: tags.join(" + "), profiles: docs };
}

export async function fetchEntities(tags: Array<string> = []) {
  const queryTags = tags.map((tag) => where(`tagMap.${tag}`, "==", true));
  const args = [
    collection(db, "entity"),
    where("oinks", ">", 0),
    ...queryTags,
    orderBy("oinks", "desc"),
    limit(config.maxNumberOfProfilesInRow),
  ];

  const q = query.apply(null, args as any);

  const querySnapshot = await getDocs(q);
  const docs: Array<unknown> = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    docs.push({ ...(doc.data() as Record<string, unknown>), id: doc.id });
  });

  return docs;
}
