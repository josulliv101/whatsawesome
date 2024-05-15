import Image from "next/image";

const thumbnailSize = 140;

export default function MapExcellence({ photoUrl, title, excellence }: any) {
  return (
    <>
      {" "}
      {photoUrl && (
        <Image
          className={`w-[140px] h-[140px] object-cover`}
          src={photoUrl}
          width={thumbnailSize}
          height={thumbnailSize}
          alt={title}
        />
      )}
      <div>
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <p>{excellence}</p>
      </div>
    </>
  );
}
