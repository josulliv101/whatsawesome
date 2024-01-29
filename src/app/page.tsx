import PageHeading from "@/components/PageHeading";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PageHeading
        heading="Discover what&#39;s awesome about people."
        subhead="Inclusion in the what&#39;s awesome catalog is by invitation only. Everyone can vote on what&#39;s awesome."
      />
    </main>
  );
}
