"use client";

import { createAreaOfExcellence } from "@/lib/firebase";
import { AreaOfExcellence } from "./AreaOfExcellence";
import { saveImageToLocal } from "./actions";

export default function MyImage({
  id,
  profileId,
  name,
  imageId,
  tags,
  location,
}: any) {
  const url = `https://places.googleapis.com/v1/${name}/media?key=AIzaSyB5vkllZzrzoS4TgKD-wOw5XC6m4gGW3xw&max_width_px=400`;

  const handleSubmit = async (formData: any) => {
    console.log("submitting");
    const updatedImageName = await saveImageToLocal(url, imageId);
    console.log(updatedImageName, formData);
    const isSuccess = await createAreaOfExcellence(
      profileId,
      id,
      {
        photoUrl: updatedImageName
          ? "/" + updatedImageName?.split("/")?.[1]?.replace("public", "/")
          : "",
        rating: formData.rating || 1,
      },
      formData.tags || []
    );
    console.log(
      "isSuccess",
      isSuccess,
      profileId,
      imageId,
      {},
      formData.tags || []
    );
  };

  return (
    <div className="relative">
      <img
        /// onClick={() => }
        className="w-full h-64 object-cover hover:cursor-pointer border-spacing-4 opacity-80 hover:opacity-100 duration-500"
        src={url}
      />
      <div className="py-4 flex justify-end">
        <AreaOfExcellence
          onSubmit={handleSubmit}
          photoUrl={imageId}
          tags={tags}
          location={location}
        />
      </div>
    </div>
  );
}
