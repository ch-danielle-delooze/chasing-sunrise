import { subtitle } from "@/components/primitives";
import { formatFolderName } from "@/app/utils/string";
import Image from "@/components/imagePage/Image";

interface ImageCarouselProps {
  folderName: string;
  imagePaths: string[];
}

const ImageCarousel = ({ imagePaths, folderName}: ImageCarouselProps) => {
  return (
    <div>
      <div className={subtitle()}>{formatFolderName(folderName)}</div>
      {imagePaths.map((imagePath) => (
        <Image key={imagePath} imagePath={imagePath} />
      ))}
    </div>   
  );
}

export default ImageCarousel;