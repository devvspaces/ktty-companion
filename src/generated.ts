import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '_owner', type: 'address' },
      { name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  { payable: true, type: 'fallback', stateMutability: 'payable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// KttyWorldMinting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const kttyWorldMintingAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'roundNumber', internalType: 'uint256', type: 'uint256' },
      {
        name: 'paymentType',
        internalType: 'enum KttyWorldMinting.PaymentType',
        type: 'uint8',
      },
      { name: 'nativeAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'erc20Amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'configurePayment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'roundNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'configureRound',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'distributeSpilloverToBuckets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllRounds',
    outputs: [
      {
        name: 'allRounds',
        internalType: 'struct KttyWorldMinting.Round[4]',
        type: 'tuple[4]',
        components: [
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          {
            name: 'roundType',
            internalType: 'enum KttyWorldMinting.RoundType',
            type: 'uint8',
          },
          { name: 'active', internalType: 'bool', type: 'bool' },
          {
            name: 'nativeOnlyPayment',
            internalType: 'struct KttyWorldMinting.PaymentOption',
            type: 'tuple',
            components: [
              {
                name: 'nativeAmount',
                internalType: 'uint256',
                type: 'uint256',
              },
              { name: 'erc20Amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'hybridPayment',
            internalType: 'struct KttyWorldMinting.PaymentOption',
            type: 'tuple',
            components: [
              {
                name: 'nativeAmount',
                internalType: 'uint256',
                type: 'uint256',
              },
              { name: 'erc20Amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'bookId', internalType: 'uint256', type: 'uint256' }],
    name: 'getBook',
    outputs: [
      {
        name: '',
        internalType: 'struct DummyBooks.Book',
        type: 'tuple',
        components: [
          { name: 'nftId', internalType: 'uint256', type: 'uint256' },
          { name: 'toolIds', internalType: 'uint256[3]', type: 'uint256[3]' },
          { name: 'goldenTicketId', internalType: 'uint256', type: 'uint256' },
          { name: 'hasGoldenTicket', internalType: 'bool', type: 'bool' },
          { name: 'nftType', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentRound',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'roundNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getPaymentConfig',
    outputs: [
      {
        name: 'nativeOnly',
        internalType: 'struct KttyWorldMinting.PaymentOption',
        type: 'tuple',
        components: [
          { name: 'nativeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'erc20Amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'hybrid',
        internalType: 'struct KttyWorldMinting.PaymentOption',
        type: 'tuple',
        components: [
          { name: 'nativeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'erc20Amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPoolAndBucketStatus',
    outputs: [
      { name: 'pool1Length', internalType: 'uint256', type: 'uint256' },
      { name: 'pool1Remaining', internalType: 'uint256', type: 'uint256' },
      { name: 'pool2Length', internalType: 'uint256', type: 'uint256' },
      { name: 'pool2Remaining', internalType: 'uint256', type: 'uint256' },
      { name: 'currentBucket', internalType: 'uint256', type: 'uint256' },
      {
        name: 'bucketStats',
        internalType: 'uint256[2][8]',
        type: 'uint256[2][8]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'roundNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getRound',
    outputs: [
      {
        name: '',
        internalType: 'struct KttyWorldMinting.Round',
        type: 'tuple',
        components: [
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          {
            name: 'roundType',
            internalType: 'enum KttyWorldMinting.RoundType',
            type: 'uint8',
          },
          { name: 'active', internalType: 'bool', type: 'bool' },
          {
            name: 'nativeOnlyPayment',
            internalType: 'struct KttyWorldMinting.PaymentOption',
            type: 'tuple',
            components: [
              {
                name: 'nativeAmount',
                internalType: 'uint256',
                type: 'uint256',
              },
              { name: 'erc20Amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'hybridPayment',
            internalType: 'struct KttyWorldMinting.PaymentOption',
            type: 'tuple',
            components: [
              {
                name: 'nativeAmount',
                internalType: 'uint256',
                type: 'uint256',
              },
              { name: 'erc20Amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTopMintersLeaderboard',
    outputs: [
      { name: 'wallets', internalType: 'address[]', type: 'address[]' },
      { name: 'mints', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalUniqueMinters',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserBooks',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserBooksDetails',
    outputs: [
      {
        name: '',
        internalType: 'struct DummyBooks.Book[]',
        type: 'tuple[]',
        components: [
          { name: 'nftId', internalType: 'uint256', type: 'uint256' },
          { name: 'toolIds', internalType: 'uint256[3]', type: 'uint256[3]' },
          { name: 'goldenTicketId', internalType: 'uint256', type: 'uint256' },
          { name: 'hasGoldenTicket', internalType: 'bool', type: 'bool' },
          { name: 'nftType', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserTotalMints',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'round', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getWhitelistStatus',
    outputs: [
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'minted', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_companions', internalType: 'address', type: 'address' },
      { name: '_tools', internalType: 'address', type: 'address' },
      { name: '_collectibles', internalType: 'address', type: 'address' },
      { name: '_books', internalType: 'address', type: 'address' },
      { name: '_kttyToken', internalType: 'address', type: 'address' },
      { name: '_treasuryWallet', internalType: 'address', type: 'address' },
      {
        name: '_maxMintPerTransaction',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'bookId', internalType: 'uint256', type: 'uint256' }],
    name: 'isBookOpened',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'isWhitelistedForRound3',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'bucketIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'bookIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'nullCount', internalType: 'uint256', type: 'uint256' },
      { name: 'oneOfOneCount', internalType: 'uint256', type: 'uint256' },
      { name: 'goldenTicketCount', internalType: 'uint256', type: 'uint256' },
      { name: 'basicCount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'loadBucket',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'bookIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'loadPool1',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'bookIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'loadPool2',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'recipient', internalType: 'address', type: 'address' },
    ],
    name: 'manualAirdrop',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      {
        name: 'paymentType',
        internalType: 'enum KttyWorldMinting.PaymentType',
        type: 'uint8',
      },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'bookId', internalType: 'uint256', type: 'uint256' }],
    name: 'openBook',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'maxMint', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxMintPerTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'merkleRoot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setRound3MerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newWallet', internalType: 'address', type: 'address' }],
    name: 'setTreasuryWallet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'round', internalType: 'uint256', type: 'uint256' },
      { name: 'users', internalType: 'address[]', type: 'address[]' },
      { name: 'allowances', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'setWhitelistAllowances',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bookId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'nftId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'toolIds',
        internalType: 'uint256[3]',
        type: 'uint256[3]',
        indexed: false,
      },
      {
        name: 'goldenTicketId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BookAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bookId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BookOpened',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bookIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BooksMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bucketIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'bookCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BucketLoaded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'totalMints',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinterStatsUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'roundNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'paymentType',
        internalType: 'enum KttyWorldMinting.PaymentType',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'nativeAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'erc20Amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PaymentConfigured',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'poolNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'bookCount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PoolLoaded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'roundNumber',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'startTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'endTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RoundUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'totalBooksDistributed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SpilloverDistributed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newWallet',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TreasuryWalletUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'BookAlreadyOpened' },
  { type: 'error', inputs: [], name: 'BookNotOwned' },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientPayment' },
  { type: 'error', inputs: [], name: 'InvalidArrayLength' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidPaymentType' },
  { type: 'error', inputs: [], name: 'InvalidProof' },
  { type: 'error', inputs: [], name: 'InvalidRound' },
  { type: 'error', inputs: [], name: 'MaxMintExceeded' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'PoolExhausted' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'RoundNotActive' },
  { type: 'error', inputs: [], name: 'TransferFailed' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__
 */
export const useReadKttyWorldMinting = /*#__PURE__*/ createUseReadContract({
  abi: kttyWorldMintingAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadKttyWorldMintingUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getAllRounds"`
 */
export const useReadKttyWorldMintingGetAllRounds =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getAllRounds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getBook"`
 */
export const useReadKttyWorldMintingGetBook =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getBook',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getCurrentRound"`
 */
export const useReadKttyWorldMintingGetCurrentRound =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getCurrentRound',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getPaymentConfig"`
 */
export const useReadKttyWorldMintingGetPaymentConfig =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getPaymentConfig',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getPoolAndBucketStatus"`
 */
export const useReadKttyWorldMintingGetPoolAndBucketStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getPoolAndBucketStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getRound"`
 */
export const useReadKttyWorldMintingGetRound =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getRound',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getTopMintersLeaderboard"`
 */
export const useReadKttyWorldMintingGetTopMintersLeaderboard =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getTopMintersLeaderboard',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getTotalUniqueMinters"`
 */
export const useReadKttyWorldMintingGetTotalUniqueMinters =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getTotalUniqueMinters',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getUserBooks"`
 */
export const useReadKttyWorldMintingGetUserBooks =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getUserBooks',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getUserBooksDetails"`
 */
export const useReadKttyWorldMintingGetUserBooksDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getUserBooksDetails',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getUserTotalMints"`
 */
export const useReadKttyWorldMintingGetUserTotalMints =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getUserTotalMints',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"getWhitelistStatus"`
 */
export const useReadKttyWorldMintingGetWhitelistStatus =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'getWhitelistStatus',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"isBookOpened"`
 */
export const useReadKttyWorldMintingIsBookOpened =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'isBookOpened',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"isWhitelistedForRound3"`
 */
export const useReadKttyWorldMintingIsWhitelistedForRound3 =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'isWhitelistedForRound3',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useReadKttyWorldMintingOnErc1155BatchReceived =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useReadKttyWorldMintingOnErc1155Received =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useReadKttyWorldMintingOnErc721Received =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"owner"`
 */
export const useReadKttyWorldMintingOwner = /*#__PURE__*/ createUseReadContract(
  { abi: kttyWorldMintingAbi, functionName: 'owner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadKttyWorldMintingProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadKttyWorldMintingSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: kttyWorldMintingAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__
 */
export const useWriteKttyWorldMinting = /*#__PURE__*/ createUseWriteContract({
  abi: kttyWorldMintingAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"configurePayment"`
 */
export const useWriteKttyWorldMintingConfigurePayment =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'configurePayment',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"configureRound"`
 */
export const useWriteKttyWorldMintingConfigureRound =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'configureRound',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"distributeSpilloverToBuckets"`
 */
export const useWriteKttyWorldMintingDistributeSpilloverToBuckets =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'distributeSpilloverToBuckets',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteKttyWorldMintingInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"loadBucket"`
 */
export const useWriteKttyWorldMintingLoadBucket =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'loadBucket',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"loadPool1"`
 */
export const useWriteKttyWorldMintingLoadPool1 =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'loadPool1',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"loadPool2"`
 */
export const useWriteKttyWorldMintingLoadPool2 =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'loadPool2',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"manualAirdrop"`
 */
export const useWriteKttyWorldMintingManualAirdrop =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'manualAirdrop',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteKttyWorldMintingMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"openBook"`
 */
export const useWriteKttyWorldMintingOpenBook =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'openBook',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteKttyWorldMintingRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"setMaxMintPerTransaction"`
 */
export const useWriteKttyWorldMintingSetMaxMintPerTransaction =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'setMaxMintPerTransaction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"setRound3MerkleRoot"`
 */
export const useWriteKttyWorldMintingSetRound3MerkleRoot =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'setRound3MerkleRoot',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const useWriteKttyWorldMintingSetTreasuryWallet =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'setTreasuryWallet',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"setWhitelistAllowances"`
 */
export const useWriteKttyWorldMintingSetWhitelistAllowances =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'setWhitelistAllowances',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteKttyWorldMintingTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteKttyWorldMintingUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: kttyWorldMintingAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__
 */
export const useSimulateKttyWorldMinting =
  /*#__PURE__*/ createUseSimulateContract({ abi: kttyWorldMintingAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"configurePayment"`
 */
export const useSimulateKttyWorldMintingConfigurePayment =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'configurePayment',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"configureRound"`
 */
export const useSimulateKttyWorldMintingConfigureRound =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'configureRound',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"distributeSpilloverToBuckets"`
 */
export const useSimulateKttyWorldMintingDistributeSpilloverToBuckets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'distributeSpilloverToBuckets',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateKttyWorldMintingInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"loadBucket"`
 */
export const useSimulateKttyWorldMintingLoadBucket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'loadBucket',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"loadPool1"`
 */
export const useSimulateKttyWorldMintingLoadPool1 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'loadPool1',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"loadPool2"`
 */
export const useSimulateKttyWorldMintingLoadPool2 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'loadPool2',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"manualAirdrop"`
 */
export const useSimulateKttyWorldMintingManualAirdrop =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'manualAirdrop',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateKttyWorldMintingMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"openBook"`
 */
export const useSimulateKttyWorldMintingOpenBook =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'openBook',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateKttyWorldMintingRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"setMaxMintPerTransaction"`
 */
export const useSimulateKttyWorldMintingSetMaxMintPerTransaction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'setMaxMintPerTransaction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"setRound3MerkleRoot"`
 */
export const useSimulateKttyWorldMintingSetRound3MerkleRoot =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'setRound3MerkleRoot',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const useSimulateKttyWorldMintingSetTreasuryWallet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'setTreasuryWallet',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"setWhitelistAllowances"`
 */
export const useSimulateKttyWorldMintingSetWhitelistAllowances =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'setWhitelistAllowances',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateKttyWorldMintingTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateKttyWorldMintingUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: kttyWorldMintingAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__
 */
export const useWatchKttyWorldMintingEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: kttyWorldMintingAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"BookAdded"`
 */
export const useWatchKttyWorldMintingBookAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'BookAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"BookOpened"`
 */
export const useWatchKttyWorldMintingBookOpenedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'BookOpened',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"BooksMinted"`
 */
export const useWatchKttyWorldMintingBooksMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'BooksMinted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"BucketLoaded"`
 */
export const useWatchKttyWorldMintingBucketLoadedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'BucketLoaded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchKttyWorldMintingInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"MinterStatsUpdated"`
 */
export const useWatchKttyWorldMintingMinterStatsUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'MinterStatsUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchKttyWorldMintingOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"PaymentConfigured"`
 */
export const useWatchKttyWorldMintingPaymentConfiguredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'PaymentConfigured',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"PoolLoaded"`
 */
export const useWatchKttyWorldMintingPoolLoadedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'PoolLoaded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"RoundUpdated"`
 */
export const useWatchKttyWorldMintingRoundUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'RoundUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"SpilloverDistributed"`
 */
export const useWatchKttyWorldMintingSpilloverDistributedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'SpilloverDistributed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"TreasuryWalletUpdated"`
 */
export const useWatchKttyWorldMintingTreasuryWalletUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'TreasuryWalletUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link kttyWorldMintingAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchKttyWorldMintingUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: kttyWorldMintingAbi,
    eventName: 'Upgraded',
  })
