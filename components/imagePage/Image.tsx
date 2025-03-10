"use client";
import { Image } from "@heroui/image";

import { useGetImage } from "@/app/requests/images";

interface ImageProps {
  imagePath: string;
}

const ImageDisplay = ({ imagePath }: ImageProps) => {
  const { data } = useGetImage({ key: imagePath });

  const downloadImage = async () => {
    if (!data) return;
    const response = await fetch(data, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = imagePath.split("/")[1];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Image
      alt="Image"
      className="md:m-6 my-2 hover:scale-105 cursor-pointer"
      src={data ?? undefined}
      onClick={downloadImage}
    />
  );
};

export default ImageDisplay;
