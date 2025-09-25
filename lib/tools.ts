// lib/minorRewards.ts

export type ToolRarity = "Standard" | "Advanced" | "Prismatic";

export interface MinorReward {
  name: string; // Full display name
  image: string; // Path to image in /public/images/otherrewards
  rarity: ToolRarity;
  type: "Hammer" | "Anvil" | "Tongs" | "Bellows" | "Eternal Flame"; // Tool family
}

// 🔹 Rarity glow map
export const rarityGlow: Record<
  ToolRarity,
  { border: string; shadow: string }
> = {
  Standard: {
    border: "#cd7f32", // Bronze
    shadow: "0 0 12px #cd7f32, 0 0 24px #b87333",
  },
  Advanced: {
    border: "#C0C0C0", // Silver
    shadow: "0 0 12px #C0C0C0, 0 0 24px #A9A9A9",
  },
  Prismatic: {
    border: "#FFD700", // Gold
    shadow: "0 0 12px #FFD700, 0 0 24px #FFA500",
  },
};

// 🔹 All minor rewards
export const minorRewards: MinorReward[] = [
  // Hammers
  {
    name: "Standard Hammer",
    image: "/images/otherrewards/stnhammer.png",
    rarity: "Standard",
    type: "Hammer",
  },
  {
    name: "Advanced Hammer",
    image: "/images/otherrewards/advhammer.png",
    rarity: "Advanced",
    type: "Hammer",
  },
  {
    name: "Prismatic Hammer",
    image: "/images/otherrewards/prshammer.png",
    rarity: "Prismatic",
    type: "Hammer",
  },

  // Anvils
  {
    name: "Standard Anvil",
    image: "/images/otherrewards/stanvil.png",
    rarity: "Standard",
    type: "Anvil",
  },
  {
    name: "Advanced Anvil",
    image: "/images/otherrewards/advanvil.png",
    rarity: "Advanced",
    type: "Anvil",
  },
  {
    name: "Prismatic Anvil",
    image: "/images/otherrewards/prsanvil.png",
    rarity: "Prismatic",
    type: "Anvil",
  },

  // Tongs
  {
    name: "Standard Tongs",
    image: "/images/otherrewards/stntongs.png",
    rarity: "Standard",
    type: "Tongs",
  },
  {
    name: "Advanced Tongs",
    image: "/images/otherrewards/advtongs.png",
    rarity: "Advanced",
    type: "Tongs",
  },
  {
    name: "Prismatic Tongs",
    image: "/images/otherrewards/prstongs.png",
    rarity: "Prismatic",
    type: "Tongs",
  },

  // Bellows
  {
    name: "Standard Bellows",
    image: "/images/otherrewards/stnbellows.png",
    rarity: "Standard",
    type: "Bellows",
  },
  {
    name: "Advanced Bellows",
    image: "/images/otherrewards/advbellows.png",
    rarity: "Advanced",
    type: "Bellows",
  },
  {
    name: "Prismatic Bellows",
    image: "/images/otherrewards/prsbellows.png",
    rarity: "Prismatic",
    type: "Bellows",
  },

  // Eternal Flames
  {
    name: "Standard Eternal Flame",
    image: "/images/otherrewards/stnflame.png",
    rarity: "Standard",
    type: "Eternal Flame",
  },
  {
    name: "Advanced Eternal Flame",
    image: "/images/otherrewards/advflame.png",
    rarity: "Advanced",
    type: "Eternal Flame",
  },
  {
    name: "Prismatic Eternal Flame",
    image: "/images/otherrewards/prsflame.png",
    rarity: "Prismatic",
    type: "Eternal Flame",
  },
];
