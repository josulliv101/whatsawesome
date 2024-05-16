import Image from "next/image";

const thumbnailSize = 140;

export default function MapExcellence({
  photoUrl,
  parentPhotoUrl,
  title,
  excellence,
}: any) {
  return (
    <>
      {" "}
      {photoUrl && (
        <Image
          className={`w-[140px] h-[140px] object-cover rounded-md`}
          src={photoUrl}
          width={thumbnailSize}
          height={thumbnailSize}
          alt={title}
        />
      )}
      <div>
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <p>{excellence}</p>
        {false && parentPhotoUrl && (
          <Image
            className="w-12 h-12 shadow-md border border-gray-300 absolute rounded-md -bottom-1 -right-1"
            alt={title}
            src={parentPhotoUrl}
            width="240"
            height="240"
          />
        )}
      </div>
    </>
  );
}
