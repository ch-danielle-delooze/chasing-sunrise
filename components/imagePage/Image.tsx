"use client";
import { Image } from "@heroui/image";
import NextImage from "next/image";

import { useGetImage } from "@/app/requests/images";

interface ImageProps {
  imagePath: string;
}

const ImageDisplay = ({ imagePath}: ImageProps) => {
  const { data, error, isLoading } = useGetImage({ key: imagePath });
  console.log(data)
  return (
    <Image
      as={NextImage}
      src={data}
      width={500}
      height={500}
    />
  )
};

export default ImageDisplay;