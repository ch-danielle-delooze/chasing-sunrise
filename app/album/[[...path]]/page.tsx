import React from "react";

interface AlbumPageProps {
  params: Promise<{ album: string }>;
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const album = React.use(params).album;

  return (
    <div className="w-full space-y-6">
      <div className="text-2xl font-bold">{album}</div>
      {/* Here you would typically render the album content, e.g., images or videos */}
      <p>Content for album: {album}</p>
    </div>
  );
}
