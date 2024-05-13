import { fetchProfile } from "./firebase";

export async function fetchSearchResults(
  q: string
): Promise<Array<{ name: string; id: string }>> {
  if (!q) {
    return [];
  }
  // const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity?query=${q}&aroundLatLng=40.71,-74.01&attributesToRetrieve=name,tags,description,pic&typoTolerance=false`;
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity?&attributesToRetrieve=&attributesToHighlight=&hitsPerPage=${10}&query=${q}`; // &insideBoundingBox=42.37399367067511,-71.04776763916017,42.36234444516898,-71.06157684326172
  const results = await fetch(url, {
    method: "GET",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data hits", data?.hits);
      return data?.hits
        .reverse()
        .map(({ name, objectID: id }: { name: string; objectID: string }) => ({
          name,
          id,
        }));
    })
    .catch((err) => console.error(err));
  return results || [];
}

export async function searchProfiles(
  query: string = "burlington-ma",
  hitsPerPage: number = 10
): Promise<Array<any>> {
  if (!query) {
    return [];
  }
  // const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity?query=${q}&aroundLatLng=40.71,-74.01&attributesToRetrieve=name,tags,description,pic&typoTolerance=false`;
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity?attributesToHighlight=&hitsPerPage=${hitsPerPage}&query=${query}`;
  return await fetch(url, {
    method: "GET",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
  })
    .then((response) => response.json())
    // .then((data) => {
    //   return data?.hits
    //     .reverse()
    //     .map(({ name, objectID: id }: { name: string; objectID: string }) => ({
    //       name,
    //       id,
    //     }));
    // })
    .catch((err) => console.error(err));
  // return results || [];
}

export async function searchProfilesByCategory(
  hub: string,
  categories: string[] = ["restaurant", "museum", "coffeehouse", "hotel"],
  hitsPerCategory: number = 10
): Promise<Array<any>> {
  if (!categories.length) {
    return [];
  }
  const promises = categories.map((category) =>
    searchProfiles([category, hub].join(","), hitsPerCategory)
  );
  const data = await Promise.all(promises);

  return data.map((datum, index) => ({
    tags: [categories[index]],
    label: categories[index],
    profiles: (datum as any)?.hits,
  }));
}

export async function searchProfilesByMapBounds(
  bounds: string,
  hitsPerCategory: number = 10
): Promise<any> {
  if (!bounds) {
    return Promise.resolve([]);
  }
  console.log("bounds", bounds);
  // const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity?query=${q}&aroundLatLng=40.71,-74.01&attributesToRetrieve=name,tags,description,pic&typoTolerance=false`;
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity/query`;
  const results = await fetch(url, {
    method: "POST",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
    body: JSON.stringify({
      attributesToHighlight: "",
      hitsPerPage: hitsPerCategory,
      insideBoundingBox: bounds,
    }),
  }).then((resp) => resp.json());
  console.log("results", results);
  return [results];
}

export function getCacheTagFromParams(
  hub: string,
  tags: Array<string> = [],
  distance: number = 0
) {
  const sortedTags = Array.isArray(tags)
    ? tags.filter((tag) => tag !== "place").sort()
    : [];
  return [hub, ...sortedTags, distance].join("-");
}

export async function searchTopAoe(
  hub: string,
  tags: string[] = [],
  hitsPerCategory: number = 10,
  pg: number = 0
): Promise<Array<any>> {
  console.log("searchTopAoe", hub, tags, hitsPerCategory, pg);
  const dedup = new Set([hub, ...tags]);
  const cacheTag = getCacheTagFromParams(hub, tags, 0); // [hub, ...tags, 0].join("-");
  const query = [...dedup].join(",");
  console.log("searchTopAoe cacheTag!!!", cacheTag);
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity_foobar_by_rating/query`; // ?&attributesToHighlight=&hitsPerPage=${hitsPerCategory}&query=${query}`;
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
    cache: "force-cache",
    next: { tags: [cacheTag] },
    body: JSON.stringify({
      attributesToHighlight: [],
      hitsPerPage: hitsPerCategory,
      query: "",
      page: pg,
      // aroundLatLng: latlng || "42.360484995562764, -71.05769136293631",
      // aroundRadius: searchRadius ? 2000 * searchRadius : undefined, // searchRadius * 16.0934 * 1000, // 1km ~ .0.621371 mile
      // insideBoundingBox: bounds, // "42.353451,-71.077697,42.363994,-71.046782",
      tagFilters: [hub, ...tags],
    }),
  })
    .then(async (response) => {
      const data = await response.json();
      console.log("response.json()", data);
      return data;
    })

    .catch((err) => console.error(err));

  return data;
}

