export function getSummonVideos(screen: "desktop" | "mid" | "mobile") {
  // Treat 'mid' as 'desktop'
  const effectiveScreen = screen === "mid" ? "desktop" : screen;

  // Map the logical tier to the actual folder name in S3
  const folderMap = {
    normal: "normal",
    rare: "rare",
    ultra: "ultrarare", 
  } as const;

  const path = (tier: "normal" | "rare" | "ultra", book: string) =>
    `https://d1dqnt0gd112rm.cloudfront.net/video/animations/${effectiveScreen}/${folderMap[tier]}/${tier}${book}.mp4`;

  return {
    ruby: {
      normal: path("normal", "ruby"),
      rare: path("rare", "ruby"),
      ultra: path("ultra", "ruby"),
    },
    emerald: {
      normal: path("normal", "emerald"),
      rare: path("rare", "emerald"),
      ultra: path("ultra", "emerald"),
    },
    amethyst: {
      normal: path("normal", "amethyst"),
      rare: path("rare", "amethyst"),
      ultra: path("ultra", "amethyst"),
    },
    bsmith: {
      normal: path("normal", "bsmith"),
      rare: path("rare", "bsmith"),
      ultra: path("ultra", "bsmith"),
    },
    corrupt: {
      normal: path("normal", "corrupt"),
      rare: path("rare", "corrupt"),
      ultra: path("ultra", "corrupt"),
    },
    lucky: {
      normal: path("normal", "lucky"),
      rare: path("rare", "lucky"),
      ultra: path("ultra", "lucky"),
    },
    oneeye: {
      normal: path("normal", "oneeye"),
      rare: path("rare", "oneeye"),
      ultra: path("ultra", "oneeye"),
    },
  };
}
