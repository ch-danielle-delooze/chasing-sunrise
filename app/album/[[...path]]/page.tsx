"use client";
import React from "react";

import { useGetFolders } from "@/app/requests/folders";
import { findFolderByPath } from "@/app/utils/folders";
import { Gallery } from "@/components/react-grid-gallery";
import AWSImageLoader from "@/app/utils/imageLoader";

interface AlbumPageProps {
  params: Promise<{ path: string[] }>;
}

const cloudFrontUrl = process.env.NEXT_PUBLIC_CHASING_SUNRISE_CLOUDFRONT_DOMAIN;

export default function AlbumPage({ params }: AlbumPageProps) {
  const { data: folders } = useGetFolders();
  const albumPath = React.use(params).path;

  const folder = findFolderByPath(folders, albumPath);

  const images =
    folder?.objects.map((obj) => {
      const imagePath = `${cloudFrontUrl}${obj}`;
      const imageSrc = AWSImageLoader({
        src: imagePath,
        width: 1200,
        quality: 75,
      });

      return {
        src: imageSrc,
        height: 600,
      };
    }) || [];

  return (
    <div className="w-full space-y-6">
      <Gallery enableImageSelection={false} images={images} rowHeight={325} />
    </div>
  );
}
