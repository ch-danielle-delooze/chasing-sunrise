import {
  ListObjectsCommand,
  ListObjectsCommandOutput,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

import { s3Client, bucketName } from "../awsS3Client";

import { Folder } from "@/types";

const findOrCreateFolder = (
  parentSubFolders: Folder[],
  folderName: string,
): Folder => {
  const folder =
    parentSubFolders?.find((subFolder) => subFolder.name === folderName) ??
    (() => {
      const newFolder: Folder = {
        name: folderName,
        subFolders: [],
        objects: [],
      };

      parentSubFolders.push(newFolder);

      return newFolder;
    })();

  return folder;
};

export async function dynamicBlurDataUrl(src: string) {
  const base64str = await fetch(
    `${src}&width=16&format=auto`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString('base64')
  );

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);


  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}

const convertListObjectResponseToFolderJson = async (
  output: ListObjectsCommandOutput,
): Promise<Folder[]> => {
  const result: Folder[] = [];

  // Create an array of promises to process each content item
  const promises = output.Contents?.map(async ({ Key, ChecksumType }) => {
    if (!Key || !ChecksumType) return;

    const folders = Key.split("/");
    let previousFolder: Folder | undefined = undefined;

    if (folders[folders.length - 1] === "") {
      return;
    }

    // Process each folder level sequentially
    for (let index = 0; index < folders.length; index++) {
      const folderName = folders[index];
      const isLast = index === folders.length - 1;

      if (isLast) {
        const dataBlurUrl = await dynamicBlurDataUrl(
          process.env.CHASING_SUNRISE_CLOUDFRONT_DOMAIN + Key,
        );
        previousFolder?.objects.push({
          path: Key,
          dataImageUrl: dataBlurUrl,
        });
      } else {
        const folder = findOrCreateFolder(
          previousFolder?.subFolders ?? result,
          folderName,
        );

        previousFolder = folder;
      }
    }
  }) || [];

  // Wait for all async operations to complete
  await Promise.all(promises);
  
  return result;
};

const GET = async () => {
  const command = new ListObjectsCommand({
    Bucket: bucketName,
  });
  const response = await s3Client.send(command);
  const folders = await convertListObjectResponseToFolderJson(response);
  return NextResponse.json(folders);
};

export { GET };
