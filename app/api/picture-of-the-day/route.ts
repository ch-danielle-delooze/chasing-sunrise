import {
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

import { s3Client, bucketName } from "../awsS3Client";

const PICTURE_OF_THE_DAY_PREFIX = "page-content/picture-of-the-day/";

interface PictureOfTheDayObject {
  key: string;
  lastModified?: Date;
  size?: number;
  metadata?: Record<string, string>;
}

const fetchMetadataForObject = async (key: string) => {
  try {
    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const response = await s3Client.send(command);

    return response.Metadata || {};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching metadata for ${key}:`, error);

    return {};
  }
};

const convertListObjectResponseToPictureArray = async (
  output: ListObjectsV2CommandOutput,
): Promise<PictureOfTheDayObject[]> => {
  const result: PictureOfTheDayObject[] = [];

  // Filter for image files first
  const imageObjects =
    output.Contents?.filter(({ Key }) => {
      if (!Key) return false;

      // Skip if it's just a folder (ends with /)
      if (Key.endsWith("/")) return false;

      // Only include image files
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

      return imageExtensions.some((ext) => Key.toLowerCase().endsWith(ext));
    }) || [];

  // Fetch metadata for each image in parallel
  const picturePromises = imageObjects.map(
    async ({ Key, LastModified, Size }) => {
      if (!Key) return null;

      const metadata = await fetchMetadataForObject(Key);

      return {
        key: Key,
        lastModified: LastModified,
        size: Size,
        metadata,
      };
    },
  );

  const pictures = await Promise.all(picturePromises);

  // Filter out null values and add to result
  pictures.forEach((picture) => {
    if (picture) {
      result.push(picture);
    }
  });

  // Sort by last modified date (most recent first)
  result.sort((a, b) => {
    if (!a.lastModified || !b.lastModified) return 0;

    return b.lastModified.getTime() - a.lastModified.getTime();
  });

  return result;
};

const getTodayDateString = (): string => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();

  return `${month}-${day}-${year}`;
};

const GET = async () => {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: PICTURE_OF_THE_DAY_PREFIX,
  });

  const response = await s3Client.send(command);
  const pictures = await convertListObjectResponseToPictureArray(response);

  // Filter to only return pictures with today's date
  const todayDate = getTodayDateString();
  const todaysPictures = pictures.find(
    (picture) => picture.metadata?.date === todayDate,
  );

  return NextResponse.json(todaysPictures);
};

export { GET };
