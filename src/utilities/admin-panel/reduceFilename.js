function reduceFilename(filename, maxChars = 10) {
  if (filename?.length <= maxChars) {
    return filename;
  }

  const parts = filename?.split(".");
  if (parts.length < 2) {
    return filename.substring(0, maxChars - 3) + "...";
  }

  const name = parts.slice(0, -1).join(".");
  const ext = parts[parts.length - 1];
  const reducedName = name.substring(0, maxChars - ext.length - 4) + "...";

  return `${reducedName}.${ext}`;
}

export default reduceFilename;
