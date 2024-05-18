// import PageFromExplore from "@/app/(foobargroup)/@foobarsidebar/foobar/explore/[hub]/[pt]/[t3]/[distance]/[pg]/page";

import { fetchProfile } from "@/lib/firebase";
import Sidebar, {
  SearchPanel,
} from "../../explore/[hub]/[pt]/[t3]/[distance]/Sidebar";
import AoeByCategory from "../../explore/[hub]/[pt]/[t3]/[distance]/[pg]/AoeByCategory";
import { getHubTagsFromTags } from "@/lib/tags";

// export default PageFromExplore;

export default async function Page({ params: { profileId } }: any) {
  const profile = await fetchProfile(profileId, false);
  const hub = getHubTagsFromTags(profile?.tags);
  return (
    <Sidebar>
      <SearchPanel />{" "}
      <div className="px-8 pt-2 flex items-center justify-between w-full mb-0 font-semibold text-lg capitalize text-muted-foreground min-h-[48px]">
        Search by Category
      </div>
      <AoeByCategory
        hub={Array.isArray(hub) ? hub[0] : hub}
        t3={""}
        distance={0}
      />
    </Sidebar>
  );
}
