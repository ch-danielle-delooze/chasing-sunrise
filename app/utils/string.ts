const formatFolderName = (name: string) => {
  return name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export { formatFolderName };
