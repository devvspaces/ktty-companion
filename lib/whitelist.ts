/**
 * Round 3 Whitelist Configuration
 * Add eligible addresses for Round 3 merkle tree generation
 */

export const ROUND_3_WHITELIST: string[] = [
  // Add whitelisted addresses here
  "0x1234567890123456789012345678901234567890",
  "0x2345678901234567890123456789012345678901", 
  "0x3456789012345678901234567890123456789012",
  "0x4567890123456789012345678901234567890123",
  "0x5678901234567890123456789012345678901234",
  // Add more addresses as needed...
];

/**
 * Check if an address is whitelisted for Round 3
 */
export function isAddressWhitelisted(address: string): boolean {
  return ROUND_3_WHITELIST.some(
    whitelistedAddress => whitelistedAddress.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Get the total number of whitelisted addresses
 */
export function getWhitelistSize(): number {
  return ROUND_3_WHITELIST.length;
}