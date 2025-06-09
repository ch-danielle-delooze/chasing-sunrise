"use client";
import * as React from "react";

import { useGetFolders } from "@/app/requests/folders";
import { title } from "@/components/primitives";
import { formatFolderName } from "@/app/utils/string";
import ImageCarousel from "@/components/imageCarousel";

interface ImageFolderPageProps {
  params: Promise<{ folder: string[] }>;
}

export default function ImageFolderPage({ params }: ImageFolderPageProps) {
  const { data } = useGetFolders();
  const folder = React.use(params).folder[0];

  const subFolders = data?.find(
    (dataFolder) => dataFolder.name === folder,
  )?.subFolders;

  return (
    <div className="w-full space-y-6">
      <div className={title({ size: "lg" })}>{formatFolderName(folder)}</div>
      {subFolders?.map((subFolder) => (
        <ImageCarousel
          key={subFolder.name}
          folderName={subFolder.name}
          imagePaths={subFolder.objects}
        />
      ))}
    </div>
  );
}
