import {
  FilterByIdType,
  FilterOptions,
  FilterType,
  city,
  filters,
} from "@/lib/filters";

function getFilter(f: FilterType | FilterByIdType): FilterType {
  console.log("getFilter", f);
  if (typeof f === "string") {
    return filters[f];
  }
  return f;
}

function getTypeFromTags(tags: string[]) {
  if (tags?.includes("city")) {
    return "city";
  }
  if (tags?.includes("college")) {
    return "college";
  }
  return "all";
}

export default function useFilterOptions(
  tags: string[],
  primaryTag: string,
  filterTags: FilterType | FilterByIdType = getTypeFromTags(tags)
): { filterOptions: FilterOptions; filterId: string } {
  const filter: FilterType = getFilter(filterTags);
  const filterId =
    typeof filterTags === "string" ? filterTags : getTypeFromTags(tags);

  const tmp = [];

  if (!filter?.[primaryTag]) {
    return { filterId: "all", filterOptions: [] };
  }
  for (const [tag, order] of Object.entries(filter[primaryTag])) {
    console.log(`${tag}: ${order}`);
    if (typeof order === "number") {
      tmp.push({ tag, order });
    }
  }

  const filterOptions = tmp
    .sort((a, b) => a.order - b.order)
    .map(({ order, tag }) => ({ label: tag, value: tag, active: order > 0 }));
  return { filterOptions, filterId };
}
