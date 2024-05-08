export function formatHubIdToName(hub: string) {
  const str = hub.replace(/[-_]/g, " ");
  return capitalizeFirstLetterEachWord(str);
}

export function capitalizeFirstLetterEachWord(str: string) {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(" ");
}
