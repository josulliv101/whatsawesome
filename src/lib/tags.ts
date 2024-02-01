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
  "college",
];

export const tagDefinitions = {
  all: {
    children: ["person", "place"],
  },
  person: {
    plural: "people",
    parentTag: "all",
    children: ["comedian", "musician", "sports"],
  },
  place: {
    plural: "places",
    parentTag: "all",
    children: ["museum", "nature", "college"],
  },
  sports: {
    parentTag: "person",
  },
  comedian: { plural: "comedians", parentTag: "person" },
  musician: { plural: "musicians", parentTag: "person" },
  museum: { plural: "museums", parentTag: "place" },
  nature: { parentTag: "place" },
  college: { plural: "colleges", parentTag: "place" },
};

export const getPrimaryTags = () => {
  tagDefinitions.all.children;
};

export const getHubTags = (
  tags: string | Array<string> = []
): {
  hub: string;
  primaryTag: PrimaryTagType;
  tags: Array<string>;
} => {
  const normalizedTags1 = typeof tags === "string" ? [tags] : tags;
  const [
    hub = config.rootHub,
    primaryTag = config.defaultPrimaryTag,
    ...restTags
  ] = normalizedTags1;

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

export const getHubUrl = (
  hub: string,
  primaryTag: string,
  tags: string[] = []
) => {
  return `/${hub}/${primaryTag}/${tags.join("/")}`;
};
