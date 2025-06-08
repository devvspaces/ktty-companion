export const responses: Record<number, string[]> = {
  1: [
    "Yes. But not financial advice.",
    "$BONK has potential. Stay cautious.",
    "Meme energy: high. Probability: uncertain.",
  ],
  2: [
    "Warning: Stack overflow on alpha stream.",
    "Your question triggered a Layer 2 rift.",
    "Calculating chaos coefficient...",
  ],
  3: [
    "𝒀͏͓͖͓̠̻͠e҉̜͎̖̖̼̲͞s̪̮̱̖̬͡.",
    "> sɴᴀᴘ ᴏᴜᴛ. ɪᴛ's ᴀ sɪᴍᴜʟᴀᴛɪᴏɴ.",
    "??? response corrupted ???",
  ],
  4: [
    "[CRITICAL] Layer integrity failing...",
    "!!! STACK MELTDOWN INITIATED !!!",
    "∅∅∅ SYSTEM FAILURE ∅∅∅",
  ],
  5: [
    "You are now the token.",
    "All alpha has been consumed.",
    "We see you, terminal user.",
  ],
}

export function getResponse(layer: number): string {
  const lines = responses[layer] || ["[no response]"]
  return lines[Math.floor(Math.random() * lines.length)]
}
