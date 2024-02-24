import TabNav from "@/components/TabNav";
import { getHubTags } from "@/lib/tags";
import { PropsWithChildren, ReactNode } from "react";

export default function Layout({
  children,
  params,
}: PropsWithChildren<{ params: any }>) {
  const { hub, primaryTag, tags } = getHubTags(params.tags);
  console.log("layout.tsx", hub, primaryTag, JSON.stringify(params));
  return (
    <>
      <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4  lg:px-8 py-16 ">
        <div className="w-full flex items-center justify-between pb-16">
          <div className="flex items-center gap-4">
            <TabNav activeTabId={primaryTag} hub={hub} profile={undefined} />
          </div>
          <div className="flex items-center gap-4">
            {/* {primaryTag && (primaryTag as string) !== "profile" && (
              <TagFilter
                initialActiveTags={
                  initialActiveTags?.length ? initialActiveTags : tags
                }
                filterOptions={filterOptions}
                filterId={filterId}
                // onFilterChange={(tags: string[]) => console.log(tags)}
                // options={tagOptions}
                hub={hub}
                primaryTag={primaryTag}
                // tags={tags}
                title={`filter ${getPlural(primaryTag)}`}
              />
            )} */}
          </div>
        </div>
        {children}
      </main>
    </>
  );
}
