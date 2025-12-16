"use client";
import Image from "next/image";
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
  };
  const touchDeviceHeight = useMemo(
    () => getTouchDeviceHeight(),
    [isTouchDevice],
  );

  const onImageLoad = (image: HTMLImageElement) => {
    const aspectRatio = image.naturalWidth / image.naturalHeight;

    setAspectRatio(aspectRatio);
  };

  const getImageWidth = () => {
    if (aspectRatio == 0) {
      return 600;
    } else {
      return touchDeviceHeight * aspectRatio;
    }
  };

  return (
    <CarouselItem
      style={{
        width: getImageWidth(),
        height: isTouchDevice ? touchDeviceHeight : 400,
      }}
    >
      <Image
        alt="Image"
        height={isTouchDevice ? touchDeviceHeight : 400}
        src={`${cloudFrontUrl}${imagePath}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        width={getImageWidth()}
        onLoad={(image) => onImageLoad(image.currentTarget)}
      />
    </CarouselItem>
  );
};

export default CarouselImage;
