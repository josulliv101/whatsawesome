import { PrimaryTagType } from "./tags";

export const config = {
  maxNumberOfProfilesInRow: 8,
  rootHub: "root",
  defaultPrimaryTag: "person",
  defaultHubTags: {
    person: ["musician", "sports", "comedian"],
    place: ["museum", "nature", "college"],
  },
} as const;
