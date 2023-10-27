import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
  };
});

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`;

const supabaseLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(supabaseLink),
  });
});
