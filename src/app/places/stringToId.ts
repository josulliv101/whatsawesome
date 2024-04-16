export function stringToId(inputString: string) {
  // Convert the string to lowercase
  let normalizedString = inputString.toLowerCase();

  // Replace all non-alphanumeric characters with dashes
  normalizedString = normalizedString.replace(/[^a-z0-9]/g, "-");

  // Remove leading, trailing, and consecutive dashes
  normalizedString = normalizedString.replace(/^-+|-+$|(?<=-)-+/g, "");

  return normalizedString;
}
