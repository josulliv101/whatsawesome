import { PrimaryTagType } from "./tags";

export const config = {
  maxNumberOfProfilesInRow: 8,
  rootHub: "all",
  defaultPrimaryTag: "person",
  defaultHubTags: {
    person: ["musician", "sports", "comedian"],
    place: ["city", "museum", "nature"],
  },
} as const;
