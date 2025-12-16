"use client";
import { title, subtitle } from "@/components/primitives";
import PictureOfTheDay from "@/components/pictureOfTheDay";

import { useGetPictureOfTheDay } from "./requests/pictureOfTheDay";

export default function Home() {
  const cloudFrontUrl =
    process.env.NEXT_PUBLIC_CHASING_SUNRISE_CLOUDFRONT_DOMAIN;

  const { data } = useGetPictureOfTheDay();
  console.log(data)

  // Configure your picture of the day here
  const pictureOfTheDay = {
    imageSrc: `${cloudFrontUrl}page-content/picture-of-the-day/sample.jpg`, // Update with your image path
    imageAlt: "Picture of the Day",
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    location: "Location Name", // Update with the location
    description:
      "Add your description here about what makes this photograph special. You can describe the moment it was captured, the lighting conditions, or any interesting story behind the shot.", // Update with your description
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
        imageAlt={pictureOfTheDay.imageAlt}
        imageSrc={pictureOfTheDay.imageSrc}
        location={pictureOfTheDay.location}
      />
    </section>
  );
}
