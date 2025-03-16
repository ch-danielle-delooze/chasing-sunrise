"use client";
import { Image } from "@heroui/image";
import { useState, useMemo } from "react";
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
  const touchDeviceHeight = useMemo(() => getTouchDeviceHeight(), [isTouchDevice]);

  const getTouchDeviceDynamicBasis = () => {
    const imageWidth = touchDeviceHeight * (2/3);
    const imageBasis = imageWidth / containerWidth;
    return `basis-${imageBasis}`;
  }

  const onImageLoad = (image: HTMLImageElement) => {
    const aspectRatio = image.naturalWidth / image.naturalHeight;
    setAspectRatio(aspectRatio);
  };

  

  return (
    <CarouselItem
      className={`
      ${aspectRatio < 1 ? `md:basis-1/5 ${getTouchDeviceDynamicBasis()}` : ""}
      ${aspectRatio > 1 ? "md:basis-1/2" : ""}
    `}
    >
      <Image
        alt="Image"
        height={isTouchDevice ? touchDeviceHeight : 400}
        radius="none"
        src={`${cloudFrontUrl}${imagePath}`}
        onLoad={(image) => onImageLoad(image.currentTarget)}
      />
    </CarouselItem>
  );
};

export default CarouselImage;
