import Image from "next/image";
import {
  BadgeCheckIcon,
  BanIcon,
  BarChart2Icon,
  Globe,
  HeartIcon,
  StarIcon,
} from "lucide-react";
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

// import { cookies } from "next/headers";
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
import Legend from "@/components/Legend";
import SponsorRack from "@/components/SponsorRack";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { PresetSelector } from "@/app/(group)/@sidebar/explore/[hub]/PresetSelector";

export default async function ProfilePageContent({
  className = "",
  isEmbed = false,
  params: { id: idProp, ...rest },
}: {
  className?: string;
  isEmbed?: boolean;
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
    _tags,
    tags = _tags,
    reasons,
    reasonsUser,
    rating = 75,
    isHub,
    primaryColor = "#f1f5f9",
    isSponsor,
  } = p;
  const primaryTag = "person";

  // const cookieStore = cookies();
  // const filterCookie = cookieStore.get(`filter-${primaryTag}`);
  // console.log("filterCookie", id, primaryTag, filterCookie?.value);

  // const tagsToUse = filterCookie?.value ? filterCookie?.value.split(",") : tags;

  const imgPosition = tags?.includes("person") ? "object-top" : "object-center";
  // const initialActiveTags = filterCookie?.value?.split(",");

  const allReasonTags = reasons.reduce((acc: string[], reason) => {
    if (reason.tags) {
      return acc.concat(reason.tags);
    }
    return acc;
  }, []);

  const uniqueReasonTags = [...new Set(allReasonTags)]
    .sort()
    .filter((tag: string) => tagDefinitions[tag]?.level === 3);

  return (
    <AnalyticsContextProvider>
      <main
        className={cn(
          "relative flex py-6 min-h-screen max-w-7xl mx-auto mt-0 flex-col items-start justify-start ",
          `${isEmbed ? "px-0 lg:px-0" : "px-4  lg:px-8"} lg:py-12`,
          className
        )}
      >
        {/* <div className="hidden lg:block absolute z-0 bg-blue-50 h-[300px] w-[200%] top-0 left-[-400px]"></div> */}
        <ProfileEditButton className="absolute top-0 right-8" />
        {isSponsor && (
          <div className="absolute top-8 right-12 flex items-center gap-2">
            Sponsor <BadgeCheckIcon className="h-6 w-6 text-blue-500" />
          </div>
        )}
        {!isEmbed && (
          <div className="relative md:max-h-[200px] flex md:flex-row items-center gap-8 mb-6 animate-vflip__">
            <div className="relative w-full md:w-auto md:flex-initial flex bg-gray-400">
              <Image
                priority
                src={pic || config.logoPath}
                alt={name}
                width={220}
                height={220}
                className={cn(
                  `shadow-md grayscale__ hover:grayscale-0__ w-full h-full min-w-full md:h-[220px] md:w-[200px] md:min-w-[220px]  rounded-md md:max-h-[220px] overflow-hidden object-cover transition-all scale-100 duration-300 hover:scale-105`,
                  imgPosition,
                  // "border-8 border-blue-500 block",
                  pic ? "opacity-80" : "p-12 grayscale opacity-40"
                )}
              />
            </div>
            <PageHeading
              className="pl-8 mb-0"
              heading={
                <div className="flex flex-col items-start justify-end gap-4 pt-8 mb-2">
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
              subhead={description || "description"}
            >
              <div className="absolute top-0 right-0">
                {/* <Button variant={"outline"} className="flex gap-2">
                <Image
                  alt="vote"
                  src={config.logoPath}
                  width={18}
                  height={18}
                />
                4 backers
                 
              </Button> */}
              </div>
              {/* <div className="flex_ gap-2 mt-6 hidden">
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
            </div> */}
            </PageHeading>
            {/* <Button variant={"secondary"} className="absolute -bottom-6 right-0">
            Follow
          </Button> */}
          </div>
        )}
        {/* <Separator className="mt-8" /> */}

        <div className="flex justify-start items-center mb-4 w-full">
          <h4 className="relative rounded-sm text-xl bg-muted px-4 pt-2 mt-4 pb-2 font-normal text-muted-foreground mb-0 w-full flex items-center justify-between">
            <BadgeCheckIcon className="h-6 w-6 mr-2 text-blue-500 opacity-80" />
            <strong className="font-[500] text-balance_ flex-1 block whitespace-nowrap">
              Areas of Excellence
            </strong>
            <ReasonTagsFilter tags={uniqueReasonTags} />
            <div className="flex_ items-center gap-4 shrink-0 hidden">
              {!user && (
                <span className="text-sm font-medium">
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="text-sm px-0 text-muted-foreground border-dotted"
                    asChild
                  >
                    <Link href="/login">Login</Link>
                  </Button>{" "}
                  to give your input below.
                </span>
              )}
              {user && (
                <span className="text-sm font-medium">
                  Give your input below.
                </span>
              )}
              {/* <Separator
                orientation="vertical"
                className="bg-gray-300 h-6 ml-3"
              />
              <AnalyticsButton /> */}
            </div>
          </h4>
        </div>

        <div
          className="w-full grid grid-cols-[1fr] items-start gap-2  p-4 rounded-md"
          style={{ backgroundColor: "#f1f5f9" || primaryColor }}
        >
          <div className="flex items-center justify-between gap-2 pb-1 col-span-12">
            <p className="opacity-80 text-muted-foreground mt-4_ px-2 py-0 top-2_ relative">
              Vote below by leaving a
              <Image
                // id={marker.id}
                alt="vote"
                src={config.logoPath}
                width={15}
                height={15}
                className={`inline-flex ml-2 mr-1 grayscale opacity-80`}
              />{" "}
              on an area of excellence.
            </p>
            <div className="opacity-80 flex-1 w-full flex items-center justify-end">
              <PresetSelector />
              <Separator orientation="vertical" className="h-4 bg-gray-300" />
              <p className=" text-muted-foreground text-sm px-3">
                showing {reasons.length} of {reasons.length} items
              </p>
            </div>
          </div>
          <div className="col-span-12">
            {reasons.map((reason, i) => (
              <div key={i} className="mb-4 last:mb-0">
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
                    latlng={reason._geolat}
                    ratings={reason.ratings}
                    tags={reason._tags || []}
                    isForceRatingToShow
                    isEditable
                    showLinkToProfile={false}
                  />
                </ReasonVisibility>
              </div>
            ))}
          </div>
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
        <div className="mt-12 p-1 pt-10 bg-muted w-full rounded-md">
          <SponsorRack hub={id} />
        </div>
        <div className="flex_ hidden justify-start items-center mt-12 mb-0  w-full">
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
        <div className="w-full hidden _grid grid-cols-[1fr] items-start gap-0 space-y-0">
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
        {/* {user?.uid && (
          <AddReason
            name={name}
            profileId={id}
            userId={user?.uid}
            onSubmit={handleSubmitReason}
          />
        )} */}
      </main>
    </AnalyticsContextProvider>
  );
}
