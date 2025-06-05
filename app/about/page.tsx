import { title, fineprint } from "@/components/primitives";
import FancyParagraph from "@/components/fancyParagraph";

export default function AboutPage() {
  const kashBioParagraph =
    "Welcome to our little corner of the internet! My passion for photography started when I was in medical school, finding every excuse to tinker with an old D-SLR camera and capture bits of life – from everyday views to scenic trips. I never imagined sharing my work on a platform like this, but thanks to my better half, Danielle, it’s been an absolute dream. I hope these projects bring inspiration to your day, and I will continue adding styles, locations, themes, and ideas to this along the way!\n\nCheers!\n\nKash Desai\n(very) Amateur Photographer,\nVascular Surgeon";
  const ps =
    "P.S. Content on this website is entirely free. Please credit @chasing_sunrise_photography if you use any content in any capacity. I’m happy to send you full-resolution images if you direct message me on Instagram. Any replies and correspondence will entirely depend on how busy my surgical schedule happens to be!";
  const dainsBioParagraph =
    "My passion for making a website to host all my boyfriend’s photographs started when he asked me to do it. Some persuasion and underpaid work aside, here we are! In the future, some of my work might make an appearance or two. Feel free to reach out for any website-related issues!\n\nWarmly,\n\nDanielle DeLooze (Software Engineer, Extraordinaire)";

  return (
    <div className="flex flex-col space-y-10">
      <h1 className={title({ size: "lg" })}>About</h1>

      <FancyParagraph text={kashBioParagraph} />
      <div className={fineprint()}>{ps}</div>

      <FancyParagraph text={dainsBioParagraph} />
    </div>
  );
}
