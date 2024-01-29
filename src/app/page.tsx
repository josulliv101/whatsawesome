import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h2 className="flex___ items-center text-xl lg:text-4xl font-semibold tracking-tight mb-1">
          Discover what&#39;s awesome about people.
        </h2>
        <p className="text-md lg:text-lg text-muted-foreground mb-12">
          Inclusion in the what&#39;s awesome catalog is by invitation only.
          Everyone can vote on what&#39;s awesome.
        </p>
      </div>
    </main>
  );
}
