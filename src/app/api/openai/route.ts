import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
openai.images.generate;
export async function GET(request: NextRequest, response: NextResponse) {
  if (typeof request.url !== "string") {
    throw new Error(`Issue with accessing the request.url.`);
  }
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const tag = searchParams.get("tag") || "";
  const totalReasons = Number(searchParams.get("totalReasons")) || 5;
  if (!name || typeof name !== "string") {
    throw new Error(`Issue with name param: ${name}`);
  }
  console.log("v2", name);
  try {
    const data = await inquireWhyAwesome(name, totalReasons, tag);
    console.log("returned data", name, data);
    return NextResponse.json({ success: true, name, data });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}

async function inquireWhyAwesome(
  name: string,
  totalReasons: number = 5,
  tag?: string
) {
  const prompt = tag
    ? `Give me ${totalReasons} reasons why the ${tag} at ${name} is awesome. Each reason should be around 144 characters long. Please format the results in json format. The results should be an array. Do not include any hashtags in the results. If this is a person, do not include the person's name in the result, just use a pronoun. Do not use the word awesome in the response.`
    : `Give me ${totalReasons} reasons why ${name} is awesome. Each reason should be around 144 characters long. Please format the results in json format. The results should be an array. Do not include any hashtags in the results. If this is a person, do not include the person's name in the result, just use a pronoun. Do not use the word awesome in the response.`;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const json = JSON.parse(completion.choices[0].message.content as string);
  console.log("resp.", json);
  if (!Array.isArray(json) && json.data) {
    return json.data?.results || json.data?.reasons || json.data;
  } else if (!Array.isArray(json) && json.results) {
    return json.results;
  } else if (!Array.isArray(json) && json.reasons) {
    return json.reasons;
  } else if (
    Array.isArray(json) &&
    json.length > 0 &&
    typeof json[0] === "object"
  ) {
    return json.map((item) => item.reason || item.result || item.data);
  }
  return json;
}
