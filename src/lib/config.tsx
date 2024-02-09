import { PrimaryTagType } from "./tags";

export const config = {
  logoPath: "/cute-mushroom-blue.png",
  maxNumberOfProfilesInRow: 8,
  totalPaginationProfiles: 20,
  rootHub: "all",
  rootHubAliases: ["index"] as string[],
  defaultPrimaryTag: "person",
  defaultHubTags: {
    person: ["musician", "sports", "comedian"],
    place: ["city", "museum", "nature"],
  },
} as const;

export function isRootHub(hub: string): boolean {
  return hub === config.rootHub || config.rootHubAliases.includes(hub);
}
