import Image from "next/image";

export default function LogoSwatch({ name, photoUrl }: any) {
  return (
    <div className=" font-semibold text-base flex items-center gap-3">
      {photoUrl && (
        <Image
          className="w-8 h-8 rounded-md bg-white border"
          alt={name}
          src={photoUrl}
          width="240"
          height="240"
        />
      )}
      {name}
    </div>
  );
}
