import Image from "next/image";
import { fetchProfile } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function ProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { description, name, pic, oinks } = await fetchProfile(id);
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-center justify-start px-4 py-6 lg:px-8 lg:py-12">
      <div className="flex items-start gap-8 border bg-white max-w-4xl w-full rounded-tr-md rounded-br-md">
        <Image
          priority
          src={pic}
          alt={name}
          width={300}
          height={300}
          className={cn(
            "h-auto w-auto opacity-80 rounded-tl-md rounded-bl-md max-h-[300px] overflow-hidden object-cover transition-all scale-100 duration-300 hover:scale-105 aspect-square"
          )}
        />
        <div className="relative py-8 space-y-2 pr-6">
          <div className="flex flex-col justify-between items-start h-full">
            <div className="flex items-center text-2xl gap-4">
              <span className="font-semibold">{name}</span>
            </div>
            <div className="text-muted-foreground">{description}</div>
          </div>
          <span className="flex items-center text-lg gap-2">
            /
            <img src="/cute-mushroom.png" width={22} height={22} /> {oinks}%
            awesome
          </span>
          <Button
            size="sm"
            variant={"secondary"}
            className="absolute top-0 right-4"
          >
            Follow
          </Button>
        </div>
      </div>
    </main>
  );
}