export async function searchTopAoeByCategory(
  hub: string,
  categories: Array<any> = [
    ["restaurant", "burger"],
    ["coffeehouse", "pastries"],
    ["restaurant", "steak"],
    ["coffeehouse", "coffee"],
  ],
  hitsPerCategory: number = 10,
  pg: number = 0
): Promise<Array<any>> {
  console.log("searchTopAoeByCategory", hub, categories, hitsPerCategory, pg);
  const promises = categories?.map((category) =>
    searchTopAoe(
      hub,
      typeof category === "string" ? [category] : category || [],
      hitsPerCategory,
      pg
    )
  );
  const data = await Promise.all(promises);
  console.log("...", data);
  const parentIds = data?.reduce((acc: any, category: any) => {
    const map = category?.hits?.reduce(
      (acc2: any, item: any) => ({
        ...acc2,
        [getParentIdFromPath(item?.path)]: true,
      }),
      {}
    );
    return {
      ...acc,
      ...map,
    };
  }, {});
  const parentProfilePromises = Object.keys(parentIds)?.map(
    async (parentId) => {
      return fetchProfile(parentId);
    }
  );
  const parentData = await Promise.all(parentProfilePromises);
  const parentMap = parentData?.reduce((acc, profile) => {
    return { ...acc, [profile.id]: profile };
  }, {});

  return data.map((category) => {
    return {
      ...category,
      hits: (category?.hits as Array<any>)?.map((hit: any) => {
        const parentId = getParentIdFromPath(hit?.path);
        const profile = parentMap[parentId] as any;
        return {
          ...hit,
          parentId,
          parent: {
            id: parentId,
            name: profile.name,
            parentPhotoUrl: profile.pic,
            latlng: profile._geoloc,
          },
        };
      }),
    };
  });
}

export async function searchTopAoeByMapBounds(
  hub: string,
  tags: string[] = [],
  bounds: string,
  hitsPerCategory: number = 10
): Promise<any> {
  const dedup = new Set([...tags]);
  const query = [...dedup].join(",");
  console.log("searchTopAoeByMapBounds dedup", dedup);
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity_foobar_by_rating/query`;
  const results = await fetch(url, {
    method: "POST",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
    body: JSON.stringify({
      attributesToHighlight: "",
      hitsPerPage: hitsPerCategory,
      insideBoundingBox: bounds, // "42.353451,-71.077697,42.363994,-71.046782",
      tagFilters: dedup,
    }),
  }).then((resp) => resp.json());

  return results;
}

export async function searchTopAoeByTagFilter(
  hub: string,
  tags: string[] = [],
  // bounds: string,
  hitsPerCategory: number = 10
): Promise<any> {
  const dedup = new Set([...tags]);
  const query = [...dedup].join(",");
  console.log("searchTopAoeByMapBounds dedup", dedup);
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity_foobar_by_rating/query`;
  const results = await fetch(url, {
    method: "POST",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
    body: JSON.stringify({
      attributesToHighlight: [],
      hitsPerPage: hitsPerCategory,
      // insideBoundingBox: bounds, // "42.353451,-71.077697,42.363994,-71.046782",
      tagFilters: [
        [
          "arlington-ma",
          "medford-ma",
          "somervile-ma",
          "boston",
          "cambridge-ma",
          "lexington-ma",
          "bedford-ma",
          "burlington-ma",
        ],
        ["coffee", "steak", "burger", "pastries", "wings"],
      ],
    }),
  }).then((resp) => resp.json());

  const parentMap = results.hits?.reduce((acc: any, hit: any) => {
    const parentId = getParentIdFromPath(hit.path);
    return { ...acc, [parentId]: true };
  }, {});

  const parentIds = Object.keys(parentMap);

  const profiles = await getProfilesFromIds(parentIds);
  // console.log("profiles", profiles);

  const profileMap = profiles?.reduce((acc, item) => {
    return {
      ...acc,
      [item.id]: item,
    };
  }, {});

  return {
    ...results,
    hits: results.hits.map((hit: any) => {
      const parentId = getParentIdFromPath(hit.path);
      const profile = profileMap[parentId];
      return {
        ...hit,
        parent: {
          id: parentId,
          name: profile?.name,
          parentPhotoUrl: profile?.pic,
          latlng: profile?._geoloc,
        },
      };
    }),
  };
}

