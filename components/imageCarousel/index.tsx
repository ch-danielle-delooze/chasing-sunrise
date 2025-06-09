"use client";
import { useRef } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

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
  albumPath: string;
}

const ImageCarousel = ({
  imagePaths,
  folderName,
  albumPath,
}: ImageCarouselProps) => {
  const router = useRouter();
  const isTouchDevice = useIsTouchDevice();
  const containerRef = useRef<any>();

  const navigateToAlbum = (albumPath: string) => {
    router.push(`/album/${albumPath}`);
  };

  return (
    <div ref={containerRef}>
      <div
        className={clsx(
          subtitle({ fullWidth: false }),
          "cursor-pointer w-fit transition delay-100 ease-in-out hover:scale-110 hover:text-black",
        )}
        onClick={() => navigateToAlbum(albumPath)}
      >
        {formatFolderName(folderName)}
      </div>
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {imagePaths.map((imagePath) => (
            <CarouselImage
              key={imagePath}
              containerWidth={containerRef?.current?.clientWidth}
              imagePath={imagePath}
            />
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
