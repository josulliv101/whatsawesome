import { Button } from "@/components/ui/button";
import { searchTopAoeByCategory } from "@/lib/search";
import Link from "next/link";

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
  const topProfiles = await searchTopAoeByCategory(hub, [[t3, pt]]);
  const { hits } = topProfiles?.[0];
  return (
    <>
      <nav className="flex items-center gap-2">
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
