import { PropsWithChildren } from "react";
import ProfilesByCategory from "./ProfilesByCategory";
import ExcellenceItems from "@/app/@sidebar/explore/[hub]/ExcellenceItems";
import SponsorRack from "@/components/SponsorRack";

export function generateStaticParams() {
  return [];
}

export default function Page({
  params: { hub },
  searchParams: { pt, st, t3 },
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  return (
    <>
      {hub && !pt && !st && !t3 && (
        <>
          <ProfilesByCategory hub={hub} pt={pt} st={st} t3={t3} />

          <div className="pt-14 pb-6 px-8">
            <SponsorRack hub={hub} />
          </div>
        </>
      )}
      {hub && pt && <ExcellenceItems hub={hub} pt={pt} st={st} t3={t3} />}
    </>
  );
}
