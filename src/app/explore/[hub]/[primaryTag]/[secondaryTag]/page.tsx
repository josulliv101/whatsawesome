export default function Page({
  params: { hub, primaryTag, secondaryTag },
}: {
  params: { hub: string; primaryTag: string; secondaryTag: string };
}) {
  return (
    <div className="grid md:grid-cols-12 gap-12">
      <aside className="col-span-4 bg-muted px-4 py-3">side</aside>
      <main className="col-span-8 px-4 py-3 h-[calc(100dvh_-_73px_-_73px)]">
        page {hub} {primaryTag} {secondaryTag}
      </main>
    </div>
  );
}
