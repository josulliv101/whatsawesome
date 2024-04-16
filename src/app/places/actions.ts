"use server";

import fs from "fs";
import path from "path";
import mime from "mime";
import { fileTypeFromStream, fileTypeFromBuffer } from "file-type";
import nodeFetch from "node-fetch";
import { addProfile, checkIfIdExists } from "@/lib/firebase";

export const saveImageToLocal = async (url: string, imageName: string) => {
  console.log("hi!", imageName, url);
  const fileName = imageName;
  // The URL of the image to download
  const imageURL = url;

  // The path of the directory to save the image
  const dirPath = "./public";

  // Create the directory if it does not exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  let newName = null;
  // Use fetch to get the image data as a buffer
  return nodeFetch(imageURL)
    .then((response) => response.buffer())
    .then(async (buffer) => {
      const imageInfo = await fileTypeFromBuffer(buffer);
      console.log(imageInfo);
      // Write the buffer to a file
      await fs.promises.writeFile(path.join(dirPath, fileName), buffer);
      newName = `${path.join(dirPath, fileName)}.${imageInfo?.ext || "tbd"}`;
      await fs.promises.rename(path.join(dirPath, fileName), newName);
      return newName || "";
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createEntityFromPlace = async (data: any) => {
  console.log("createEntityFromPlace!", data);
  const checkId = await checkIfIdExists(data.id);
  if (checkId) {
    return checkId;
  }
  return { success: true, data: [] };
};

export const confirmNewEntityData = async (data: any) => {
  try {
    await addProfile(data);
    return { success: true, data: [] };
  } catch (error) {
    console.log("error", error);
    return { success: false, data: { message: "Error saving profile" } };
  }
};
