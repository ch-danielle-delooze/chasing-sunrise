"use client";
import { Image } from "@heroui/image";

import { useGetImage } from "@/app/requests/images";

interface ImageProps {
  imagePath: string;
}

const ImageDisplay = ({ imagePath }: ImageProps) => {
  const { data } = useGetImage({ key: imagePath });

  return <Image alt="Image" src={data ?? undefined} />;
};

export default ImageDisplay;
