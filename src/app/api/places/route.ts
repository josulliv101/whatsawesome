import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest, response: NextResponse) {
  if (typeof request.url !== "string") {
    throw new Error(`Issue with accessing the request.url.`);
  }
  const { searchParams } = new URL(request.url);
  const primaryType = searchParams.get("primaryType");

  if (!primaryType || typeof primaryType !== "string") {
    throw new Error(`Issue with name param: ${primaryType}`);
  }
  console.log("v2", primaryType);
  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText?languageCode=en",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "AIzaSyB5vkllZzrzoS4TgKD-wOw5XC6m4gGW3xw",
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location,places.priceLevel,places.primaryType,places.types,places.websiteUri,places.priceLevel,places.rating,places.photos",
        },
        body: JSON.stringify({
          textQuery: "places that have good burgers near Burlington, MA",
        }),
      }
    );

    const data = await response.json();

    console.log("returned data", primaryType, data);
    return NextResponse.json({ success: true, primaryType, data });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}
