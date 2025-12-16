"use client";
import { useGetPictureOfTheDay } from "./requests/pictureOfTheDay";

import { title, subtitle } from "@/components/primitives";
import PictureOfTheDay from "@/components/pictureOfTheDay";

export default function Home() {
  const cloudFrontUrl =
    process.env.NEXT_PUBLIC_CHASING_SUNRISE_CLOUDFRONT_DOMAIN;

  const { data } = useGetPictureOfTheDay();

  const pictureOfTheDay = {
    imageSrc: `${cloudFrontUrl}${data?.key}`,
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    location: data?.metadata?.location,
    description: data?.metadata?.description ?? "",
  };

  return (
    <section className="flex flex-col items-center justify-center gap-12 py-8 md:py-10">
      {/* Header */}
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ size: "lg" })}>Chasing Sunrise</span>
        <div className={subtitle({ class: "mt-4" })}>
          Photographs by Kash Desai for viewing and download.
        </div>
      </div>

      {/* Picture of the Day Section */}
      <PictureOfTheDay
        date={pictureOfTheDay.date}
        description={pictureOfTheDay.description}
        imageSrc={pictureOfTheDay.imageSrc}
        location={pictureOfTheDay.location}
      />
    </section>
  );
}
