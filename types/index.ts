import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Folder = {
  name: string;
  objects: string[];
  subFolders: Folder[];
};
