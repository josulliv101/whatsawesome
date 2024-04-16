import { Metadata } from "next";

import { Suspense, use } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PlaceDetails from "./PlaceDetails";
import { checkIfIdExists } from "@/lib/firebase";
import { stringToId } from "./stringToId";
import { Badge } from "@/components/ui/badge";

// import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Places",
  description: "Places tool",
};
// places that have good burgers near Burlington, MA
export default async function Page({ searchParams }: any) {
  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText?languageCode=en",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": "AIzaSyB5vkllZzrzoS4TgKD-wOw5XC6m4gGW3xw",
        "X-Goog-FieldMask":
          "places.id,places.name,places.displayName,places.formattedAddress,places.location,places.priceLevel,places.primaryType,places.types,places.websiteUri,places.priceLevel,places.rating,places.userRatingCount,places.photos",
      },
      body: JSON.stringify({
        textQuery: searchParams?.query,
      }),
    }
  );

  const data = await response.json();
  console.log("data..", data);
  const idCheckPromises = data?.places?.map((place: any) => {
    const entityId = stringToId(place.displayName?.text);
    return checkIfIdExists(entityId);
  });
  console.log("idCheckPromises", idCheckPromises);
  const idCheckData = await Promise.all(idCheckPromises);
  const idCheckMap = idCheckData.reduce((acc, returnData) => {
    if (returnData?.success === false && returnData?.data?.profileId) {
      return { ...acc, [returnData?.data?.profileId]: false };
    }
    return acc;
  }, {});
  console.log("idCheckData", idCheckMap);
  const tags = searchParams?.tags.split(",") || [];
  return (
    <div className="p-12">
      <h2>total: {data?.places?.length}</h2>
      <Accordion type="single" collapsible className="w-full">
        <div className="">
          {data?.places?.map((place: any) => (
            <AccordionItem key={place.id} value={place.formattedAddress}>
              <AccordionTrigger className="flex items-center gap-4 justify-between">
                <div className="text-2xl">
                  {place.displayName?.text}
                  <span className="text-sm text-muted-foreground px-8">
                    {place.formattedAddress}
                  </span>
                  {idCheckMap[stringToId(place.displayName?.text)] ===
                    false && <Badge variant={"destructive"}>id exists</Badge>}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <PlaceDetails {...place} tags={tags} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      </Accordion>
    </div>
  );
}
