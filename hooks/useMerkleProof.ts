"use client";

import { useMemo } from 'react';
import { MerkleTree } from 'merkletreejs';
import { keccak256 } from 'viem';
import { ROUND_3_WHITELIST, isAddressWhitelisted } from '@/lib/whitelist';

export interface MerkleProofData {
  proof: string[];
  isWhitelisted: boolean;
  merkleRoot: string;
  error: string | null;
}

/**
 * Hash address for merkle tree (matches scripts/generateMerkleTree.js)
 */
function hashAddress(address: string): string {
  const cleanAddr = address.replace('0x', '').toLowerCase();
  return keccak256(Buffer.from(cleanAddr, 'hex'));
}

/**
 * Hook to generate merkle proof for Round 3 whitelist
 * @param address - User's wallet address
 * @returns Merkle proof data for Round 3 validation
 */
export function useMerkleProof(address?: string): MerkleProofData {
  return useMemo(() => {
    try {
      if (!address) {
        return {
          proof: [],
          isWhitelisted: false,
          merkleRoot: '',
          error: 'No address provided',
        };
      }

      // Check if address is in whitelist before generating proof
      const isWhitelisted = isAddressWhitelisted(address);
      
      if (!isWhitelisted) {
        return {
          proof: [],
          isWhitelisted: false,
          merkleRoot: '',
          error: 'Address not whitelisted for Round 3',
        };
      }

      // Generate merkle tree from whitelist using correct hashing
      const leaves = ROUND_3_WHITELIST.map(addr => hashAddress(addr));
      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const merkleRoot = merkleTree.getHexRoot();

      // Generate proof for the user's address
      const leaf = hashAddress(address);
      const proof = merkleTree.getHexProof(leaf);

      // Verify the proof is valid
      const isValid = merkleTree.verify(proof, leaf, merkleRoot);
      
      if (!isValid) {
        return {
          proof: [],
          isWhitelisted: false,
          merkleRoot,
          error: 'Generated proof is invalid',
        };
      }

      return {
        proof,
        isWhitelisted: true,
        merkleRoot,
        error: null,
      };
    } catch (error) {
      console.error('Error generating merkle proof:', error);
      return {
        proof: [],
        isWhitelisted: false,
        merkleRoot: '',
        error: error instanceof Error ? error.message : 'Unknown error generating proof',
      };
    }
  }, [address]);
}

/**
 * Get the merkle root for Round 3 whitelist
 * This should match the root set in the smart contract
 */
export function getRound3MerkleRoot(): string {
  try {
    const leaves = ROUND_3_WHITELIST.map(addr => hashAddress(addr));
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    return merkleTree.getHexRoot();
  } catch (error) {
    console.error('Error generating merkle root:', error);
    return '';
  }
}