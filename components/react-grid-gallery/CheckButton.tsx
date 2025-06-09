import { useState } from "react";

import * as styles from "./styles";
import { CheckButtonProps } from "./types";

export const CheckButton = ({
  isSelected = false,
  isVisible = true,
  onClick,
  color = "#FFFFFFB2",
  selectedColor = "#4285F4FF",
  hoverColor = "#FFFFFFFF",
}: CheckButtonProps): JSX.Element => {
  const [hover, setHover] = useState(false);

  const circleStyle = { display: isSelected ? "block" : "none" };
  const fillColor = isSelected ? selectedColor : hover ? hoverColor : color;

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  return (
    <div
      data-testid="grid-gallery-item_check-button"
      style={styles.checkButton({ isVisible })}
      title="Select"
      onClick={onClick}
      onMouseOut={handleMouseOut}
      onMouseOver={handleMouseOver}
    >
      <svg
        fill={fillColor}
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <radialGradient
          cx="38"
          cy="95.488"
          gradientTransform="matrix(1 0 0 -1 -26 109)"
          gradientUnits="userSpaceOnUse"
          id="shadow"
          r="10.488"
        >
          <stop offset=".832" stopColor="#010101" />
          <stop offset="1" stopColor="#010101" stopOpacity="0" />
        </radialGradient>

        <circle
          cx="12"
          cy="13.512"
          fill="url(#shadow)"
          opacity=".26"
          r="10.488"
          style={circleStyle}
        />
        <circle cx="12" cy="12.2" fill="#FFF" r="8.292" style={circleStyle} />
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </div>
  );
};
