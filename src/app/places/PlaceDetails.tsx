"use client";

import { nanoid } from "nanoid";
import MyImage from "./Image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  confirmNewEntityData,
  createEntityFromPlace,
  saveImageToLocal,
  updatePic,
} from "./actions";
import { toast } from "sonner";
import { stringToId } from "./stringToId";
import { Slice } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

export default function PlaceDetails({ tags, ...props }: any) {
  // const { toast } = useToast();
  const entityId = stringToId(props.displayName?.text);
  const [id, setId] = useState(entityId);
  const json = {
    id,
    name: props.displayName?.text || "",
    description: "",
    pic: "",

    rating: 1,

    _tags: ["wip", ...tags],
    _geoloc: {
      lat: props.location?.latitude || 0,
      lng: props.location?.longitude || 0,
    },
  };
  return (
    <div className="mb-4 px-0">
      <h1 className="text-xl mb-4 flex items-center justify-between">
        <input
          className="bg-gray-200/50 px-3 py-2"
          value={id}
          onChange={(ev) => setId(ev.target.value)}
        />
        <Button
          onClick={async () => {
            const checkIfIdExists = await createEntityFromPlace({ id });
            console.log("f", checkIfIdExists);
            if (checkIfIdExists.success === false) {
              toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">
                    {checkIfIdExists.data?.message}
                  </code>
                </pre>
              );
            } else {
              toast(
                <div className="w-full">
                  <pre className="mt-2 mb-4 w-[540px]_ w-full rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(json, undefined, 2)}
                    </code>
                  </pre>
                  <div className="flex justify-end">
                    <Button onClick={() => confirmNewEntityData(json)}>
                      Confirm
                    </Button>
                  </div>
                </div>
              );
            }
          }}
        >
          Create
        </Button>
      </h1>
      <p>
        {props.id} / {props.name}
      </p>
      <p>{props.formattedAddress}</p>
      <p>{props.primaryType}</p>
      <p>{props.types?.join(", ")}</p>
      <p>stars: {props.rating}</p>
      <p>{props.websiteUri}</p>
      <p>{props.priceLevel}</p>
      <p>userRatingCount: {props.userRatingCount}</p>
      <p>{JSON.stringify(props.location)}</p>
      <div>
        <h4>Photos</h4>
        <div className="grid md:grid-cols-12 gap-4">
          {props?.photos?.map((photo: any, i: number) => {
            const photoId = photo.name.split("/").slice(-1);
            console.log("photo", photo);
            return (
              <div key={i} className="col-span-3">
                <MyImage
                  id={`${props.id}-${i}`}
                  name={photo.name}
                  imageId={`${entityId}-${props.id}-${i}`}
                  tags={tags}
                  location={json._geoloc}
                  profileId={entityId}
                  profileName={props.displayName?.text}
                />
                {photo.authorAttributions?.map((author: any) => {
                  const imgUri = `https:${author.photoUri?.replace("=s100-", "=s300-")}`;
                  return (
                    <Button
                      key={imgUri}
                      className="min-h-24 w-24"
                      onClick={async () => {
                        const updatedImageName = await saveImageToLocal(
                          imgUri,
                          `${id}-logo`
                        );
                        await updatePic(
                          id,
                          (updatedImageName as string).replace("public", "")
                        );
                        console.log("logo", id, updatedImageName);
                      }}
                    >
                      <img
                        key={author.photoUri}
                        src={imgUri}
                        width={100}
                        height={100}
                        referrerPolicy="no-referrer"
                      />
                    </Button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
