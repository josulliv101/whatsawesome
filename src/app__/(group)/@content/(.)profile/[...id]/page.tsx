import ProfilePageContent from "@/app__/profile/[...id]/ProfilePageContent";

export function generateStaticParams() {
  return [];
}

export default async function page({ params }: { params: any }) {
  // await new Promise((r) => setTimeout(r, 2000));
  return <ProfilePageContent params={params} />;
}
