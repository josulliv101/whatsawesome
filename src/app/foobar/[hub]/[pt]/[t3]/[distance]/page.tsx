import { searchTopAoeByCategory } from "@/lib/search";

export function generateStaticParams() {
  return [];
}

export default async function Page({ params: { hub, pt, t3, distance } }: any) {
  const topProfiles = await searchTopAoeByCategory(hub, [[t3, pt]]);

  return (
    <>
      <div className="p-12">
        foobar: {hub} / {pt} / {t3} / {distance}
      </div>
      <div>{JSON.stringify(topProfiles)}</div>
    </>
  );
}
