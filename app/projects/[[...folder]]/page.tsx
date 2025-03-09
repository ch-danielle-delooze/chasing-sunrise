"use client";
import * as React from "react";

import { useGetFolders } from "@/app/requests/folders";
import ImagePage from "@/components/imagePage";
interface ImageFolderPageProps {
  params: Promise<{ folder: string[] }>;
}

export default function ImageFolderPage({ params }: ImageFolderPageProps) {
  const { data } = useGetFolders();
  const folder = React.use(params).folder;

  // TODO: make this work for subfolders
  const imagePaths = data?.find(
    (dataFolder) => dataFolder.name === folder[0],
  )?.objects;

  return <ImagePage imagesPaths={imagePaths ?? []} />;
}
