export async function fetchSearchResults(
  q: string
): Promise<Array<{ name: string; id: string }>> {
  if (!q) {
    return [];
  }
  // const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity?query=${q}&aroundLatLng=40.71,-74.01&attributesToRetrieve=name,tags,description,pic&typoTolerance=false`;
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity?query=${q}&insideBoundingBox=42.37399367067511,-71.04776763916017,42.36234444516898,-71.06157684326172`;
  const results = await fetch(url, {
    method: "GET",
    headers: {
      "X-Algolia-API-Key": "58f01f11963d3161cd1c627f20380344",
      "X-Algolia-Application-Id": "1P2U1C41BE",
    },
  })
    .then((response) => response.json())
    .then((data) => {
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
