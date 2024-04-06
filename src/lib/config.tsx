import { PrimaryTagType } from "./tags";

export const config = {
  org: "blue mushroom",
  logoPath: "/cute-mushroom-blue.png",
  maxNumberOfProfilesInRow: 8,
  totalPaginationProfiles: 20,
  rootHub: "all",
  rootHubAliases: ["index"] as string[],
  defaultPrimaryTag: "person",
  defaultHubTags: {
    person: ["musician", "sports", "comedian", "teacher"],
    place: [
      "museum",
      "restaurant",
      "nature",
      "college",
      "hotel",
      "coffeehouse",
      "nonprofit",
    ],
  },
} as const;

export const allTags = [
  // ...config.defaultHubTags.person,
  ...config.defaultHubTags.place,
].sort();

export function isRootHub(hub: string): boolean {
  return hub === config.rootHub || config.rootHubAliases.includes(hub);
}
