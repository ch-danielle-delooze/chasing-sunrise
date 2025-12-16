"use client";
import Image from "next/image";
import { title } from "@/components/primitives";

interface PictureOfTheDayProps {
  imageSrc: string;
  imageAlt: string;
  date?: string;
  description: string;
  location?: string;
}

export default function PictureOfTheDay({
  imageSrc,
  imageAlt,
  date,
  description,
  location,
}: PictureOfTheDayProps) {
  return (
    <div className="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0 items-center w-full max-w-6xl mx-auto">
      {/* Image on the left */}
      <div className="flex-shrink-0">
        <Image
          alt={imageAlt}
          className="rounded-lg shadow-lg object-cover"
          height={500}
          src={imageSrc}
          width={500}
        />
      </div>

      {/* Text content on the right */}
      <div className="flex flex-col space-y-4 text-justify flex-1">
        <h2 className={title({ size: "md" })}>Picture of the Day</h2>
        {date && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
        )}
        {location && (
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            📍 {location}
          </p>
        )}
        <p className="text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

