import { useEffect, useState } from "react";

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

  // @ts-ignore
  function mq(query) {
    return typeof window !== "undefined" && window.matchMedia(query).matches;
  }
  const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
    "",
  ); // include the 'heartz' - https://git.io/vznFH

  return mq(query);
}

export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const {
      isAndroid,
      isIPad13,
      isIPhone13,
      isWinPhone,
      isMobileSafari,
      isTablet,
    } = require("react-device-detect");

    setIsTouch(
      isTouch ||
        isAndroid ||
        isIPad13 ||
        isIPhone13 ||
        isWinPhone ||
        isMobileSafari ||
        isTablet ||
        isTouchDevice(),
    );
  }, []);

  return isTouch;
}
