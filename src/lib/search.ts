export async function fetchSearchResults(
  q: string
): Promise<Array<{ name: string; id: string }>> {
  if (!q) {
    return [];
  }
  const url = `https://1P2U1C41BE-dsn.algolia.net/1/indexes/wa_entity?query=${q}&attributesToRetrieve=name&typoTolerance=false`;

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
