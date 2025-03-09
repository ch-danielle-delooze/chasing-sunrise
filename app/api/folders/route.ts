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

const convertListObjectResponseToFolderJson = (
  output: ListObjectsCommandOutput,
): Folder[] => {
  const result: Folder[] = [];

  output.Contents?.forEach(({ Key, ChecksumType }) => {
    if (!Key || !ChecksumType) return;

    const folders = Key.split("/");
    let previousFolder: Folder | undefined = undefined;

    if (folders[folders.length - 1] === "") {
      return;
    }

    folders.forEach((folderName, index) => {
      const isLast = index === folders.length - 1;

      if (isLast) {
        previousFolder?.objects.push(Key);
      } else {
        const folder = findOrCreateFolder(
          previousFolder?.subFolders ?? result,
          folderName,
        );

        previousFolder = folder;
      }
    });
  });

  return result;
};

const GET = async () => {
  const command = new ListObjectsCommand({
    Bucket: bucketName,
  });
  const response = await s3Client.send(command);
  const folders = convertListObjectResponseToFolderJson(response);

  return NextResponse.json(folders);
};

export { GET };
