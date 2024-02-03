import Image from "next/image";
import { fetchProfile } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tagDefinitions } from "@/lib/tags";
import Rating from "@/components/Rating";
import { Reason } from "@/components/Reason";

export default async function ProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { description, name, pic, oinks, tags, reasons } =
    await fetchProfile(id);
  const rating = oinks - 40;
  const imgPosition = tags.includes("person") ? "object-top" : "object-center";
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-center justify-start px-4 py-6 lg:px-8 lg:py-12">
      <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-start gap-8 border bg-white w-full rounded-tr-md rounded-br-md">
        <div className="relative w-full sm:w-auto sm:flex-initial">
          <Image
            priority
            src={pic}
            alt={name}
            width={240}
            height={240}
            className={cn(
              "w-full h-auto min-w-full sm:h-[240px] sm:w-[240px] sm:min-w-[240px] opacity-80 rounded-tl-md rounded-bl-md max-h-[300px] overflow-hidden object-cover transition-all scale-100 duration-300 hover:scale-105 aspect-square " +
                imgPosition
            )}
          />
        </div>
        <div className="relative py-1 px-2 sm:px-0 sm:py-8 space-y-2 pr-6 flex-1">
          <div className="flex flex-col justify-between items-start h-full">
            <div className="flex items-center text-2xl gap-4">
              <span className="font-semibold">{name}</span>
            </div>
            <div className="flex gap-2 py-4">
              {tags
                .sort()
                .filter((tag) => !tagDefinitions.all.children.includes(tag))
                .map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
            </div>
            <div className="text-muted-foreground">{description}</div>
          </div>

          <Button
            size="sm"
            variant={"secondary"}
            className="hidden absolute top-0 right-4"
          >
            Follow
          </Button>
        </div>
        <div className="opacity-100 px-2 py-1 rounded-md min-w-max static sm:absolute bottom-3 right-4 bg-white flex items-center flex-nowrap text-nowrap whitespace-nowrap text-md gap-2">
          <Image alt="vote" src="/cute-mushroom.png" width={22} height={22} />{" "}
          {oinks - 32}% awesome
        </div>
        {/* <Badge
          variant="outline"
          className="rounded-sm absolute border-0 bottom-4 right-8 bg-white px-1 inline-flex items-center gap-3"
        >
          <img
            className="h-6 w-auto grayscale opacity-50"
            src="/cute-mushroom.png"
            alt="whatsawesome"
          />
          <img
            className="h-6 w-auto grayscale opacity-50"
            src="/cute-mushroom.png"
            alt="whatsawesome"
          />
          <img
            className="h-6 w-auto grayscale opacity-50"
            src="/cute-mushroom.png"
            alt="whatsawesome"
          />
          <img
            className="h-6 w-auto grayscale opacity-50"
            src="/cute-mushroom.png"
            alt="whatsawesome"
          />
          <img
            className="h-6 w-auto grayscale opacity-50"
            src="/cute-mushroom.png"
            alt="whatsawesome"
          />
        </Badge> */}
      </div>
      <div className="flex justify-start items-center mt-12 mb-4  w-full">
        <h1 className="text-2xl text-muted-foreground">
          Whats awesome about {name}?
        </h1>
      </div>
      <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] items-start gap-4 space-y-0">
        {reasons.map((reason) => (
          <Reason
            key={reason.id || reason.reason}
            description={reason.reason}
            name={name}
            rating={reason.rating}
          />
        ))}
      </div>
    </main>
  );
}
