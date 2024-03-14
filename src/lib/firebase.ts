import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  GeoPoint,
  getCountFromServer,
  serverTimestamp,
} from "firebase/firestore";
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as vendorSignInWithEmailAndPassword,
} from "firebase/auth";

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
  addDoc,
} from "firebase/firestore";
import { config } from "./config";
import { PrimaryTagType, getPlural } from "./tags";
import { Profile, Reason } from "./profile";
import { generateRandomDecimal } from "./utils";
import { revalidatePath } from "next/cache";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  authDomain: "fir-abc-a965d.firebaseapp.com",
  projectId: "fir-abc-a965d",
  storageBucket: "fir-abc-a965d.appspot.com",
  messagingSenderId: "360517790730",
  appId: "1:360517790730:web:0488ed0f086ee54e26c3f3",
};

export { type User, onAuthStateChanged } from "firebase/auth";

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string };

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

export async function fetchUserRatingsForProfile(
  profileId: string,
  userId: string
): Promise<Record<string, number> | null> {
  if (!profileId) {
    throw new Error("profile id is required.");
  }

  if (!userId) {
    throw new Error("user id is required.");
  }

  const docRef = doc(db, "entity", profileId, "votes", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function fetchProfile(id: string | string[], uid?: string) {
  const profileId = Array.isArray(id) ? id[0] : id;
  if (!profileId) {
    throw new Error("profile id is required.");
  }

  const docRef = doc(db, "entity", profileId);
  const docSnap = await getDoc(docRef);
  const { tagMap, ...data } = docSnap.data() || {};

  const subColRef = collection(db, "entity", profileId, "whyawesome");

  const qSnap = await getDocs(subColRef);
  const reasons = qSnap.docs.map((d) => ({
    id: d.id,
    rating: generateRandomDecimal(0, 3),
    ratings: d.data().ratings || {
      "-1": generateRandomDecimal(1, 99),
      0: generateRandomDecimal(1, 99),
      1: generateRandomDecimal(1, 99),
      2: generateRandomDecimal(1, 99),
      3: generateRandomDecimal(1, 99),
    },
    ...d.data(),
    tags: Object.keys(d.data()?.tagMap || {}),
  })) as Profile["reasons"];

  return {
    ...(data as Profile),
    tags: Object.keys(tagMap || {}),
    id: docSnap.id,
    reasons: reasons
      .filter((item) => !item.userId)
      .sort((a, b) => b.rating - a.rating),
    reasonsUser: reasons.filter((item) => !!item.userId),
    latlng: {
      lat: (data.latlng as GeoPoint)?.latitude,
      lng: (data.latlng as GeoPoint)?.longitude,
    },
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
  tags: Array<string> = [],
  profileLimit: number = config.maxNumberOfProfilesInRow
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
    // where("oinks", ">", 0),
    ...queryHub,
    where(`tagMap.${primaryTag}`, "==", true),
    ...queryTags,
    orderBy("oinks", "desc"),
    limit(profileLimit),
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

  return {
    tags: tags,
    label: tags.map((tag) => getPlural(tag)).join(" + "),
    profiles: docs,
  };
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

export async function signInWithEmailAndPassword(
  auth: Auth,
  email: string,
  password: string
) {
  try {
    const userCreds = await vendorSignInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCreds.user.getIdToken();

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return false;
  }
}

export async function signOut() {
  try {
    await auth.signOut();

    const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resBody = (await response.json()) as unknown as APIResponse<string>;
    if (response.ok && resBody.success) {
      return true;
    } else return false;
  } catch (error) {
    console.error("Error signing out with Google", error);
    return false;
  }
}

export async function getCurrentUser() {
  const user = await auth.currentUser?.getIdTokenResult();
  console.log("client getCurrentUser", user);
  return user;
}
// firebase.auth().currentUser.getIdTokenResult()
//   .then((idTokenResult) => {
//      // Confirm the user is an Admin.
//      if (!!idTokenResult.claims.admin) {
//        // Show admin UI.
//        showAdminUI();
//      } else {
//        // Show regular user UI.
//        showRegularUI();
//      }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

export async function addReasonToProfile(
  profileId: string,
  userId: string,
  reason: string
) {
  if (!profileId) {
    throw new Error("profile id is required.");
  }

  if (!userId) {
    throw new Error("user id is required.");
  }

  const subColRef = collection(db, "entity", profileId, "whyawesome");
  const createdAt = serverTimestamp();

  const q = query(subColRef, where("userId", "==", userId));
  const snapshot = await getCountFromServer(q);
  console.log("count: ", snapshot.data().count);
  if (snapshot.data().count > 0) {
    throw new Error("Users may only add 1 item.");
  }

  addDoc(subColRef, { createdAt, reason, userId });
  console.log(`reasons added.`);
}

export async function addProfile({
  id,
  reasons = [],
  ...profile
}: Partial<Profile>) {
  console.log("formData", id, profile);
  if (!id) {
    throw new Error("profile id is required.");
  }

  // const refEntity = collection(db, "entity");
  // const refDoc = doc(refEntity, id);
  const docRef = doc(db, "entity", id);

  // Add or update the document
  await setDoc(docRef, profile);
  // await db.collection("entity").doc(profileId).set(profile);

  const subColRef = collection(db, "entity", id, "whyawesome");

  // Add any new reasons to the collection
  reasons
    .filter((reason) => !reason?.id)
    .forEach(async (reason) => {
      // const whyawesomeRef = collection(refDoc, "whyawesome");
      addDoc(subColRef, {
        ...reason,
        latlng: profile.latlng || reason.latlng,
        rating: reason.rating ?? 1,
      });

      // await db
      //   .collection("entity")
      //   .doc(profileId)
      //   .collection("whyawesome")
      //   .add(reason);
    });
  console.log(`reasons added.`);
}

export async function rateReason(
  userId: string,
  profileId: string,
  reasonId: string,
  rating: number = 0
): Promise<boolean> {
  const subColRef = collection(db, "entity", profileId, "votes");
  const docRef = doc(db, "entity", profileId, "votes", userId);
  const snapshot = await setDoc(
    docRef,
    { [reasonId]: rating },
    { merge: true }
  );

  return true;
}

export async function updateReason(
  profileId: string,
  reasonId: string,
  data: any
): Promise<boolean> {
  const docRef = doc(db, "entity", profileId, "whyawesome", reasonId);
  const { tags = [], rating, id, description, ...dataNoTags } = data;
  const tagMap = tags.reduce((acc: Record<string, true>, tag: string) => {
    return { ...acc, [tag]: true };
  }, {});

  console.log("tag map / dataNoTags", tagMap, dataNoTags);
  const snapshot = await setDoc(
    docRef,
    { ...dataNoTags, tagMap, rating: Number(rating), reason: description },
    { merge: false }
  );
  revalidatePath(`/profile/${profileId}`);

  return true;
}

export async function updateReasonTag(
  profileId: string,
  reasonId: string,
  tags: string[]
): Promise<boolean> {
  const docRef = doc(db, "entity", profileId, "whyawesome", reasonId);

  const map = tags.reduce((acc, tag) => {
    return { ...acc, [tag]: true };
  }, {});

  console.log("map", map);
  const snapshot = await setDoc(
    docRef,
    {
      tagMap: map,
    },
    { merge: true }
  );

  return true;
}
