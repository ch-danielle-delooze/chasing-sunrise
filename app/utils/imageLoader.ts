import { ImageLoaderProps } from "next/image";

export default function AWSImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set('format', 'auto');
  if (quality) {
    url.searchParams.set('quality', quality.toString());
  }
  url.searchParams.set('width', width.toString());
  console.log("AWSImageLoader URL:", url.href);
  return url.href
}