import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import Erc20AbiRaw from '@/lib/abis/Erc20.json'
import { abi as KttyWorldMinting } from '@/lib/abis/KttyWorldMinting.json'
import { Abi } from 'viem'

const Erc20Abi = Erc20AbiRaw as Abi
const KttyWorldMintingAbi = KttyWorldMinting as Abi

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'Erc20',
      abi: Erc20Abi,
    },
    {
      name: 'KttyWorldMinting',
      abi: KttyWorldMintingAbi,
    },
  ],
  plugins: [
    react(),
  ],
})