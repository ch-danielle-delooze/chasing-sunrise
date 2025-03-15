import { subtitle } from "@/components/primitives";
import { formatFolderName } from "@/app/utils/string";
import Image from "@/components/imagePage/Image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ImageCarouselProps {
  folderName: string;
  imagePaths: string[];
}

const ImageCarousel = ({ imagePaths, folderName}: ImageCarouselProps) => {
  return (
    <div>
      <div className={subtitle()}>{formatFolderName(folderName)}</div>
      <Carousel>
        <CarouselContent>
          {imagePaths.map((imagePath) => (
            <CarouselItem key={imagePath} className="md:basis-1/2">
              <Image imagePath={imagePath} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>   
  );
}

export default ImageCarousel;