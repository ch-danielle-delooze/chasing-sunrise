"use client";
import { Image } from "@heroui/image";
import { useState } from "react";

import { CarouselItem } from "../../ui/carousel";

import { useGetImage } from "@/app/requests/images";

interface ImageProps {
  imagePath: string;
}

const CarouselImage = ({ imagePath }: ImageProps) => {
  const { data } = useGetImage({ key: imagePath });
  const [aspectRatio, setAspectRatio] = useState(0);

  const onImageLoad = (image: HTMLImageElement) => {
    const aspectRatio = image.naturalHeight / image.naturalWidth;

    setAspectRatio(aspectRatio);
  };

  return (
    <CarouselItem
      className={`
      ${aspectRatio > 1 ? "md:basis-1/5 basis-2/3" : ""}
      ${aspectRatio < 1 ? "md:basis-1/2" : ""}
    `}
    >
      <Image
        alt="Image"
        height={400}
        radius="none"
        src={data ?? undefined}
        onLoad={(image) => onImageLoad(image.currentTarget)}
      />
    </CarouselItem>
  );
};

export default CarouselImage;
