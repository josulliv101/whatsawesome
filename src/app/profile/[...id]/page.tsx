import Image from "next/image";
import { Globe } from "lucide-react";
import { fetchProfile } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tagDefinitions } from "@/lib/tags";
import Rating from "@/components/Rating";
import { Reason } from "@/components/Reason";
import HubLink from "@/components/HubLink";
import { Suspense } from "react";

import { cookies } from "next/headers";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import PageHeading from "@/components/PageHeading";
import { config } from "@/lib/config";

export default async function ProfilePage({
  params: { id, ...rest },
}: {
  params: { id: string };
}) {
  const { description, name, pic, oinks, tags, reasons, isHub } =
    await fetchProfile(id);
  const primaryTag = "person";

  const cookieStore = cookies();
  const filterCookie = cookieStore.get(`filter-${primaryTag}`);
  console.log("filterCookie", id, primaryTag, filterCookie?.value);

  const tagsToUse = filterCookie?.value ? filterCookie?.value.split(",") : tags;

  const rating = oinks - 40;
  const imgPosition = tags.includes("person") ? "object-top" : "object-center";
  const initialActiveTags = filterCookie?.value?.split(",");
  return (
    <>
      <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4 py-6 lg:px-8 lg:py-12">
        <PageHeading className="mt-8" heading={name} subhead={description} />
        <div className="mt-10 relative max-w-7xl mx-auto flex flex-col sm:flex-row items-start gap-8 border bg-white w-full rounded-tr-md rounded-br-md">
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

            {isHub && (
              <Badge className="bg-black absolute top-2 right-4">
                <HubLink
                  hub={id}
                  className="flex items-center -m-1.5 px-1.5 py-2 gap-3"
                >
                  <span className="font-semibold flex items-center gap-2 ">
                    <Globe className="h-3.5 w-3.5 text-white" />
                    {id?.replace(/[-]/g, " ")}
                  </span>
                </HubLink>
              </Badge>
            )}
          </div>
          <div className="opacity-100 px-2 py-1 rounded-md min-w-max static sm:absolute bottom-3 right-4 bg-white flex items-center flex-nowrap text-nowrap whitespace-nowrap text-md gap-2">
            <Image alt="vote" src={config.logoPath} width={22} height={22} />{" "}
            {oinks - 32}% awesome
          </div>
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
        {/* {isHub && (
          <Suspense fallback={<LoadingSkeleton />}>
            <div className="w-full flex items-center justify-between pb-12">
              <TabNav activeTabId={primaryTag} hub={id} />
              <TagFilter
                initialActiveTags={
                  initialActiveTags?.length ? initialActiveTags : tags
                }
                // onFilterChange={(tags: string[]) => console.log(tags)}
                // options={tagOptions}
                hub={id}
                primaryTag={primaryTag}
                // tags={tags}
              />
            </div>
            <PageHeading
              heading={`Discover what's awesome about ${tagDefinitions[primaryTag].plural}.`}
              subhead="Inclusion in the what&#39;s awesome catalog is by invitation only. Everyone can vote on what&#39;s awesome."
            />
            <Profiles hub={id} primaryTag={primaryTag} tagsToUse={tagsToUse} />
          </Suspense>
        )} */}
      </main>
    </>
  );
}
