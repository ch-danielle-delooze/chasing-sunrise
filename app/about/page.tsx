"use client";
import Image from "next/image";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

import { title, fineprint } from "@/components/primitives";
import FancyParagraph from "@/components/fancyParagraph";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  const cloudFrontUrl =
    process.env.NEXT_PUBLIC_CHASING_SUNRISE_CLOUDFRONT_DOMAIN;
  const kashBioParagraph =
    "Welcome to our little corner of the internet! My passion for photography started when I was in medical school, finding every excuse to tinker with an old D-SLR camera and capture bits of life – from everyday views to scenic trips. I never imagined sharing my work on a platform like this, but thanks to my better half, Danielle, it’s been an absolute dream. I hope these projects bring inspiration to your day, and I will continue adding styles, locations, themes, and ideas to this along the way!";
  const dainsBioParagraph =
    "My passion for making a website to host all my boyfriend’s photographs started when he asked me to do it. I've been a software engineer since graduating college so it seemed right up my alley. It's been a fun project to work on, and I hope you enjoy seeing the pictures he's taken on our many adventures. I might add some of my own photos in the future of wildlife and nature, but for now, I’m just happy to be able to share his work with you all.";

  const kashBioPictureSrc = `${cloudFrontUrl}page-content/about/IMG_3604.jpg`;
  const dainsBioPictureSrc = `${cloudFrontUrl}page-content/about/IMG_8856-2.jpg`;

  const isMobile = useMediaQuery({ query: `(max-width: 640px)` });

  return (
    <div className="flex flex-col space-y-10">
      <h1 className={title({ size: "lg" })}>About</h1>

      {/* Kash's Bio */}
      <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 items-center">
        <Image
          alt="Kash Desai"
          height={400}
          src={kashBioPictureSrc}
          width={400}
        />
        <div className="flex flex-col space-y-4 text-justify">
          <FancyParagraph text={kashBioParagraph} />
          <span>Cheers!</span>
          <div className="flex flex-col">
            <span
              className={clsx(title({ size: "md" }), "font-chasingSunrise")}
            >
              Kash Desai
            </span>
            <span>(very) Amateur Photographer,</span>
            <span>Vascular Surgeon</span>
          </div>
          <div className={clsx(fineprint(), "mt-4")}>
            P.S. Content on this website is entirely free. Please credit{" "}
            {
              <a
                className="underline text-black font-medium"
                href={siteConfig.links.instagram}
                rel="noopener noreferrer"
                target="_blank"
              >
                @chasing_sunrise_photography
              </a>
            }
            &nbsp; if you use any content in any capacity. I’m happy to send you
            full-resolution images if you direct message me on Instagram. Any
            replies and correspondence will entirely depend on how busy my
            surgical schedule happens to be!
          </div>
        </div>
      </div>

      {/* Danielle's Bio */}
      <div className="flex md:flex-row flex-col md:space-x-10 space-y-10 items-center">
        {isMobile && (
          <Image
            alt="Danielle DeLooze"
            height={400}
            src={dainsBioPictureSrc}
            width={400}
          />
        )}
        <div className="flex flex-col space-y-4 text-justify">
          <FancyParagraph text={dainsBioParagraph} />
          <span>
            This website is built using Next.js, Tailwind/ShadUI, and AWS
            CloudFront in front of a couple of s3 bucket for image hosting. It
            was fun learning how to handle large image hosting and optimization!
            I&apos;ve oddly never needed to deal with that in my day jobs
            before. The code is public on GitHub. Feel free to take a look and
            send any questions/suggestions to me.
          </span>
          <span>Warmly,</span>
          <div className="flex flex-col">
            <span
              className={clsx(title({ size: "md" }), "font-chasingSunrise")}
            >
              Danielle DeLooze (Dains)
            </span>
            <span>Software Engineer, Extraordinaire, Nature Lover</span>
          </div>
        </div>
        {!isMobile && (
          <Image
            alt="Danielle DeLooze"
            height={400}
            src={dainsBioPictureSrc}
            width={400}
          />
        )}
      </div>
    </div>
  );
}
