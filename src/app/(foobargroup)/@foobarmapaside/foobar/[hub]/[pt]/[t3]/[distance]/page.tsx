import { Button } from "@/components/ui/button";
import { fetchProfile } from "@/lib/firebase";
import Link from "next/link";

export default async function Page({ params: { hub } }: any) {
  const hubProfile = await fetchProfile(hub);

  return (
    <aside className="w-[28vw] flex flex-col items-center justify-between p-8 relative bg-gray-200 border-r border-gray-300">
      <p>
        <span className="font-semibold">Blue Mushroom</span> — the leading
        platform for discovering excellence in the world around you.
      </p>
      {hubProfile.name && (
        <Button size="lg" className="text-2xl px-4 py-10 w-full" asChild>
          <Link href={`/foobar/${hub}`}>{hubProfile.name}</Link>
        </Button>
      )}
    </aside>
  );
}
