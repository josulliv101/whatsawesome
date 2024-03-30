import ProfilePageContent from "@/app__/profile/[...id]/ProfilePageContent";

export default function page({ params }: { params: any }) {
  return <ProfilePageContent params={params} />;
}
