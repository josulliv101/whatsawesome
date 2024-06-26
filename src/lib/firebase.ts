import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  GeoPoint,
  collectionGroup,
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
import { allTags, config } from "./config";
import { PrimaryTagType, getPlural, tagDefinitions } from "./tags";
import { Profile, Reason } from "./profile";
import {
  deduplicateArray,
  generateRandomDecimal,
  roundToInteger,
  sleep,
} from "./utils";
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

export async function fetchProfile(
  id: string | string[],
  includeReasons: boolean = true
) {
  const profileId = Array.isArray(id) ? id[0] : id;
  if (!profileId) {
    throw new Error("profile id is required.");
  }

  const docRef = doc(db, "entity", profileId);
  const docSnap = await getDoc(docRef);
  const { tagMap, ...data } = docSnap.data() || {};

  const subColRef = collection(db, "entity", profileId, "whyawesome");

  const qSnap = await getDocs(subColRef);
  const reasons = includeReasons
    ? (qSnap.docs.map((d) => ({
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
      })) as Profile["reasons"])
    : [];

  const tagsAll = qSnap.docs.reduce((acc, item) => {
    const tags = item?.data()?._tags || [];
    return acc.concat(tags);
  }, []);

  return {
    ...(data as Profile),
    tags: Object.keys(tagMap || {}),
    tagsAll: deduplicateArray(tagsAll).sort(),
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

export async function fetchHubProfilesForAllTags(
  hub: string,
  primaryTag?: string,
  profileLimit: number = config.maxNumberOfProfilesInRow
) {
  // await sleep(1000);
  const tagsToUse = primaryTag ? [primaryTag] : allTags;

  const promises = tagsToUse
    .filter((tag) => tag !== "all")
    .map((tag) => fetchHubProfiles2(hub, [tag]));

  const data = await Promise.all(promises);
  console.log("allTags", allTags);

  return data;
}

export async function fetchHubProfiles2(
  hub: string,
  tags: Array<string> = [],
  profileLimit: number = config.maxNumberOfProfilesInRow
) {
  console.log("fetchHubProfiles", hub, tags);

  const normalizedTags =
    !tags || !tags.length
      ? [...config.defaultHubTags.person, ...config.defaultHubTags.place]
      : tags;
  console.log("normalizedTags", normalizedTags);
  const queryHub = ![config.rootHub, "index"]?.includes(hub)
    ? [where(`tagMap.${hub}`, "==", true)]
    : [];

  const queryTags = normalizedTags.map((tag) =>
    where(`tagMap.${tag}`, "==", true)
  );

  const args = [
    collection(db, "entity"),
    // where("oinks", ">", 0),
    ...queryHub,
    // where(`tagMap.${primaryTag}`, "==", true),
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
    hub: hub,
    tags: tags,
    label: tags.map((tag) => getPlural(tag)).join(" + "),
    profiles: docs,
  };
}

export async function fetchHubProfiles(
  hub: string,
  primaryTag: PrimaryTagType,
  tags: Array<string> | null = [],
  profileLimit: number = config.maxNumberOfProfilesInRow
) {
  console.log("fetchHubProfiles", hub, primaryTag, tags);

  const normalizedTags =
    tags === null
      ? []
      : !tags || !tags.length
        ? config.defaultHubTags["place"]
        : tags;

  const queryHub = ![config.rootHub, "index"]?.includes(hub)
    ? [where(`tagMap.${hub}`, "==", true)]
    : [];

  const queryTags = normalizedTags.map((tag) =>
    where(`tagMap.${tag}`, "==", true)
  );
  console.log("normalizedTags", normalizedTags);
  const args = [
    collection(db, "entity"),
    // where("oinks", ">", 0),
    ...queryHub,
    where(`tagMap.${primaryTag}`, "==", true),
    ...queryTags,
    // orderBy("oinks", "desc"),
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
    label: tags?.map((tag) => getPlural(tag)).join(" + "),
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

export async function signOut(pathName: string) {
  try {
    await auth.signOut();

    const response = await fetch("/api/auth/sign-out", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (pathName) {
      console.log("logging out, current path is", pathName);
      // revalidatePath(pathName);
    }

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
  tagMap = {},
  latlng = null,
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
  await setDoc(docRef, {
    ...profile,
    _tags: Object.keys(tagMap),
    _geoloc: latlng
      ? {
          lat: latlng.latitude || latlng.lat,
          lng: latlng.longitude || latlng.lng,
        }
      : { lat: 0, lng: 0 },
  });
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
  const tagMap = tags?.reduce((acc: Record<string, true>, tag: string) => {
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
  const parentDocRef = doc(db, "entity", profileId);
  const docRef = doc(db, "entity", profileId, "whyawesome", reasonId);

  const parentDocSnap = await getDoc(parentDocRef);
  const parentTagMap = parentDocSnap.exists()
    ? parentDocSnap.data().tagMap
    : {};

  const parentHubTags = Object.keys(parentTagMap).filter(
    (tag) =>
      !!tag ||
      (!tagDefinitions[tag] &&
        [
          "boston",
          "cambridge-ma",
          "arlington-ma",
          "lexington-ma",
          "somerville-ma",
          "burlington-ma",
        ]?.includes(tag))
  );

  const map = [...tags, ...parentHubTags]?.reduce((acc, tag) => {
    return { ...acc, [tag]: true };
  }, {});

  console.log("tags", map, parentTagMap);
  const snapshot = await setDoc(
    docRef,
    {
      tagMap: map,
    },
    { merge: true }
  );

  return true;
}

export async function fetchClaimsForHub(
  hub: string,
  tags: Array<string> = [],
  secondaryTags: Array<string> = [],
  teriaryTags: Array<string> = []
) {
  const hubList = hub === "all" ? [] : [hub];
  const whereQuery = [...hubList, ...tags, ...secondaryTags, ...teriaryTags]
    .filter((tag) => !!tag)
    .map((tag) => where(`tagMap.${tag}`, "==", true));
  const reasons = query(
    collectionGroup(db, "whyawesome"),
    ...whereQuery,
    limit(10),
    orderBy("rating", "desc")
  );

  const querySnapshot = await getDocs(reasons);
  const data: Array<any> = [];
  const parentIds: Array<string | undefined> = [];
  querySnapshot.forEach(async (doc) => {
    const refParent = doc.ref.parent.parent;
    parentIds.push(refParent?.id);
    const { tagMap, ...rest } = doc.data();
    data.push({
      ...rest,
      id: doc.id,
      parentId: refParent?.id,
      tags: Object.keys(tagMap),
    });
  });
  const parentProfiles: Array<any> = [];

  const promises = parentIds.map(async (parentId, index) => {
    return await fetchProfile(parentId || "");
  });

  const profiles = await Promise.all(promises);
  return data.map((datum, index) => ({
    ...datum,
    parent: {
      latlng: profiles[index].latlng,
      parentPhotoUrl: profiles[index].pic,
      name: profiles[index].name,
    },
  }));
}

export async function fetchTopClaimsForHub(
  hub: string,
  tags: Array<string> = [],
  secondaryTags: Array<string> = [],
  teriaryTags: Array<string> = []
) {
  const topClaimsCategories = [
    ["restaurant", "burger"],
    ["restaurant", "steak"],
    ["restaurant", "wine"],
    ["coffeehouse", "coffee"],
    ["coffeehouse", "pastries"],
    ["coffeehouse", "cannoli"],
  ];

  const topClaimsPromises: Array<any> = topClaimsCategories.map(
    async (tags = []) => {
      const hubList = hub === "all" ? [] : [hub];
      const whereQuery = [...hubList, ...tags]
        .filter((tag) => !!tag)
        .map((tag) => where(`tagMap.${tag}`, "==", true));

      const reasons = query(
        collectionGroup(db, "whyawesome"),
        ...whereQuery,
        limit(2),
        orderBy("rating", "desc")
      );

      return await getDocs(reasons);
    }
  );

  let results = await Promise.all(topClaimsPromises);

  const data: Array<any> = [];

  results.forEach((result, index) => {
    const querySnapshot = result;
    const resultData: Array<any> = [];
    const parentIds: Array<string | undefined> = [];
    querySnapshot.forEach(async (doc: any) => {
      const refParent = doc.ref.parent.parent;
      parentIds.push(refParent?.id);
      const { tagMap, ...rest } = doc.data();

      const datum = {
        ...rest,
        id: doc.id,
        parentId: refParent?.id,
        tags: Object.keys(tagMap),
      };

      resultData.push({
        ...datum,
        parent: {
          id: refParent?.id,
          // latlng: profiles[index].latlng,
          // parentPhotoUrl: profiles[index].pic,
          // name: profiles[index].name,
        },
      });
    });
    data.push({ tags: topClaimsCategories[index], results: resultData });
  });
  const parentPayloads: any = {};

  const parentIds = data?.reduce((acc, dataItem) => {
    return [...acc, ...dataItem.results.map((result: any) => result.parentId)];
  }, []);

  const promises = parentIds.map(async (parentId: any) => {
    return await fetchProfile(parentId || "");
  });

  const profiles = await Promise.all(promises);

  const newData = data?.reduce((acc, dataItem) => {
    const data = {
      ...dataItem,
      results: dataItem.results.map((result: any) => {
        const parentProfile = profiles
          .filter((p) => !!p)
          .find((profile) => profile.id === result.parentId);
        console.log("parentProfile", result.parentId, parentProfile);
        return {
          ...result,
          parent: {
            ...result.parent,
            latlng: parentProfile?.latlng,
            parentPhotoUrl: parentProfile?.pic,
            name: parentProfile?.name,
          },
        };
      }),
    };
    return [...acc, data];
  }, []);

  // console.log("...", newData[0].results[0]);
  return newData;
  // const querySnapshot = await getDocs(reasons);
  // const data: Array<any> = [];
  // const parentIds: Array<string | undefined> = [];
  // querySnapshot.forEach(async (doc) => {
  //   const refParent = doc.ref.parent.parent;
  //   parentIds.push(refParent?.id);
  //   const { tagMap, ...rest } = doc.data();
  //   data.push({
  //     ...rest,
  //     id: doc.id,
  //     parentId: refParent?.id,
  //     tags: Object.keys(tagMap),
  //   });
  // });
  // const parentProfiles: Array<any> = [];

  // const promises = parentIds.map(async (parentId, index) => {
  //   return await fetchProfile(parentId || "");
  // });

  // const profiles = await Promise.all(promises);
  // return data.map((datum, index) => ({
  //   ...datum,
  //   parent: {
  //     latlng: profiles[index].latlng,
  //     parentPhotoUrl: profiles[index].pic,
  //     name: profiles[index].name,
  //   },
  // }));
}

export async function convertTagMapToTags() {
  const entitiesQuery = query(
    collectionGroup(db, "whyawesome"),
    // collection(db, "entity"),
    // where(`_tags`, "array-contains", "museum"),
    // where(`name`, "<", "b"),
    limit(1100)
    // orderBy("latlng")
  );

  const querySnapshot = await getDocs(entitiesQuery);
  const docs: Array<any> = [];
  const items: Array<any> = [];
  querySnapshot.forEach(async (mydoc) => {
    const _tags = mydoc.get("_tags");
    const _geoloc = mydoc.get("_geoloc");

    if (_geoloc || !_tags?.includes("museum")) {
      return;
    }

    return items.push([mydoc.ref.parent.parent?.id, mydoc.id]);
    const parent = mydoc.ref.parent.parent;
    const docParentRef = doc(db, "entity", parent?.id as string);

    const docParentSnap = await getDoc(docParentRef);
    const parentLatlng = docParentSnap.get("_geoloc");

    console.log("parentLatlng", parentLatlng);
    // items.push(parent?.id as string);
    // const docRef = doc(db, "entity", parent?.id as string);
    // const docParentSnap = await getDoc(docRef);
    // const latlng = docParentSnap.get("_geoloc");
    // // parentId const parentData = parentId.;
    // console.log("docParentSnap.data()", docParentSnap.id, latlng);

    // if (!latlng) {
    //   return;
    // }
    docs.push(`${parent?.id as string} / ${mydoc.id}`);

    const snapshot = await setDoc(
      mydoc.ref,
      {
        _geoloc: parentLatlng,
      },
      { merge: true }
    );
  });

  const p1s = await Promise.all(
    items.map(async (item) => {
      const docRef = doc(db, "entity", item[0] as string);
      const docParentSnap = await getDoc(docRef);
      return docParentSnap.data();
    })
  );

  return p1s;
}

export async function checkIfIdExists(profileId: string) {
  const docRef = doc(db, "entity", profileId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      success: false,
      data: { profileId, message: "Profile id taken: " + profileId },
    };
  }
  return;
}

export async function createAreaOfExcellence(
  profileId: string,
  aoeId: string,
  data: any = {},
  tags: string[]
): Promise<boolean> {
  const parentDocRef = doc(db, "entity", profileId);

  if (!aoeId) {
    return false;
  }
  const docRef = doc(db, "entity", profileId, "whyawesome", aoeId);

  const parentDocSnap = await getDoc(parentDocRef);
  const parentTags = parentDocSnap.exists()
    ? parentDocSnap.data()._tags || []
    : [];

  const parentLocation = parentDocSnap.exists()
    ? parentDocSnap.data()._geoloc || []
    : [];

  const snapshot = await setDoc(
    docRef,
    {
      ...data,
      // reason: "wip",
      _tags: [
        "wip",
        ...parentTags,
        ...(typeof tags === "string" ? (tags as string).split(",") : tags),
      ],
      _geoloc: parentLocation,
    },
    { merge: true }
  );

  return true;
}

export async function updateProfilePic(id: string, pic: string) {
  const docRef = doc(db, "entity", id);

  await setDoc(docRef, { pic }, { merge: true });
}

export async function addMushroom(
  userId: string,
  profileId: string,
  excellenceId: string,
  isAdd: boolean = true
): Promise<any> {
  const docRef = doc(
    db,
    "entity",
    profileId,
    "whyawesome",
    excellenceId,
    "mushrooms",
    userId
  );
  console.log("addMushroom, doing add?");
  await setDoc(
    docRef,
    {
      mushroom: isAdd,
      userId,
    },
    { merge: true }
  );

  return true;
}

export async function fetchMushroomMapForUser(
  uid: string
): Promise<Record<string, any>> {
  // console.log("fetchMushroomMapForUser", uid);

  if (!uid || uid === "index") {
    return {};
  }
  // await sleep(3000);

  const dataMap: Record<string, any> = {};
  const mushrooms = query(
    collectionGroup(db, "mushrooms") // ,
    // where("userId", "==", uid)
  );

  const querySnapshot = await getDocs(mushrooms); // await

  querySnapshot.forEach((doc) => {
    // console.log("mushroom", doc.id, " => ", doc?.ref?.parent?.parent?.id);
    dataMap[doc?.ref?.parent?.parent?.id || ""] = {
      ...doc.data(),
      excellenceId: doc?.ref?.parent?.parent?.id,
      profileId: doc?.ref?.parent?.parent?.parent?.parent?.id,
    };
  });

  return dataMap;
}

export async function isMushroomPresentByUser(
  userId: string,
  profileId: string,
  excellenceId: string
): Promise<any> {
  // const docRef = doc(
  //   db,
  //   "entity",
  //   profileId,
  //   "whyawesome",
  //   excellenceId,
  //   "mushrooms",
  //   userId
  // );
  // await new Promise((r) => setTimeout(r, 2000));
  let rating = 0;
  let isPresent = false;

  try {
    const ratingData = await fetch(
      `https://firestore.googleapis.com/v1/projects/fir-abc-a965d/databases/(default)/documents/entity/${profileId}/whyawesome/${excellenceId}`,
      { cache: "no-store" } // TODO: switch to "force-cache"
    ).then((resp) => resp.json());

    if (ratingData?.fields?.rating) {
      rating = Number(
        ratingData.fields.rating?.integerValue ??
          ratingData.fields.rating?.doubleValue ??
          0
      );
    }
  } catch {}

  try {
    const userData = await fetch(
      `https://firestore.googleapis.com/v1/projects/fir-abc-a965d/databases/(default)/documents/entity/${profileId}/whyawesome/${excellenceId}/mushrooms/${userId}`,
      { cache: "no-store" } // TODO: switch to "force-cache"
    ).then((resp) => resp.json());

    if (typeof userData?.fields?.mushroom?.booleanValue === "boolean") {
      isPresent = userData?.fields?.mushroom?.booleanValue;
    }
  } catch {}

  return { isPresent, rating };
}

export async function incrementRating(
  profileId: string,
  excellenceId: string,
  isAdd?: boolean
): Promise<any> {
  const docRef = doc(db, "entity", profileId, "whyawesome", excellenceId);

  const snapshot = await getDoc(docRef);
  const rating = snapshot.exists() && snapshot.get("rating");
  const updatedRating =
    typeof rating === "number" ? roundToInteger(rating) + (isAdd ? 1 : -1) : 1;

  console.log("updatedRating", rating, updatedRating);
  await setDoc(
    docRef,
    {
      rating: updatedRating,
    },
    { merge: true }
  );
  return updatedRating;
}

export async function getExcellenceRating(
  profileId: string,
  excellenceId: string
): Promise<any> {
  const docRef = doc(db, "entity", profileId, "whyawesome", excellenceId);

  const snapshot = await getDoc(docRef);
  const rating = snapshot.exists() && snapshot.get("rating");

  return rating;
}
