import { Folder } from "@/types";

export const findFolderByPath = (
  folders: Folder[] | undefined,
  path: string[],
): Folder | undefined => {
  if (!folders || folders.length === 0 || !path || path.length === 0) {
    return undefined;
  }

  let currentFolder: Folder | undefined;

  // Find the top-level folder matching the first path segment
  currentFolder = folders.find((folder) => folder.name === path[0]);

  // If no matching folder or we've reached the end, return current result
  if (!currentFolder || path.length === 1) {
    return currentFolder;
  }

  // Traverse down the folder structure for each path segment
  for (let i = 1; i < path.length; i++) {
    const segment = path[i];
    const nextFolder = currentFolder?.subFolders.find(
      (folder) => folder.name === segment,
    );

    // If we can't find a matching subfolder, return the last valid folder
    if (!nextFolder) {
      return currentFolder;
    }

    currentFolder = nextFolder;
  }

  return currentFolder;
};
