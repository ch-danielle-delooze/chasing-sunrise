
import Image from "@/components/imagePage/Image";

interface ImagePageProps {
  imagesPaths: string[];
}

const ImagePage = ({imagesPaths}: ImagePageProps) => {
  return (
    <div>
      {
        imagesPaths.map((imagePath) => (
          <Image 
            key={imagePath} 
            imagePath={imagePath}
          />
        ))
      }
    </div>
  )
}

export default ImagePage;