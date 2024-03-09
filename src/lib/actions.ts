"use server";

import { fetchProfile, updateReason } from "./firebase";

export async function handleAddEntityToCompare(entityId: string) {
  console.log("server logging...");
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
