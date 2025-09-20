/**
 * Round configuration for easy customization of titles, descriptions, and UI settings
 * This makes it simple to update round branding and content from a central location
 */

export interface RoundConfig {
  id: number;
  title: string;
  description: string;
  eligibility: string[];
  includes: string[];
}

export const ROUND_CONFIG: Record<number, RoundConfig> = {
  1: {
    id: 1,
    title: "Round 1",
    description: "This round is available to those affiliated with the One Eye Clan. Help break the cycle by taking your rightful place in the world that Mr Null will create by claiming an all powerful NULL KTTY.",
    eligibility: ["Whitelisted Addresses"],
    includes: ["1 NULL KTTY NFT", "3 × Forge Tools"],
  },
  2: {
    id: 2,
    title: "Round 2", 
    description: "This round is available to those affiliated with the One Eye Clan. Help break the cycle by taking your rightful place in the world that Mr Null will create by claiming an all powerful NULL KTTY.",
    eligibility: ["Whitelisted Addresses"],
    includes: ["1 NULL KTTY NFT", "3 × Forge Tools"],
  },
  3: {
    id: 3,
    title: "Round 3",
    description: "This round is available to those affiliated with the One Eye Clan. Help break the cycle by taking your rightful place in the world that Mr Null will create by claiming an all powerful NULL KTTY.",
    eligibility: ["Whitelisted Addresses"],
    includes: ["1 Random KTTY NFT", "3 × Forge Tools", "Possible Golden Ticket"],
  },
  4: {
    id: 4,
    title: "Round 4",
    description: "This round is available to those affiliated with the One Eye Clan. Help break the cycle by taking your rightful place in the world that Mr Null will create by claiming an all powerful NULL KTTY.",
    eligibility: ["Open to Everyone"],
    includes: ["1 Random KTTY NFT", "3 × Forge Tools", "Possible Golden Ticket"],
  },
};

/**
 * Get configuration for a specific round
 */
export function getRoundConfig(roundId: number): RoundConfig {
  const config = ROUND_CONFIG[roundId];
  if (!config) {
    throw new Error(`Round ${roundId} configuration not found`);
  }
  return config;
}

/**
 * Get all round configurations
 */
export function getAllRoundConfigs(): RoundConfig[] {
  return Object.values(ROUND_CONFIG);
}