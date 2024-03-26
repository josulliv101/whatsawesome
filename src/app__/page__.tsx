import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetchEntities } from "@/lib/firebase";
import Image from "next/image";

export default async function Home() {
  const data = await fetchEntities();

  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-8 py-24">
      <PageHeading
        heading="Discover what&#39;s awesome about people."
        subhead="Inclusion in the what&#39;s awesome catalog is by invitation only. Everyone can vote on what&#39;s awesome."
      />
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
        <p className="text-sm text-muted-foreground">
          Your personal playlists. Updated daily.
        </p>
      </div>
      <div className="relative w-full">
        <ScrollArea>
          <div className="flex space-x-4 mt-8 p-4 border border-gray-200">
            {data.map((profile: any) => (
              <ProfileCard
                key={profile.name}
                width={220}
                height={220}
                aspectRatio="square"
                className="w-[220px] max-w-[220px]"
                profile={profile}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </main>
  );
}
