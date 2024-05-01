import { Button } from "@/components/ui/button";
import { searchTopAoeByCategory, searchTopAoeByRadius } from "@/lib/search";
import Link from "next/link";
import FoobarMap from "./FoobarMap";
import { fetchProfile } from "@/lib/firebase";

export function generateStaticParams() {
  return [];
}

const navItems = [
  ["restaurant", "burger"],
  ["restaurant", "steak"],
  ["coffeehouse", "coffee"],
  ["coffeehouse", "pastries"],
];

export default async function Page({ params: { hub, pt, t3, distance } }: any) {
  const hubProfile = await fetchProfile(hub);
  const topProfiles =
    typeof distance !== "undefined" && Number(distance) !== 0
      ? await searchTopAoeByRadius(
          hub,
          Number(distance),
          [pt, t3],
          10,
          10,
          true,
          `${hubProfile._geoloc.lat}, ${hubProfile._geoloc.lng}`
        )
      : await searchTopAoeByCategory(hub, [[t3, pt]]);
  const { hits } = topProfiles?.[0];
  console.log("generateStaticParams()", { hub, pt, t3, distance });
  return (
    <>
      <nav className="my-8 px-8 flex items-center gap-2">
        {[0, 1, 4, 8, 12, 20, 40].map((distance) => (
          <Button key={distance} variant={"outline"} asChild>
            <Link href={`/foobar/${hub}/${pt}/${t3}/${distance}`}>
              {distance}
            </Link>
          </Button>
        ))}
      </nav>
      <nav className="flex items-center gap-2 px-8">
        {navItems.map(([pt, t3]) => {
          return (
            <Button key={`${pt}-${t3}`} asChild>
              <Link href={`/foobar/${hub}/${pt}/${t3}`}>
                {pt} / {t3}
              </Link>
            </Button>
          );
        })}
      </nav>
      <div className="p-12">
        foobar: {hub} / {pt} / {t3} / {distance}
      </div>
      <div className="p-12 flex flex-col gap-4">
        {hits.map(({ objectID, parent, reason }: any) => {
          return (
            <div key={objectID}>
              <h2>{parent.name}</h2>
              <p>{reason}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
