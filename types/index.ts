import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FolderObject = {
  path: string;
  dataImageUrl: string;
}

export type Folder = {
  name: string;
  objects: FolderObject[];
  subFolders: Folder[];
};
