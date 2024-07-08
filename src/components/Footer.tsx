import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black text-white h-[800px]">
      <footer className="border-t flex justify-center p-6">
        20 mushrooms © 2024{" "}
        <Link href={`/foobar/explore/boston`}>
          Discover what&#39;s good in the world around you.
        </Link>
        .
      </footer>
    </div>
  );
}
