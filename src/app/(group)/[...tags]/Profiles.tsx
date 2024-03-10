import PageHeading from "@/components/PageHeading";
import ProfileCard from "@/components/ProfileCard";
import SponsorCard from "@/components/SponsorCard";
import TabNav from "@/components/TabNav";
import { TagFilter } from "@/components/TagFilter";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { config } from "@/lib/config";
import { fetchHubProfiles } from "@/lib/firebase";
import { Profile } from "@/lib/profile";
import { PrimaryTagType, tagDefinitions } from "@/lib/tags";
import { GlobeIcon } from "lucide-react";
import Link from "next/link";

import { Fragment } from "react";

export default async function Profiles({
  hub,
  tagsToUse,
  primaryTag,
}: {
  hub: string;
  tagsToUse: string[];
  primaryTag: PrimaryTagType;
}) {
  const fetchPromises =
    tagsToUse?.map(
      async (tag) => await fetchHubProfiles(hub, primaryTag, [tag])
    ) || [];

  const fetchPromises2 =
    tagDefinitions.person.children?.map(
      async (tag: string) => await fetchHubProfiles(hub, "person", [tag])
    ) || [];
  const fetchedProfileByTag = await Promise.all(fetchPromises);
  const fetchedProfileByTag2 = await Promise.all(fetchPromises2);

  const profilesByTag = fetchedProfileByTag.reduce((acc: any, item, i) => {
    if (i > -1 && i % 2 === 0) {
      return [...acc, item, fetchedProfileByTag2[i / 2]];
    }
    return [...acc, item];
  }, []);
  return (
    <main className="flex min-h-screen w-full max-w-full mx-auto flex-col items-start justify-start">
      {[...((profilesByTag as any) || {})]
        .filter((item) => !!item)
        .map(({ profiles, label }, tagIndex) => (
          <Fragment key={tagsToUse[tagIndex]}>
            <div className="mt-20 first:mt-8 space-y-1 w-full">
              <h2 className="w-full flex items-center justify-between text-2xl font-semibold tracking-tight">
                <div>
                  <span className="font-semibold inline-flex items-center gap-2 pr-2">
                    {" "}
                    {hub !== config.rootHub && (
                      <>
                        <GlobeIcon className="h-4 w-4" />{" "}
                        {hub.replace(/[-]/g, " ")}{" "}
                        <span className="pl-1">/</span>
                      </>
                    )}
                  </span>
                  {label}
                </div>
                <Button size="sm" variant={"secondary"} asChild>
                  <Link
                    href={`/view/${hub}/${primaryTag}/${tagsToUse[tagIndex]}`}
                  >
                    View All
                  </Link>
                </Button>
              </h2>
              <p className="hidden text-sm text-muted-foreground">
                Your personal playlists. Updated daily. /{" "}
                {tagsToUse.join(" / ")}
              </p>
            </div>
            <div className="relative w-full">
              <ScrollArea>
                <div className="flex space-x-4 mt-2 p-4 border shadow-md border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  {profiles.map((profile: any) => (
                    <ProfileCard
                      key={profile.name}
                      width={200}
                      height={200}
                      aspectRatio="square"
                      className="w-[200px] max-w-[200px]"
                      profile={profile}
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            {!!tagIndex && tagIndex === 2 && (
              <div className="bg-gray-200 w-full mt-20 opacity-100">
                <div className="relative w-full flex_ max-w-7xl mx-auto items-center justify-between px-2 py-2">
                  <div className="flex items-center justify-between gap-1">
                    {/* <TabNav profile={undefined} /> */}
                    <SponsorCard
                      name="Constant Contact, Inc"
                      pic="/constant-contact.png"
                    />
                    <SponsorCard
                      name="Boston Dynamics"
                      pic="/boston-dynamics.svg"
                    />
                    <SponsorCard name="Toast, Inc" pic="/toast.png" />
                    <SponsorCard name="Akamai Technologies" pic="/akamai.jpg" />
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    {/* <TabNav profile={undefined} /> */}
                    <SponsorCard name="Apple, Inc" pic="/apple.jpg" />
                    <SponsorCard name="Google, Inc" pic="/google.png" />
                    <SponsorCard name="Nvidia, Inc" pic="/nvidia.png" />
                    <SponsorCard
                      name="Boston Childrens Hospital"
                      pic="/boston-childrens.jpg"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    {/* <TabNav profile={undefined} /> */}
                    <SponsorCard name="HubSpot, Inc" pic="/hubspot.jpg" />
                    <SponsorCard
                      name="Greater Boston Foodbank"
                      pic="/greater-boston-foodbank.jpg"
                    />
                    <SponsorCard name="The Jimmy Fund" pic="/jimmy-fund.jpg" />
                    <SponsorCard
                      name="Tavern In The Square"
                      pic="/tavern-in-the-square.png"
                    />
                  </div>
                  <p className=" absolute -top-6 left-0 text-sm text-muted-foreground px-2 text-right">
                    Thank you to all the sponsors who make blue mushroom Boston
                    possible.
                  </p>
                </div>
              </div>
            )}
          </Fragment>
        ))}
    </main>
  );
}
