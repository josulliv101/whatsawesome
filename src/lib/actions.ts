"use server";

import { revalidatePath } from "next/cache";
import {
  addMushroom,
  addReasonToProfile,
  fetchProfile,
  incrementRating,
  updateReason,
} from "./firebase";
import { getCurrentUser } from "./auth";
import { sleep } from "./utils";

export async function handleAddEntityToCompare(entityId: string) {
  console.log("server logging...", entityId);
  const profile = await fetchProfile(entityId);
  return profile;
}

export async function handleUpdateReason(
  profileId: string,
  id: string,
  formState: any
) {
  const foobar = await updateReason(profileId, id, formState);
  return true;
}

async function handleSubmitReason(profileId: string, uid: string, data: any) {
  uid && (await addReasonToProfile(profileId, uid, data.reason));
  revalidatePath(`/profile/${profileId}`);
}

export async function leaveMushroom(
  userId: string,
  profileId: string,
  excellenceId: string,
  pathname: string,
  isAdd?: boolean
) {
  console.log("LEAVE isAdd is", isAdd);
  console.log(
    "leaveMushroom...1",
    pathname,
    userId,

    profileId,
    excellenceId
  );
  // const user = await getCurrentUser();
  console.log(
    "leaveMushroom...2",
    pathname,

    userId,
    profileId,
    excellenceId
  );
  const isSuccess = await addMushroom(userId, profileId, excellenceId, !!isAdd);

  const rating = await incrementRating(profileId, excellenceId, !!isAdd);
  // await sleep(600);
  revalidatePath(pathname + "/UrEbctTQEUUO0rc9VMmyMqSBdr53", "page");

  return { isSuccess, rating, uid: userId, userId, excellenceId, profileId };
}
