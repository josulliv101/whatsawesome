import { PropsWithChildren } from "react";
import ExcellenceItems from "./ExcellenceItems";
import ProfilesByCategory from "@/app/explore/[hub]/ProfilesByCategory";
import { Separator } from "@/components/ui/separator";

export default function Page({
  params: { hub },
  searchParams: { pt, st, t3 },
}: PropsWithChildren<{
  params: any;
  searchParams: any;
}>) {
  if (hub && pt) {
    return (
      <div className="mt-8">
        <ProfilesByCategory
          hub={hub}
          pt={pt}
          st={st}
          t3={t3}
          isStacked
          isShowAll={true}
        />
        <Separator className="my-8" />
        {<ProfilesByCategory hub={hub} st={st} t3={t3} isShowAll={false} />}
      </div>
    );
  }
  return <ExcellenceItems hub={hub} pt={pt} st={st} t3={t3} isStacked />;
}
