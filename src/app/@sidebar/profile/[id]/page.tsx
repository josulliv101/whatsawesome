import { fetchClaimsForHub, fetchProfile } from "@/lib/firebase";
import { getHubTagsFromTags, getPrimaryTagsFromTags } from "@/lib/tags";

export default async function Page({
  params: { id },
  searchParams: { st },
}: {
  params: any;
  searchParams: any;
}) {
  const profile = await fetchProfile(id);
  const primaryTags = getPrimaryTagsFromTags(profile.tags);
  const hubTags = getHubTagsFromTags(profile.tags);
  const hub = hubTags?.[0];
  const pt = primaryTags?.[0];
  const data = await fetchClaimsForHub(hub, [pt]);
  return (
    <>
      and sidebar profile {profile.name}
      {data.map((item, index) => {
        return (
          <div key={index} className="p-4">
            {item.parentId} | {getPrimaryTagsFromTags(item.tags)} |{" "}
            {item.reason} | {item.rating}
          </div>
        );
      })}
    </>
  );
}
