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
import PageHeading, { Heading } from "@/components/PageHeading";
import { config } from "@/lib/config";
import { ProfileEditButton } from "./ProfileEditButton";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePageContent({
  className = "",
  params: { id: idProp, ...rest },
}: {
  className?: string;
  params: { id: string };
}) {
  const id = Array.isArray(idProp) && idProp.length ? idProp[0] : idProp;
  const {
    description,
    name,
    pic,
    oinks,
    tags,
    reasons,
    rating = 75,
    isHub,
  } = await fetchProfile(id);
  const primaryTag = "person";

  const cookieStore = cookies();
  const filterCookie = cookieStore.get(`filter-${primaryTag}`);
  console.log("filterCookie", id, primaryTag, filterCookie?.value);

  const tagsToUse = filterCookie?.value ? filterCookie?.value.split(",") : tags;

  const imgPosition = tags.includes("person") ? "object-top" : "object-center";
  const initialActiveTags = filterCookie?.value?.split(",");
  return (
    <>
      <main
        className={cn(
          "relative flex min-h-screen max-w-7xl mx-auto mt-8 flex-col items-start justify-start px-4 py-6 lg:px-8 lg:py-12",
          className
        )}
      >
        <ProfileEditButton className="absolute top-0 right-8" />
        <div className="flex items-start gap-8 mb-6">
          <div className="relative w-full sm:w-auto sm:flex-initial">
            <Image
              priority
              src={pic}
              alt={name}
              width={168}
              height={168}
              className={cn(
                "w-full h-auto min-w-full sm:h-[168px] sm:w-[168px] sm:min-w-[168px] opacity-80 rounded-md max-h-[168px] overflow-hidden object-cover transition-all scale-100 duration-300 hover:scale-105 aspect-square " +
                  imgPosition
              )}
            />
          </div>
          <PageHeading
            className=""
            heading={
              <div className="flex items-center gap-4">
                <Heading>{name}</Heading>
                <span className="text-2xl ml-2 mt-[-6px]">/</span>
                <div className="opacity-100 px-2 py-1 rounded-md min-w-max relative top-[-3px] bg-white dark:bg-black flex items-center flex-nowrap text-nowrap whitespace-nowrap text-md gap-3">
                  <Image
                    alt="vote"
                    src={config.logoPath}
                    width={24}
                    height={24}
                  />{" "}
                  {rating}% awesome
                </div>
              </div>
            }
            subhead={description}
          >
            <div className="flex gap-2 mt-6">
              {tags
                .sort()
                .filter((tag) => !tagDefinitions.all.children.includes(tag))
                .map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-4 py-1 text-md"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </PageHeading>
        </div>
        <Separator />
        <div className="flex justify-start items-center mt-8 mb-8  w-full">
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