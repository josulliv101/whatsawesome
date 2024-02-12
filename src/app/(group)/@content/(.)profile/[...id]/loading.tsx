import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen max-w-7xl w-full mx-auto flex-col items-start justify-start px-4  lg:px-8 py-16 ">
      <div className="space-y-2">
        <Skeleton className="h-6 w-[350px] bg-gray-200" />
        <Skeleton className="h-4 w-[250px] bg-gray-200" />
      </div>
      <div className="h-20" />
      <div className="w-full space-y-12">
        <Skeleton className="h-56 w-full bg-gray-200" />
        <Skeleton className="h-4 w-[250px] bg-gray-200" />
      </div>
    </main>
  );
}
