import { ImageLoaderProps } from "next/image";

export default function AWSImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (quality) {
    return `${src}?format=auto&quality=${quality}&width=${width}`;
  } else return `${src}?format=auto&width=${width}`;
}
