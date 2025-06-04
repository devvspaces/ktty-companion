import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.bitquery.io', // Replace with actual endpoint
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_BITQUERY_KEY || '',
    },
  }),
  cache: new InMemoryCache(),
})

export default client
