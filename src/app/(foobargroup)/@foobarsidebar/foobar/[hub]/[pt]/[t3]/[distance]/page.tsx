import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({ params: { hub, pt, t3 } }: any) {
  return (
    <>
      <nav className="my-8 px-8 grid grid-cols-4 md:flex items-center gap-2">
        {[0, 1, 4, 8, 12, 20, 40].map((d) => (
          <Button key={d} className="col-span-1" variant={"outline"} asChild>
            <Link href={`/foobar/${hub}/${pt}/${t3}/${d}`}>{d}</Link>
          </Button>
        ))}
      </nav>
    </>
  );
}
