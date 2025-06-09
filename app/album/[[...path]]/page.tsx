"use client";
import React from "react";

import { useGetFolders } from "@/app/requests/folders";
import { findFolderByPath } from "@/app/utils/folders";

interface AlbumPageProps {
  params: Promise<{ path: string[] }>;
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const { data: folders } = useGetFolders();
  const albumPath = React.use(params).path;

  const folder = findFolderByPath(folders, albumPath);

  return (
    <div className="w-full space-y-6">
      <div className="text-2xl font-bold">{albumPath}</div>
      {/* Here you would typically render the album content, e.g., images or videos */}
      <p>Content for album: {albumPath}</p>
    </div>
  );
}
