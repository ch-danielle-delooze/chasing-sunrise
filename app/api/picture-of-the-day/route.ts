import {
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

import { s3Client, bucketName } from "../awsS3Client";

const PICTURE_OF_THE_DAY_PREFIX = "page-content/picture-of-the-day/";

interface PictureOfTheDayObject {
  key: string;
  lastModified?: Date;
  size?: number;
}

const convertListObjectResponseToPictureArray = (
  output: ListObjectsV2CommandOutput,
): PictureOfTheDayObject[] => {
  const result: PictureOfTheDayObject[] = [];

  output.Contents?.forEach(({ Key, LastModified, Size }) => {
    if (!Key) return;

    // Skip if it's just a folder (ends with /)
    if (Key.endsWith("/")) return;

    // Only include image files
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const hasImageExtension = imageExtensions.some((ext) =>
      Key.toLowerCase().endsWith(ext),
    );

    if (hasImageExtension) {
      result.push({
        key: Key,
        lastModified: LastModified,
        size: Size,
      });
    }
  });

  // Sort by last modified date (most recent first)
  result.sort((a, b) => {
    if (!a.lastModified || !b.lastModified) return 0;

    return b.lastModified.getTime() - a.lastModified.getTime();
  });

  return result;
};

const GET = async () => {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: PICTURE_OF_THE_DAY_PREFIX,
  });

  const response = await s3Client.send(command);
  const pictures = convertListObjectResponseToPictureArray(response);

  return NextResponse.json(pictures);
};

export { GET };
