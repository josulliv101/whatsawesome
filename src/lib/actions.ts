"use server";

import { fetchProfile } from "./firebase";

export async function handleAddEntityToCompare(entityId: string) {
  console.log("server logging...");
  const profile = await fetchProfile(entityId);
  return profile;
}