const includeReasons = false;

async function getProfilesFromIds(parentIds: Array<string>) {
  const promises = parentIds.map((id) => fetchProfile(id, includeReasons));

  return await Promise.all(promises);
}

function getParentIdFromPath(path = "") {
  return path?.split("/")?.[1];
}

const mileInKm = 16093;
export async function searchTopAoeByRadius(
  hub: string,
  searchRadius: number = 1,
  tags: string[] = [],
  radius: number = 10,
  hitsPerCategory: number = 10,
  pg: number = 0,
  asArray?: boolean,
  latlng?: any
): Promise<any> {
  const cacheTag = getCacheTagFromParams(hub, tags, searchRadius);
  const pageParam =
    (typeof pg === "number" && pg) ||
    (typeof pg === "string" && pg && pg !== "index")
      ? Number(pg)
      : 0;
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity_foobar_by_rating/query`;
  console.log(">>>>", pg, pageParam, cacheTag);
  const results = await fetch(url, {
    method: "POST",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
    cache: "force-cache",
    next: { tags: [cacheTag] },
    body: JSON.stringify({
      attributesToHighlight: [],
      hitsPerPage: hitsPerCategory,
      page: pageParam,
      aroundLatLng: latlng || "42.360484995562764, -71.05769136293631",
      aroundRadius: searchRadius ? 2000 * searchRadius : undefined, // searchRadius * 16.0934 * 1000, // 1km ~ .0.621371 mile
      // insideBoundingBox: bounds, // "42.353451,-71.077697,42.363994,-71.046782",
      tagFilters: !searchRadius ? [hub, ...tags] : [...tags],
    }),
  }).then((resp) => resp.json());

  const parentMap = results?.hits?.reduce((acc: any, hit: any) => {
    const parentId = getParentIdFromPath(hit.path);
    return { ...acc, [parentId]: true };
  }, {});

  const parentIds = Object.keys(parentMap);

  const profiles = await getProfilesFromIds(parentIds);
  // console.log("profiles", profiles);

  const profileMap = profiles?.reduce((acc, item) => {
    return {
      ...acc,
      [item.id]: item,
    };
  }, {});

  const data = {
    ...results,
    hits: results?.hits?.map((hit: any) => {
      const parentId = getParentIdFromPath(hit.path);
      const profile = profileMap[parentId];
      return {
        ...hit,
        parentId,
        parent: {
          id: parentId,
          name: profile?.name,
          parentPhotoUrl: profile?.pic,
          latlng: profile?._geoloc,
          _geoloc: profile?._geoloc,
        },
      };
    }),
  };

  return !asArray ? data : [data];
}

export async function searchLocations(
  query: string,
  hitsPerCategory: number = 10
): Promise<any> {
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity_name_only/query`;
  const results = await fetch(url, {
    method: "POST",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
    body: JSON.stringify({
      attributesToHighlight: [],
      hitsPerPage: hitsPerCategory,
      // insideBoundingBox: bounds, // "42.353451,-71.077697,42.363994,-71.046782",
      tagFilters: [
        ["place"],
        // ["city"],
        // ["coffee", "steak", "burger", "pastries", "wings"],
      ],
      query,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data?.hits
        .reverse()
        .map(
          ({
            name,
            objectID: id,
            _tags,
          }: {
            name: string;
            objectID: string;
          }) => ({
            name,
            id,
            isCity: _tags?.includes("city"),
          })
        );
    });

  return results;
}
