import { config } from "./config";

export type PrimaryTagType = "person" | "place";

export const tags: Array<string> = [
  //"person",
  //"place",
  "sports",
  "comedian",
  "musician",
  "teacher",
  "museum",
  "nature",
  "college",
  //"city",
];

export const tagDefinitions: Record<string, any> = {
  all: {
    children: ["person", "place"],
  },
  person: {
    plural: "people",
    parentTag: "all",
    children: ["teacher", "sports", "musician", "hero", "comedian"],
  },
  place: {
    plural: "places",
    parentTag: "all",
    children: [
      "museum",
      "brand",
      "nature",
      "college",
      "restaurant",
      "technology",
      "hotel",
      "nonprofit",
      "movie",
      "coffeehouse",
      "dessert",
      "bbq",
      "outdoors",
      // events?
    ],
  },
  profile: {
    plural: "profiles",
    parentTag: "all",
    children: [],
  },
  sports: {
    parentTag: "person",
  },
  teacher: { plural: "teachers k-12", parentTag: "person" },
  hero: { plural: "local heroes", parentTag: "person" },
  comedian: { plural: "comedians", parentTag: "person" },
  musician: { plural: "musicians", parentTag: "person" },
  museum: { plural: "museums", parentTag: "place" },
  nature: { parentTag: "place" },
  college: { plural: "colleges", parentTag: "place" },
  city: { plural: "locales", parentTag: "place" },
  restaurant: {
    plural: "restaurants",
    parentTag: "place",
    tags: ["burger", "steak", "atmosphere", "drinks", "service"],
  },
  technology: { plural: "tech companies", parentTag: "place" },
  brand: { plural: "brands", parentTag: "place" },
  hotel: { plural: "hotels", parentTag: "place" },
  nonprofit: { plural: "non-profits", parentTag: "place" },
  movie: { plural: "movies", parentTag: "place" },
  coffeehouse: { plural: "coffeehouse", parentTag: "place" },
  dessert: { plural: "desserts", parentTag: "place" },
  bbq: { plural: "restaurants > bbq", parentTag: "place" },
  outdoors: { plural: "outdoors", parentTag: "place" },
};

export const getPrimaryTags = () => {
  tagDefinitions.all.children;
};

export const getPlural = (tag: string) => tagDefinitions[tag].plural || tag;

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

export const tagDefinitionsFood: Record<string, any> = {
  all: {
    children: ["food"],
  },
  food: {
    children: ["app", "entree", "salad", "dessert"],
  },
  app: {
    plural: "apps",
    parentTag: "food",
    children: ["comedian", "musician", "sports"],
  },
  entree: {
    plural: "entrees",
    parentTag: "food",
    children: ["museum", "nature", "college", "city", "restaurant"],
  },
  salad: {
    plural: "salads",
    parentTag: "food",
    children: [],
  },
  dessert: {
    plural: "dessert",
    parentTag: "food",
  },
};
