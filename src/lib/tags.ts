import { config } from "./config";

export type PrimaryTagType = "person" | "place";

export const tags: Array<string> = [
  "person",
  "place",
  "sports",
  "comedian",
  "musician",
  "museum",
  "nature",
];

export const tagDefinitions = {
  root: {
    children: ["person", "place"],
  },
  person: {
    plural: "people",
    parentTag: "root",
    children: ["comedian", "musician", "sports"],
  },
  place: {
    plural: "places",
    parentTag: "root",
    children: ["museum", "nature"],
  },
  sports: {
    parentTag: "person",
  },
  comedian: { plural: "comedians", parentTag: "person" },
  musician: { plural: "musicians", parentTag: "person" },
  museum: { plural: "museums", parentTag: "place" },
  nature: { parentTag: "place" },
};

export const getPrimaryTags = () => {
  tagDefinitions.root.children;
};

export const getHubTags = (
  tags: Array<string> = []
): {
  hub: string;
  primaryTag: PrimaryTagType;
  tags: Array<string>;
} => {
  const [
    hub = config.rootHub,
    primaryTag = config.defaultPrimaryTag,
    ...restTags
  ] = tags;

  const normalizedTags = (
    !restTags || !restTags.length
      ? config.defaultHubTags[primaryTag as PrimaryTagType]
      : restTags
  ) as string[];
  console.log("getHubTags restTags", restTags, normalizedTags);
  return {
    hub,
    primaryTag: primaryTag as PrimaryTagType,
    tags: normalizedTags,
  };
};
