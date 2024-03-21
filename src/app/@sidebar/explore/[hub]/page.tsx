import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchClaimsForHub } from "@/lib/firebase";
import { getPrimaryTagsFromTags, tagDefinitions } from "@/lib/tags";
import Link from "next/link";

export default async function Page({
  params: { hub },
  searchParams: { pt, st },
}: {
  params: any;
  searchParams: any;
}) {
  const data = await fetchClaimsForHub(hub, [pt], [st]);
  const items = tagDefinitions[pt]?.tags || [];
  return (
    <>
      <SideNav items={items} hub={hub} pt={pt} />
      sidebar hub pt={pt} st={st}
      <Separator className="my-2" />
      {data.map((item, index) => {
        return (
          <div key={index} className="p-4">
            {item.parentId} | {getPrimaryTagsFromTags(item.tags)} |{" "}
            {item.reason} | {item.rating}
          </div>
        );
      })}
    </>
  );
}

function SideNav({
  hub,
  items,
  pt,
}: {
  hub: string;
  pt: string;

  items: Array<any>;
}) {
  return (
    <div className="flex gap-2 py-4 flex-wrap capitalize">
      <Button key={"all"} size="sm" asChild>
        <Link href={`/explore/${hub}?pt=${pt}`}>all</Link>
      </Button>
      {items.map((tag) => (
        <Button key={tag} size="sm" asChild>
          <Link href={`/explore/${hub}?pt=${pt}&st=${tag}`}>{tag}</Link>
        </Button>
      ))}
    </div>
  );
}
