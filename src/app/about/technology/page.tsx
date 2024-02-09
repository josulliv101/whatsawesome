import PageHeading from "@/components/PageHeading";
import { Button } from "@/components/ui/button";

export default async function Technology({ params }: { params: {} }) {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4 py-6 lg:px-8 lg:py-12">
      <PageHeading heading="Technology" subhead="..." />
    </main>
  );
}
