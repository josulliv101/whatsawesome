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
    tags: ["person", "place"],
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
    tags: ["champion", "clutch", "leader", "passion", "defense"],
  },
  teacher: { plural: "teachers", parentTag: "person" },
  hero: { plural: "heroes", parentTag: "person" },
  comedian: {
    plural: "comedians",
    parentTag: "person",
    tags: ["timing", "push-boundaries"],
  },
  musician: { plural: "musicians", parentTag: "person" },
  museum: { plural: "museums", parentTag: "place", tags: ["location"] },
  nature: { parentTag: "place" },
  college: { plural: "colleges", parentTag: "place", tags: ["location"] },
  city: { plural: "locales", parentTag: "place" },
  restaurant: {
    plural: "restaurants",
    parentTag: "place",
    children: ["fine-dining", "bbq", "chinese", "mexican", "pizzashop"],
    tags: ["burger", "steak", "atmosphere", "drinks", "wings"],
  },
  technology: { plural: "technology", parentTag: "place" },
  brand: { plural: "brands", parentTag: "place" },
  hotel: {
    plural: "hotels",
    parentTag: "place",
    tags: ["atmosphere", "amenities", "dining", "location"],
  },
  nonprofit: { plural: "non-profits", parentTag: "place" },
  movie: {
    plural: "movies",
    parentTag: "place",
    tags: ["cast", "suspense", "drama", "story", "theme"],
  },
  coffeehouse: {
    plural: "coffeehouse",
    parentTag: "place",
    tags: ["coffee", "pastries", "soup"],
  },
  // dessert: { plural: "desserts", parentTag: "place" },
  bbq: { plural: "bbq", parentTag: "place" },
  outdoors: { plural: "outdoors", parentTag: "place" },

  burger: { plural: "burgers", parentTag: "restaurant" },
  location: { plural: "locations", parentTag: "restaurant" },
  wings: { plural: "wings", parentTag: "restaurant" },
  service: { plural: "service", parentTag: "restaurant" },
  steak: { plural: "steaks", parentTag: "restaurant" },
  seafood: { plural: "seafood", parentTag: "restaurant" },
  atmosphere: { plural: "atmosphere", parentTag: "restaurant" },
  drinks: { plural: "drinks", parentTag: "restaurant" },
  wine: { plural: "wines", parentTag: "restaurant" },
  menu: { plural: "menus", parentTag: "restaurant" },
  lobster: { plural: "lobsters", parentTag: "restaurant" },

  coffee: { plural: "coffees", parentTag: "coffeehouse" },
  pastry: { plural: "pastries", parentTag: "coffeehouse" },
  soup: { plural: "soups", parentTag: "coffeehouse" },

  clutch: { plural: "clutch", parentTag: "sports" },
  defense: { plural: "defense", parentTag: "sports" },
  champion: { plural: "champion", parentTag: "sports" },
  leader: { plural: "leader", parentTag: "sports" },
  passion: { plural: "passion", parentTag: "sports" },

  "fine-dining": {
    plural: "fine-dining",
    parentTag: "restaurant",
    tags: ["burger", "steak", "atmosphere", "drinks", "wings"],
  },

  mexican: {
    plural: "mexican",
    parentTag: "restaurant",
    tags: ["taco", "quaesadia", "burrito", "nachos", "wrap"],
  },
  chinese: {
    plural: "chinese",
    parentTag: "restaurant",
    tags: ["dumpling", "fried rice", "rangoon", "springroll", "lomein"],
  },
  pizzashop: {
    plural: "pizzashop",
    parentTag: "restaurant",
    tags: ["calzone", "pizza", "meatball", "garlic-bread", "slice"],
  },
};

export const getPrimaryTags = () => {
  tagDefinitions.all.children;
};

export const getPrimaryTagsFromTags = (tags: Array<string>) => {
  return tags.filter(
    (tag) =>
      tagDefinitions.place.children.includes(tag) ||
      tagDefinitions.person.children.includes(tag)
  );
};

export const getHubTagsFromTags = (tags: Array<string>) => {
  return tags.filter((tag) => !tagDefinitions[tag]);
};

export const getPlural = (tag: string) => tagDefinitions[tag]?.plural || tag;

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
