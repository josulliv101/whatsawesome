export type FilterByIdType = string; // "all" | "city" | "college";

export type FilterType = Record<string, Record<string, number | null>>;

export type FilterOptions = Array<{
  label?: string;
  value: string;
  active?: boolean;
}>;

export let all: FilterType = {
  person: {
    comedian: 3,
    sports: 1,
    musician: 2,
  },
  place: {
    restaurant: 6,
    technology: 2,
    brand: 50,
    college: 8,
    nature: 60,
    museum: 3,
    city: -20,
    hotel: 30,
    movie: 40,
    nonprofit: 7,
  },
};

export let city: FilterType = {
  person: {
    ...all.person,
  },
  place: {
    ...all.place,
    city: null,
    college: 1,
  },
};

export let college: FilterType = {
  person: {
    ...city.person,
  },
  place: {
    ...city.place,
    college: null,
  },
};

export let restaurant = {}; // TODO

export let filters: Record<string, FilterType> = {
  all,
  city,
  college,
};
