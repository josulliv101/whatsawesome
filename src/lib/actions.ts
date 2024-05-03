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
  isAdd?: boolean
) {
  const user = await getCurrentUser();
  console.log("leaveMushroom...", user?.uid, userId, profileId, excellenceId);
  const isSuccess = await addMushroom(userId, profileId, excellenceId, isAdd);

  const rating = await incrementRating(profileId, excellenceId, isAdd);
  // await new Promise((r) => setTimeout(r, 10000));
  revalidatePath(`/foobar/boston/restaurant/burger/20`, "page");

  return { isSuccess, rating, uid: user?.uid, userId, excellenceId, profileId };
}
