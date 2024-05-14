import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black text-white h-[800px]">
      <footer className="border-t flex justify-center p-6">
        © 2024 Blue Mushroom /{" "}
        <Link href={`/foobar/boston`}>Discover excellence</Link>.
      </footer>
    </div>
  );
}
