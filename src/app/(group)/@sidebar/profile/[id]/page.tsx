import { fetchClaimsForHub, fetchProfile } from "@/lib/firebase";
import {
  getHubTagsFromTags,
  getLevel3TagsFromTags,
  getPrimaryTagsFromTags,
} from "@/lib/tags";
import ExcellenceItems from "../../explore/[hub]/ExcellenceItems";

export default async function Page({ params: { id } }: { params: any }) {
  return null;
  const profile = await fetchProfile(id);
  const primaryTags = getPrimaryTagsFromTags(profile.tags);
  const hubTags = getHubTagsFromTags(profile.tags);
  const level3Tags = getLevel3TagsFromTags(profile.tags);
  const hub = hubTags?.[0];
  const pt = primaryTags?.[0];
  const st = primaryTags?.[1];
  const t3 = level3Tags?.[0];
  const data = await fetchClaimsForHub(hub, [pt]);
  return <ExcellenceItems hub={hub} pt={pt} st={st} t3={t3} isStacked />;
}
