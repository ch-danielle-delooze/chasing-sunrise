"use client";
import { useRef } from "react";
import { subtitle } from "@/components/primitives";
import { formatFolderName } from "@/app/utils/string";
import CarouselImage from "@/components/imageCarousel/components/carouselImage";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useIsTouchDevice from "@/app/utils/device";

interface ImageCarouselProps {
  folderName: string;
  imagePaths: string[];
}

const ImageCarousel = ({ imagePaths, folderName }: ImageCarouselProps) => {
  const isTouchDevice = useIsTouchDevice();
  const containerRef = useRef<any>();

  return (
    <div ref={containerRef}>
      <div className={subtitle()}>{formatFolderName(folderName)}</div>
      <Carousel >
        <CarouselContent>
          {imagePaths.map((imagePath) => (
            <CarouselImage key={imagePath} imagePath={imagePath} containerWidth={containerRef?.current?.clientWidth}/>
          ))}
        </CarouselContent>
        {/* If the device is a touch device, we don't want to show the previous and next buttons */}
        {!isTouchDevice && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
