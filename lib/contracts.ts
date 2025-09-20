/**
 * Contract addresses for different networks loaded from environment variables
 */

export const CONTRACT_ADDRESSES = {
  // Ronin Mainnet
  2020: {
    KttyWorldMinting: process.env.NEXT_PUBLIC_KTTY_WORLD_MINTING_ADDRESS as `0x${string}`,
    KttyWorldCompanions: process.env.NEXT_PUBLIC_KTTY_WORLD_COMPANIONS_ADDRESS as `0x${string}`,
    KttyWorldTools: process.env.NEXT_PUBLIC_KTTY_WORLD_TOOLS_ADDRESS as `0x${string}`,
    KttyWorldCollectibles: process.env.NEXT_PUBLIC_KTTY_WORLD_COLLECTIBLES_ADDRESS as `0x${string}`,
    KttyToken: process.env.NEXT_PUBLIC_KTTY_TOKEN_ADDRESS as `0x${string}`,
  },
} as const;

export type ContractName = keyof typeof CONTRACT_ADDRESSES[2020];
export type ChainId = keyof typeof CONTRACT_ADDRESSES;

/**
 * Get contract address for the current network
 */
export function getContractAddress(
  contractName: ContractName,
  chainId: ChainId = 2020
): `0x${string}` {
  const address = CONTRACT_ADDRESSES[chainId]?.[contractName];
  if (!address) {
    throw new Error(`Contract ${contractName} not configured for chain ${chainId}. Please set NEXT_PUBLIC_${contractName.toUpperCase()}_ADDRESS environment variable.`);
  }
  return address;
}

/**
 * Check if contracts are deployed on the current network
 */
export function areContractsDeployed(chainId: ChainId = 2020): boolean {
  const contracts = CONTRACT_ADDRESSES[chainId];
  if (!contracts) return false;
  
  return Object.values(contracts).every(address => !!address);
}