"use client";
import { Image } from "@heroui/image";
import { useState } from "react";
import { CarouselItem } from "@/components/ui/carousel";

import useIsTouchDevice from "@/app/utils/device";
interface CarouselImageProps {
  imagePath: string;
  containerWidth: number;

}

const cloudFrontUrl = process.env.NEXT_PUBLIC_CHASING_SUNRISE_CLOUDFRONT_DOMAIN;


const CarouselImage = ({ imagePath, containerWidth }: CarouselImageProps) => {
  const [aspectRatio, setAspectRatio] = useState(0);
  const isTouchDevice = useIsTouchDevice();

  const getTouchDeviceHeight = () => {
    if (!isTouchDevice) {
      return 400;
    } else {
      return containerWidth / 1.5;
    }
  }

  const onImageLoad = (image: HTMLImageElement) => {
    const aspectRatio = image.naturalHeight / image.naturalWidth;
    setAspectRatio(aspectRatio);
  };

  return (
    <CarouselItem
      className={`
      ${aspectRatio > 1 ? "md:basis-1/5 basis-3/5" : ""}
      ${aspectRatio < 1 ? "md:basis-1/2" : ""}
    `}
    >
      <Image
        alt="Image"
        height={isTouchDevice ? getTouchDeviceHeight() :400}
        radius="none"
        src={`${cloudFrontUrl}${imagePath}`}
        onLoad={(image) => onImageLoad(image.currentTarget)}
      />
    </CarouselItem>
  );
};

export default CarouselImage;
