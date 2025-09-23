/**
 * Round 3 Whitelist Configuration
 * Add eligible addresses for Round 3 merkle tree generation
 */

export const ROUND_3_WHITELIST: string[] = [
  // Add whitelisted addresses here
  '0x29E3b139f4393aDda86303fcdAa35F60Bb7092bF', // user1 from makeAddr("user1")
  '0x1D96F2f6BeF1202E4Ce1Ff6Dad0c2CB002861d3e', // user2 from makeAddr("user2") 
  '0xc0A55e2205B289a967823662B841Bd67Aa362Aec', // user3 from makeAddr("user3")
  '0x90561e5Cd8025FA6F52d849e8867C14A77C94BA0', // user4 from makeAddr("user4")
  '0x5991A2dF15A8F6A256D3Ec51E99254Cd3fb576A9', // Additional test addresses
  '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
  '0xA0Ca70DFB6Fb79fD5EF160D3EAc677868547ffEF',
  '0xd8C4E87473bc36B6d1A22e4fbB5Bf3681c26B3C1',
  '0xC792F91084F131e18adcBE28045737b94ac5C922',
  '0x0DE92325AC09eC459Fe02625c144Ee07B3115dA1',
  '0x2E9eB05347148Ad9bf7bc001092a8fD353D774cf',
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