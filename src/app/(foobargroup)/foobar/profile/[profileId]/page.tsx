import { fetchProfile } from "@/lib/firebase";

export default async function Page({ params: { profileId } }: any) {
  const profile = await fetchProfile(profileId);
  return (
    <>
      <div className="sticky top-[64px] z-50 w-full flex items-center justify-between px-8 py-2 bg-gray-100 border-b border-r border-r-gray-200 border-b-gray-300 text-muted-foreground min-h-[54px]">
        <div className="absolute top-[0px] w-[4px] h-[1px] z-[99999] bg-red-500" />
        Profile / {profile?.name}
      </div>
      <div className="mx-8 my-8 h-full">
        <h2 className="mb-8 text-3xl font-semibold">{profile?.name}</h2>
        {profile?.description && (
          <p className="text-xl">{profile?.description}</p>
        )}
      </div>{" "}
    </>
  );
}
