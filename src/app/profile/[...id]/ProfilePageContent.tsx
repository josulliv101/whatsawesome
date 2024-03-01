import Image from "next/image";
import { BarChart2Icon, Globe, StarIcon } from "lucide-react";
import {
  addReasonToProfile,
  fetchProfile,
  fetchUserRatingsForProfile,
} from "@/lib/firebase";
import { cn, roundToDecimal, roundToInteger } from "@/lib/utils";
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
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { AnalyticsContextProvider } from "@/components/useAnalytics";
import { AnalyticsButton } from "./AnalyticsButton";
import { AddReason } from "./AddReason";
import { revalidatePath } from "next/cache";
import { ReasonVisibility } from "./ReasonVisibility";
import ReasonTagsFilter from "./ReasonTagsFilter";

export default async function ProfilePageContent({
  className = "",
  params: { id: idProp, ...rest },
}: {
  className?: string;
  params: { id: string };
}) {
  const id = Array.isArray(idProp) && idProp.length ? idProp[0] : idProp;
  const user = await getCurrentUser();
  const p = await fetchProfile(id);
  const userProfileRatings = user?.uid
    ? await fetchUserRatingsForProfile(id, user?.uid)
    : null;
  console.log("profile p", p);
  console.log("userProfileRatings", userProfileRatings);
  const {
    description,
    name,
    pic,
    oinks,
    tags,
    reasons,
    reasonsUser,
    rating = 75,
    isHub,
  } = p;
  const primaryTag = "person";

  const cookieStore = cookies();
  const filterCookie = cookieStore.get(`filter-${primaryTag}`);
  console.log("filterCookie", id, primaryTag, filterCookie?.value);

  const tagsToUse = filterCookie?.value ? filterCookie?.value.split(",") : tags;

  const imgPosition = tags.includes("person") ? "object-top" : "object-center";
  const initialActiveTags = filterCookie?.value?.split(",");

  async function handleSubmitReason(data: any) {
    "use server";
    console.log("handleSubmitReason", data.reason, id, user?.uid);
    user?.uid && (await addReasonToProfile(id, user?.uid, data.reason));
    revalidatePath(`/profile/${id}`);
  }

  const allReasonTags = reasons.reduce((acc: string[], reason) => {
    if (reason.tags) {
      return acc.concat(reason.tags);
    }
    return acc;
  }, []);

  const uniqueReasonTags = [...new Set(allReasonTags)].sort();

  return (
    <AnalyticsContextProvider>
      <main
        className={cn(
          "relative flex min-h-screen max-w-7xl mx-auto mt-0 flex-col items-start justify-start px-4 py-6 lg:px-8 lg:py-12",
          className
        )}
      >
        {/* <div className="hidden lg:block absolute z-0 bg-blue-50 h-[300px] w-[200%] top-0 left-[-400px]"></div> */}
        <ProfileEditButton className="absolute top-0 right-8" />
        <div className="relative md:max-h-[200px] flex flex-col md:flex-row items-start gap-8 mb-6 animate-vflip__">
          <div className="relative w-full md:w-auto md:flex-initial bg-gray-400">
            <Image
              priority
              src={pic}
              alt={name}
              width={220}
              height={220}
              className={cn(
                " shadow-md grayscale__ hover:grayscale-0__ w-full h-full min-w-full md:h-[220px] md:w-[200px] md:min-w-[220px] opacity-80 rounded-sm md:max-h-[220px] overflow-hidden object-cover transition-all scale-100 duration-300 hover:scale-105  " +
                  imgPosition
              )}
            />
          </div>
          <PageHeading
            className="pl-8"
            heading={
              <div className="flex flex-col items-start gap-4 pt-8 mb-2">
                <Heading className="mb-2">{name}</Heading>
                <span className="hidden text-2xl ml-2 mt-[-6px]">/</span>
                <div className="flex_ hidden items-flex text-muted-foreground opacity-100 px-0 py-1 rounded-md min-w-max relative top-[-3px]  flex_ items-center flex-nowrap text-nowrap whitespace-nowrap text-md gap-3">
                  <div className="flex gap-1">
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={36}
                      height={36}
                    />
                    <Image
                      alt="vote"
                      src={config.logoPath}
                      width={36}
                      height={36}
                    />
                  </div>
                  {/* <div className="absolute top-[3px] left-[10px] border-none bg-transparent ">
                    <StarIcon className="scale-120 h-3 w-3  fill-white stroke-white stroke-2" />
                  </div>
                  <div className="opacity-100 absolute top-[2px] left-[11px] border-none bg-transparent ">
                    <StarIcon className="h-3 w-3  fill-yellow-300 stroke-2" />
                  </div> */}{" "}
                  <span className="px-2.5 ml-2 bg-gray-200/60 rounded-sm py-1">
                    overall excellence 2.4
                  </span>
                  <span className="text-inherit"></span>
                </div>
              </div>
            }
            subhead={description}
          >
            <div className="flex_ gap-2 mt-6 hidden">
              {tags
                .sort()
                .filter((tag) => !tagDefinitions.all.children.includes(tag))
                .map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="px-4 py-1 text-md border-muted-foreground/3 text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </PageHeading>
          {/* <Button variant={"secondary"} className="absolute -bottom-6 right-0">
            Follow
          </Button> */}
        </div>
        {/* <Separator className="mt-8" /> */}
        <div className="flex justify-start items-center mt-12 mb-0  w-full">
          <h4 className="rounded-sm text-xl bg-muted px-8 py-4 font-normal text-muted-foreground mb-0 w-full flex items-center justify-between">
            <strong className="font-semibold">
              What contributes to {name}&#39;s excellence?
            </strong>
            <div className="flex items-center gap-4">
              {!user && (
                <span className="text-lg">
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="text-lg px-0 text-muted-foreground underline"
                    asChild
                  >
                    <Link href="/login">Login</Link>
                  </Button>{" "}
                  to give your input below.
                </span>
              )}
              {user && <span className="text-lg">Give your input below.</span>}
              <Separator
                orientation="vertical"
                className="bg-gray-300 h-6 ml-3"
              />
              <AnalyticsButton />
            </div>
          </h4>
        </div>
        <ReasonTagsFilter tags={uniqueReasonTags} />
        <div className="w-full grid grid-cols-[1fr] items-start gap-8 space-y-0">
          {reasons.map((reason, i) => (
            <>
              {/* {i === 5 && (
                <div className="bg-muted text-muted-foreground p-4 flex items-center justify-between">
                  Boston Burger Round-up{" "}
                  <Button variant={"secondary"}>View Now</Button>
                </div>
              )} */}
              <ReasonVisibility tags={reason.tags || []}>
                <Reason
                  id={reason.id}
                  key={reason.id || reason.reason}
                  description={reason.reason}
                  name={name}
                  rating={reason.rating}
                  photoUrl={reason.photoUrl}
                  profileId={id}
                  userRating={
                    reason.id ? userProfileRatings?.[reason.id] : undefined
                  }
                  ratings={reason.ratings}
                  tags={reason.tags || []}
                />
              </ReasonVisibility>
            </>
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
        <div className="flex justify-start items-center mt-12 mb-0  w-full">
          <h4 className="relative rounded-sm text-xl bg-muted px-8 py-4 font-normal text-muted-foreground mb-4 w-full flex items-center justify-between">
            <strong className="font-semibold">
              User Submissions
              <Badge
                className="hidden rounded-sm right-4 top-[-12px] absolute"
                variant={"default"}
              >
                user submissions
              </Badge>
            </strong>
          </h4>
        </div>
        <div className="w-full grid grid-cols-[1fr] items-start gap-4 space-y-0">
          {reasonsUser.map((reason, i) => (
            <>
              <Reason
                id={reason.id}
                key={reason.id || reason.reason}
                description={reason.reason}
                name={name}
                rating={reason.rating}
                photoUrl={reason.photoUrl}
                profileId={id}
                userRating={
                  reason.id ? userProfileRatings?.[reason.id] : undefined
                }
                ratings={reason.ratings}
                userId={reason.userId}
                tags={[]}
              />
            </>
          ))}
        </div>
        {user?.uid && (
          <AddReason
            name={name}
            profileId={id}
            userId={user?.uid}
            onSubmit={handleSubmitReason}
          />
        )}
      </main>
    </AnalyticsContextProvider>
  );
}
