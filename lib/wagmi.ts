import { createConfig, http } from 'wagmi';
import { roninWallet } from '@sky-mavis/tanto-wagmi';
import { ronin, saigon } from "viem/chains";

export const config = createConfig({
  chains: [ronin, saigon],
  transports: {
    [ronin.id]: http(),
    [saigon.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  // @ts-ignore
  connectors: [roninWallet()],
  ssr: true,
});