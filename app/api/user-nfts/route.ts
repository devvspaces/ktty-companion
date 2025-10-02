import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('address');

  if (!walletAddress) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    );
  }

  const tokenAddress = "0x9c17b842b39f9443f1108a147c4100a374ff0e55";
  const allNFTs: number[] = [];
  let from = 0;
  const size = 50;

  try {
    while (true) {
      const query = `
        query GetERC721TokensList($tokenAddress: String, $slug: String, $owner: String, $auctionType: AuctionType, $criteria: [SearchCriteria!], $from: Int!, $size: Int!, $sort: SortBy, $name: String, $priceRange: InputRange, $rangeCriteria: [RangeSearchCriteria!], $excludeAddress: String) {
          erc721Tokens(
            tokenAddress: $tokenAddress
            slug: $slug
            owner: $owner
            auctionType: $auctionType
            criteria: $criteria
            from: $from
            size: $size
            sort: $sort
            name: $name
            priceRange: $priceRange
            rangeCriteria: $rangeCriteria
            excludeAddress: $excludeAddress
          ) {
            total
            results {
              tokenId
            }
          }
        }
      `;

      const variables = {
        from,
        auctionType: "All",
        owner: walletAddress,
        size,
        sort: "PriceAsc",
        rangeCriteria: [],
        tokenAddress
      };

      const response = await fetch('https://marketplace-graphql.skymavis.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`GraphQL error: ${data.errors[0].message}`);
      }

      const results = data.data?.erc721Tokens?.results || [];
      const tokenIds = results.map((result: { tokenId: string }) => parseInt(result.tokenId));

      allNFTs.push(...tokenIds);

      if (results.length < size) {
        break;
      }

      if (from != 0) {
        from += size;
      } else {
        from += size - 1;
      }
    }

    return NextResponse.json({ nftIds: allNFTs });
  } catch (error) {
    console.error('Error fetching NFTs from SkyMavis API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFTs' },
      { status: 500 }
    );
  }
}