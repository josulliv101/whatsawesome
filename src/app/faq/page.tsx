import PageHeading from "@/components/PageHeading";
import { Button } from "@/components/ui/button";

export default async function FAQ({ params }: { params: {} }) {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto flex-col items-start justify-start px-4 py-6 lg:px-8 lg:py-12">
      <PageHeading heading="FAQ" subhead="..." />
      <ul>
        <li>What is the purpose of the site?</li>
        <li>Why is the logo a mushroom?</li>
        <li>Why is inclusion of a profile invitation only?</li>
        <li>
          Why are there people who have done non-awesome things included in the
          whats awesome catalog?
        </li>
        <li>How can I add a profile to the catalog?</li>
        <li>What does the awesome rating mean?</li>
        <li>What is the difference between a "hub" and a "profile"?</li>
      </ul>
    </main>
  );
}
