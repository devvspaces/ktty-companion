import { createConfig, http } from "wagmi";
import { roninWallet } from "@sky-mavis/tanto-wagmi";
import { ronin, saigon } from "viem/chains";

export const config = createConfig({
  chains: [ronin, saigon],
  transports: {
    [ronin.id]: http("https://ronin-mainnet.core.chainstack.com/4bfba9eee6134c35d6de906cad252fe2"),
    [saigon.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  // @ts-ignore
  connectors: [roninWallet()],
  ssr: true,
});
