import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'

const ALT_F4_MINT = new PublicKey('YOUR_ALT_F4_TOKEN_MINT_ADDRESS') // Replace this
const BURN_ADDRESS = new PublicKey('11111111111111111111111111111111') // Solana's "dead" address

export async function burnTokens(userPublicKey: PublicKey) {
  const connection = new Connection('https://api.mainnet-beta.solana.com')
  const sourceATA = await getAssociatedTokenAddress(ALT_F4_MINT, userPublicKey)

  const transaction = new Transaction().add(
    createTransferInstruction(
      sourceATA,        // from
      await getAssociatedTokenAddress(ALT_F4_MINT, BURN_ADDRESS), // to (burn addr)
      userPublicKey,    // owner
      1_000_000         // adjust based on decimals; this burns 1 token if 6 decimals
    )
  )

  return transaction
}
