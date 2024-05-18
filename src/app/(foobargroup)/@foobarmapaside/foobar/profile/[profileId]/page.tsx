// import PageFromExplore from "@/app/(foobargroup)/@foobarsidebar/foobar/explore/[hub]/[pt]/[t3]/[distance]/[pg]/page";

import { fetchProfile } from "@/lib/firebase";
import { getHubTagsFromTags } from "@/lib/tags";
import Image from "next/image";

// export default PageFromExplore;

export default async function Page({ params: { profileId } }: any) {
  const profile = await fetchProfile(profileId, false);
  const hub = getHubTagsFromTags(profile?.tags);
  return (
    <>
      <aside className="w-[28vw] min-w-[320px] flex flex-col items-center justify-between p-8 bg-gray-200 border-r border-gray-300">
        <Image
          alt={profile?.name}
          src={profile?.pic}
          width="240"
          height="240"
          className=""
        />
      </aside>
    </>
  );
}
