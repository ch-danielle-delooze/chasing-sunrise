import clsx from "clsx";

import { title } from "../primitives";

interface FancyParagraphProps {
  text: string;
}

const FancyParagraph = ({ text }: FancyParagraphProps) => {
  const firstCharacter = text.substring(0, 1);
  const restOfText = text.substring(1);

  return (
    <div className="inline-block text-justify">
      <span
        className={clsx(
          title({ size: "xl" }),
          "md:h-[90px] h-[40px]",
          "float-start",
          "tracking-[0.03rem]",
          "font-chasingSunrise",
        )}
      >
        {firstCharacter}
      </span>
      <span className="whitespace-break-spaces">{restOfText}</span>
    </div>
  );
};

export default FancyParagraph;
