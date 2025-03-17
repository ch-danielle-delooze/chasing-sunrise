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
          "h-[90px]",
          "float-start",
          "tracking-[0.03rem]",
          "font-chasingSunrise",
        )}
      >
        {firstCharacter}
      </span>
      <span>{restOfText}</span>
    </div>
  );
};

export default FancyParagraph;
